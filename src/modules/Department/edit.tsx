import { DepartmentRequest } from "@/types/department/DepartmentRequest.ts";
import departmentService from "@services/department.service.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentEdit = () => {
	const navigate = useNavigate();
	const { departmentId } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const [departmentIdFromPath, setDepartmentIdFromPath] = useState(0);

	useEffect(() => {
		if (departmentId) {
			setDepartmentIdFromPath(parseInt(departmentId as string));
		}
	}, [departmentId]);

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Department changed",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const fetchDepartment = async () => {
		const { data } = await departmentService.getById(departmentIdFromPath);
		return data;
	};

	const {
		data: department,
		isError: isloadError,
		error: loadError,
	} = useQuery({
		queryKey: ["department"],
		queryFn: () => fetchDepartment(),
		enabled: departmentIdFromPath != 0,
	});

	const mutation = useMutation({
		mutationFn: (updateDepartment: DepartmentRequest) =>
			departmentService.update(updateDepartment, departmentIdFromPath),
	});

	const updateDepartmentFun = (values: DepartmentRequest) => {
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
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
				}}
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
				{department ? (
					<>
						<h1 style={{ textAlign: "center" }}>Edit department</h1>
						<Form
							name="department"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{
								display: "flex",
								width: "75%",
								justifyContent: "center",
								flexDirection: "column",
							}}
							onFinish={updateDepartmentFun}
							initialValues={department}
						>
							<Form.Item label="Department name" name="name">
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
									direction="horizontal"
									style={{
										display: "flex",
										justifyContent: "center",
										width: "100%",
									}}
									size={"large"}
								>
									<Button onClick={() => navigate(-1)}>
										Back
									</Button>
									<Button
										type="primary"
										htmlType="submit"
										loading={mutation.isPending}
									>
										Edit
									</Button>
								</Space>
							</Form.Item>
						</Form>
					</>
				) : isloadError ? (
					<Alert
						message={`Error while fetch ${loadError}`}
						type="warning"
						closable
						style={{
							marginBottom: "20px",
						}}
					/>
				) : null}
			</Space>
		</>
	);
};

export default DepartmentEdit;
