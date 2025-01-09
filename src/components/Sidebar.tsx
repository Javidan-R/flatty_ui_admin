import { Link, useLocation } from "react-router-dom";
import menuItems from "@constants/menu";
import { Layout, Menu, MenuProps } from "antd";
import { createElement, useEffect, useState } from "react";
import logo from "@assets/logo.png"; // Adjust the path to your logo file
import "../styles/Sidebar.css"; // Import the Sidebar CSS file here

const { Sider } = Layout;

const Sidebar = () => {
	const currentLocation = useLocation().pathname;
	const [pathId, setPathId] = useState(0);
	const [collapsed, setCollapsed] = useState(false);

	const menu: MenuProps["items"] = menuItems.map((item, index) => {
		return {
			key: index,
			icon: createElement(item.icon),
			label: item.subItems ? (
				item.name
			) : (
				<Link to={item.url}>{item.name}</Link>
			),
			children: item.subItems
				? item.subItems.map((si, i) => {
						return {
							key: (i + 10) * (index + 20) + 10,
							icon: createElement(si.icon),
							label: <Link to={si.url}>{si.name}</Link>,
						};
					})
				: null,
		};
	});

	useEffect(() => {
		menuItems.forEach((item, index) => {
			item.url === currentLocation ? setPathId(index) : null;
		});
	}, [currentLocation]);

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value: boolean) => setCollapsed(value)}
			style={{
				width: 200,
				minHeight: "100vh",
				backgroundColor: "rgba(249, 248, 255, 1)",
			}}
		>
			{/* Logo Above Menu */}
			<div
				style={{
					height: 60,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "rgba(249, 248, 255, 1)",
					margin: "16px 0",
				}}
			>
				<img src={logo} alt="Logo" style={{ height: 40 }} />
			</div>

			{/* Menu Section */}
			<div
				style={{
					background: "rgba(249, 248, 255, 1)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Menu
					theme="light"
					mode="inline"
					defaultSelectedKeys={[pathId.toString()]}
					selectedKeys={[pathId.toString()]}
					items={menu}
					style={{
						borderRight: 0,
						background: "rgba(249, 248, 255, 1)",
						overflowY: "auto",
						borderRadius: "3px",
					}}
					onClick={(e) => setPathId(Number(e.key))}
					inlineIndent={60}
				/>
			</div>
		</Sider>
	);
};

export default Sidebar;
