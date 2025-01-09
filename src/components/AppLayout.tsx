import { Outlet } from "react-router-dom";
import Header from "@components/AppHeader";
import Sidebar from "@components/Sidebar";
import { Layout } from "antd";
import "@styles/common.scss";

const { Content } = Layout;

const AppLayout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />
			<Layout>
				<Header />
				<Content style={{ margin: "0 16px" }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: "#fff",
						}}
					>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
