import React, { useState, useEffect } from "react";
import UserTable from "@/components/AgentTable";
import { Input, Select, Button, Pagination, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./AgentsPage.module.css"; // Import CSS module
import agentService from "@/services/agents.service";

const AgentsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [companies, setCompanies] = useState<string[]>([]);

  useEffect(() => {
    agentService.getCompanies().then(setCompanies);
  }, []);

  const handleSearch = () => setCurrentPage(1);
  const handleCompanyChange = (value: string) => {
    setSelectedCompany(value);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  const totalPages = Math.ceil(totalUsers / 10);
  const showTotal = (total: number) => `${total} results`;

  return (
    <ConfigProvider>
      <div className={styles.userManagementContainer}>
        <div className={styles.searchAndSelect}>
          <Input.Group compact>
            <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or surname"
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "6px 0 0 6px",
                border: "1px solid #d9d9d9",
                padding: "0 12px",
                fontSize: "14px",
              }}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
              style={{
                height: "40px",
                width: "48px",
                borderRadius: "0 6px 6px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
              }}
            />
          </Input.Group>
          <Select
            style={{
              width: "240px",
              height: "40px",
              borderRadius: "6px",
              backgroundColor: "red",
              fontSize: "14px",
              fontWeight: 600,
            }}
            placeholder="Choose Company"
            onChange={handleCompanyChange}
            allowClear
            value={selectedCompany}
            dropdownStyle={{
              borderRadius: "6px",
              overflow: "hidden",
              backgroundColor: "red",


            }}
            optionStyle={{
              fontSize: "14px",
              padding: "8px 12px",
              backgroundColor: "red",
            }}
          >
            {companies.map((company) => (
              <Select.Option key={company} value={company}>
                {company}
              </Select.Option>
            ))}
          </Select>
        </div>
        <UserTable
          searchText={searchText}
          selectedCompany={selectedCompany}
          currentPage={currentPage}
          setTotalUsers={setTotalUsers}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            current={currentPage}
            onChange={onPageChange}
            total={totalUsers}
            pageSize={10}
            showSizeChanger={false}
            showTotal={showTotal}
            itemRender={(page, type) => {
              if (type === "prev") {
                return (
                  <a style={{ opacity: currentPage === 1 ? 0.5 : 1 }}>{"<"}</a>
                );
              }
              if (type === "next") {
                return (
                  <a style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}>
                    {">"}
                  </a>
                );
              }
              return page;
            }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AgentsPage;
