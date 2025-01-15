import React, { useState, useCallback, useMemo } from "react";
import {
  Alert,
  Empty,
  message,
  Space,
  Table,
  Avatar,
  Dropdown,
  Checkbox,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AgentsResponse } from "@/types/agents/AgentsResponse";
import { MoreOutlined } from "@ant-design/icons";
import agentService from "@/services/agents.service";
import "../styles/AgentTable.css";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface AgentTableProps {
  searchText: string;
  selectedCompany: string | null;
  currentPage: number;
  setTotalAgents: React.Dispatch<React.SetStateAction<number>>;
}

const AgentTable: React.FC<AgentTableProps> = ({
  searchText,
  selectedCompany,
  currentPage,
  setTotalAgents,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentEditingAgent, setCurrentEditingAgent] =
    useState<AgentsResponse | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const fetchAgents = useCallback(async () => {
    const { agents, total } = await agentService.getAgents(
      searchText,
      selectedCompany || "",
      currentPage,
      10
    );
    setTotalAgents(total);
    return agents;
  }, [searchText, selectedCompany, currentPage, setTotalAgents]);

  const {
    isError,
    error,
    data: agents = [],
  } = useQuery({
    queryKey: ["agents", searchText, selectedCompany, currentPage],
    queryFn: fetchAgents,
  });

  const success = useCallback(() => {
    messageApi.open({
      type: "success",
      content: currentEditingAgent
        ? "Agent updated successfully"
        : "Agent deleted successfully",
    });
    setTimeout(() => messageApi.destroy(), 2000);
    setIsEditModalVisible(false);
    queryClient.invalidateQueries({ queryKey: ["agents"] });
  }, [messageApi, currentEditingAgent, queryClient]);

  const deleteAgentMutation = useMutation({
    mutationFn: (id: number) => agentService.deleteAgent(id),
    onSuccess: success,
    onError: (error: any) => {
      messageApi.open({
        type: "error",
        content: `Error deleting agent: ${error.message || "Something went wrong!"}`,
      });
    },
  });

  const updateAgentMutation = useMutation({
    mutationFn: (params: {
      id: number;
      updatedData: Partial<AgentsResponse>;
    }) => agentService.updateAgent(params.id, params.updatedData),
    onSuccess: success,
    onError: (error: any) => {
      messageApi.open({
        type: "error",
        content: `Error updating agent: ${error.message || "Something went wrong!"}`,
      });
    },
  });

  const showEditModal = (agent: AgentsResponse) => {
    setCurrentEditingAgent(agent);
    form.setFieldsValue({
      name: agent.name,
      surname: agent.surname,
      status: agent.status,
      phoneNumber: agent.phoneNumber,
      activePosts: agent.activePosts,
      company: agent.company,
    }); // Set initial values for the form
    setIsEditModalVisible(true);
  };

  const handleEditModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (currentEditingAgent) {
          updateAgentMutation.mutate({
            id: currentEditingAgent.id,
            updatedData: values,
          });
        }
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleCheckboxChange = useCallback(
    (e: CheckboxChangeEvent, agentId: number) => {
      setSelectedRowKeys((prev) =>
        e.target.checked
          ? [...prev, agentId]
          : prev.filter((id) => id !== agentId)
      );
    },
    []
  );

  const handleSelectAllChange = useCallback(
    (e: CheckboxChangeEvent) => {
      setSelectedRowKeys(
        e.target.checked ? agents.map((agent) => agent.id) : []
      );
    },
    [agents]
  );

  const rowClassName = useCallback(
    (record: AgentsResponse) =>
      selectedRowKeys.includes(record.id) ? "selected-row" : "",
    [selectedRowKeys]
  );

  const columns = useMemo(
    () => [
      {
        title: (
          <Checkbox
            checked={selectedRowKeys.length === agents.length}
            indeterminate={
              selectedRowKeys.length > 0 &&
              selectedRowKeys.length < agents.length
            }
            onChange={handleSelectAllChange}
          />
        ),
        key: "checkbox",
        render: (record: AgentsResponse) => (
          <Checkbox
            checked={selectedRowKeys.includes(record.id)}
            onChange={(e) => handleCheckboxChange(e, record.id)}
          />
        ),
      },
      {
        title: "Agents",
        key: "fullName",
        render: (_: any, record: AgentsResponse) => (
          <Space>
            <Avatar src={record.photo} size={40} />
            <span>
              {record.name} {record.surname}
            </span>
          </Space>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
      {
        title: "Active Posts",
        dataIndex: "activePosts",
        key: "activePosts",
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_: any, record: AgentsResponse) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "Edit",
                  onClick: () => showEditModal(record),
                },
                {
                  key: "2",
                  label: "Delete",
                  danger: true,
                  onClick: () => deleteAgentMutation.mutate(record.id),
                },
              ],
            }}
            trigger={["click"]}
          >
            <MoreOutlined
              style={{
                fontSize: "20px",
                cursor: "pointer",
                color: "rgba(0, 0, 0, 0.65)",
              }}
            />
          </Dropdown>
        ),
      },
    ],
    [agents, selectedRowKeys, handleCheckboxChange, handleSelectAllChange]
  );

  return (
    <>
      {contextHolder}
      {isError && (
        <Alert
          message={`Error: ${error}`}
          type="warning"
          closable
          style={{ marginBottom: "20px" }}
        />
      )}
      {agents.length ? (
        <Table
          columns={columns}
          dataSource={agents}
          rowKey={(record) => record.id.toString()}
          rowClassName={rowClassName}
          pagination={false}
          bordered={false}
          style={{ marginBottom: "20px" }}
        />
      ) : (
        <Empty description="No agents found" />
      )}

      <Modal
        title="Edit Agent"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="edit_agent_form">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Surname"
            rules={[{ required: true, message: "Please input the surname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="activePosts"
            label="Active Posts"
            rules={[{ required: true, message: "Please input active posts!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please select a company!" }]}
          >
            <Select>
              {Array.from(new Set(agents.map((a) => a.company))).map(
                (company) => (
                  <Select.Option key={company} value={company}>
                    {company}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AgentTable;
