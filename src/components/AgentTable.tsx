// src/components/UserTable.tsx
// src/components/UserTable.tsx
import React, { useState } from "react";
import {
  Alert,
  Empty,
  message,
  Space,
  Table,
  Avatar,
  Dropdown,
  Menu,
  Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AgentsResponse } from "@/types/agents/AgentsResponse";
import { MoreOutlined } from "@ant-design/icons";
import userService from "@/services/agents.service";
import "../styles/UserTable.css";

interface UserTableProps {
  searchText: string;
  selectedCompany: string | null;
  currentPage: number;
  setTotalUsers: React.Dispatch<React.SetStateAction<number>>;
}

const UserTable: React.FC<UserTableProps> = ({
  searchText,
  selectedCompany,
  currentPage,
  setTotalUsers,
}) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetchUsers = async () => {
    const { users, total } = await userService.getUsers(
      searchText,
      selectedCompany || "",
      currentPage,
      10
    );
    setTotalUsers(total);
    return users;
  };

  const {
    isError,
    error,
    data: users = [],
  } = useQuery({
    queryKey: ["users", searchText, selectedCompany, currentPage],
    queryFn: fetchUsers,
  });

  const success = () => {
    messageApi.open({
      type: "success",
      content: "User deleted successfully",
    });
    setTimeout(messageApi.destroy, 2000);
  };

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: success,
    onError: (error: any) => {
      messageApi.open({
        type: "error",
        content: `Error deleting user: ${error.message || "Something went wrong!"}`,
      });
    },
  });

  const deleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  const handleCheckboxChange = (e: any, userId: number) => {
    setSelectedRowKeys((prevSelectedKeys) =>
      e.target.checked
        ? [...prevSelectedKeys, userId]
        : prevSelectedKeys.filter((key) => key !== userId)
    );
  };

  const handleSelectAllChange = (e: any) => {
    if (e.target.checked) {
      setSelectedRowKeys(users.map((user) => user.id));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const rowClassName = (record: AgentsResponse) =>
    selectedRowKeys.includes(record.id) ? "selected-row" : "";

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === users.length}
          indeterminate={
            selectedRowKeys.length > 0 && selectedRowKeys.length < users.length
          }
          onChange={handleSelectAllChange}
        />
      ),
      key: "checkbox",
      render: (_: any, record: AgentsResponse) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => handleCheckboxChange(e, record.id)}
        />
      ),
    },
    {
      title: "Users",
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
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => navigate(`/admin/users/edit/${record.id}`)}
              >
                Edit
              </Menu.Item>
              <Menu.Item key="2" danger onClick={() => deleteUser(record.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
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
  ];

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

      {users.length ? (
        <Table
          columns={columns}
          dataSource={users}
          rowKey={(record) => record.id.toString()}
          rowClassName={rowClassName}
          pagination={false}
          bordered={false}
          style={{ marginBottom: "20px" }}
        />
      ) : (
        <Empty description="No users found" />
      )}
    </>
  );
};

export default UserTable;
