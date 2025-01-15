import React, { useState } from "react";
import { Layout, Row, Col, Dropdown, Avatar, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLogout } from "@/hooks/useLogout";
import { NotificationTrue } from "@/assets/icons";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const { logout } = useLogout();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => logout()}>Logout</a>,
    },
  ];

  return (
    <Header style={{ padding: 0, background: "rgba(249, 248, 255, 1)" }}>
      <Row justify="end" align="middle" gutter={[16, 0]}>
        <Col>
          <CurrencySelector />
        </Col>
        <Col>
          <NotificationButton />
        </Col>
        <Col>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

const CurrencySelector: React.FC = () => {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] =
    useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    localStorage.getItem("currency") || "£"
  );
  const currencies: string[] = ["£", "$", "€", "₺"]; // Add any symbols you need

  const handleCurrencyChange = (curr: string) => {
    localStorage.setItem("currency", curr);
    setSelectedCurrency(curr);
    setCurrencyDropdownOpen(false);
    window.location.reload(); // You can remove this if you don't want to reload the page
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gray-400 border border-transparent rounded-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
      >
        <span className="text-lg font-medium">{selectedCurrency}</span>
        <span className="text-xl transform rotate-0">▼</span>
      </button>

      {currencyDropdownOpen && (
        <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg top-full w-[120px] z-10 flex flex-col">
          {currencies.map((curr) => (
            <button
              key={curr}
              onClick={() => handleCurrencyChange(curr)}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
            >
              {curr}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const NotificationButton: React.FC = () => (
  <div
    onClick={() => console.log("Notifications clicked")} // Replace with your notification logic
    className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center"
  >
    <NotificationTrue />
  </div>
);

export default AppHeader;
