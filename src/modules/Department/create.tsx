import departmentService from "@/services/department.service";
import { DepartmentRequest } from "@/types/department/DepartmentRequest.ts";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentCreate = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Department added",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const mutation = useMutation({
		mutationFn: (newDepartment: DepartmentRequest) =>
			departmentService.addNew(newDepartment),
	});

	const createDepartment = (values: DepartmentRequest) => {
		mutation.mutate(values);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate("/department");
			}, 2500);
		}
	}, [mutation]);

	return (
		<>
			{contextHolder}
			<Space
				direction="vertical"
				style={{ display: "flex" }}
				size={"large"}
			>
				{mutation.isError ? (
					<Alert
						message={`Error: ${mutation.error}`}
						type="warning"
						closable
						style={{
							marginBottom: "20px",
						}}
					/>
				) : null}
				<h1 style={{ textAlign: "center" }}>Create a department</h1>
				<Form
					name="department"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					onFinish={createDepartment}
				>
					<Form.Item
						label="Department name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input department name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Department description"
						name="description"
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Space
							style={{
								display: "flex",
							}}
							size={"large"}
						>
							<Button onClick={() => navigate(-1)}>
								Go back
							</Button>
							<Button
								type="primary"
								htmlType="submit"
								loading={mutation.isPending}
							>
								Create
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Space>
		</>
	);
};

export default DepartmentCreate;
