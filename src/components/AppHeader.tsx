import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Dropdown, Avatar, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLogout } from "@/hooks/useLogout";
import { ArrowDown, NotificationTrue } from "@/assets/icons";

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
    <Header style={{ paddingRight: 60, background: "rgba(249, 248, 255, 1)" }}>
      <Row
        justify="end"
        align="middle"
        gutter={[20, 0]}
        className="flex items-center justify-center"
      >
        <Col className="flex items-center justify-center ">
          <CurrencySelector />
        </Col>
        <Col className="flex items-center justify-center mt-2">
          <NotificationButton />
        </Col>
        <Col className="flex items-center justify-center">
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};
const CurrencySelector: React.FC = () => {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: "£",
    name: "GBP",
  });

  const currencies = [
    { symbol: "£", name: "GBP" },
    { symbol: "$", name: "USD" },
    { symbol: "€", name: "EUR" },
    { symbol: "₺", name: "TRY" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCurrency = localStorage.getItem("currency");
      const storedCurrencyName = localStorage.getItem("currencyName");
      if (storedCurrency && storedCurrencyName) {
        setSelectedCurrency({
          symbol: storedCurrency,
          name: storedCurrencyName,
        });
      }
    }
  }, []);

  const handleCurrencyChange = (curr: { symbol: string; name: string }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", curr.symbol);
      localStorage.setItem("currencyName", curr.name);
    }
    setSelectedCurrency(curr);
    setCurrencyDropdownOpen(false);

    // Dinamik valyuta yenilənməsi üçün burada React Context və ya Redux istifadə edin.
  };

  return (
    <div className="relative">
      <button
        className="flex justify-between w-[104px] h-[34px] items-center gap-2 px-3 py-2 bg-gray-100 border border-transparent rounded-md hover:border-gray-300"
        onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
      >
        <span>{selectedCurrency.symbol}</span>
        <span className="mx-1 text-[#525C76] text-[12px]">
          {selectedCurrency.name}
        </span>
        <span
          className={`transform ${currencyDropdownOpen ? "rotate-180" : "rotate-0"}`}
        >
          <ArrowDown />
        </span>
      </button>

      {currencyDropdownOpen && (
        <div className="absolute left-0 z-10 mt-1 bg-white border rounded-md shadow-lg top-full w-100">
          {currencies.map((curr) => (
            <button
              key={`${curr.symbol}-${curr.name}`}
              onClick={() => handleCurrencyChange(curr)}
              className="block w-full px-3 py-2 text-left hover:bg-gray-100"
            >
              <span>{curr.symbol}</span> <span>{curr.name}</span>
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
