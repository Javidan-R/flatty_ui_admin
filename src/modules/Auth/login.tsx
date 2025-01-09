import { Form, Space, Input, Button } from "antd";
import { LoginRequest } from "../../types/auth/LoginRequest.ts";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin.ts";

const Login = () => {
	const { login } = useLogin();
	const navigate = useNavigate();

	const onLogin = (values: LoginRequest) => {
		login(values.username, values.password).then((res) => {
			if (res) {
				navigate("/");
			}
		});
	};

	return (
		<Space
			direction="horizontal"
			style={{
				width: "100%",
				height: "100vh",
				justifyContent: "center",
				backgroundColor: "white",
			}}
		>
			<Form
				name="login"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 800 }}
				onFinish={onLogin}
				autoComplete="off"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Login
					</Button>
				</Form.Item>
			</Form>
		</Space>
	);
};

export default Login;
