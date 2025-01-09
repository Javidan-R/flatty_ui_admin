import { Layout, Row, Col, Dropdown, Avatar, MenuProps } from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { useLogout } from "@/hooks/useLogout";

const { Header } = Layout;

const AppHeader = () => {
	const { logout } = useLogout();

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: <a onClick={() => logout()}>Logout</a>,
		},
	];

	return (
		<Header style={{ padding: 0, background: "rgba(249, 248, 255, 1)" }}>
			<Row>
				<Col span={1} offset={22}>
					<Dropdown menu={{ items }} placement="bottomRight">
						<Avatar icon={<UserOutlined />} />
					</Dropdown>
				</Col>
			</Row>
		</Header>
	);
};

export default AppHeader;
