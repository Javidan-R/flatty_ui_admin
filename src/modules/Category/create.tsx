import categoryService from "@/services/category.service.ts";
import departmentService from "@/services/department.service.ts";
import { CategoryRequest } from "@/types/category/CategoryRequest.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Select, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CategoryCreate = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Category added",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const fetchDepartments = async () => {
		const { data } = await departmentService.getAll();
		return data;
	};

	const { data: departments } = useQuery({
		queryKey: ["departments"],
		queryFn: () => fetchDepartments(),
	});

	const mutation = useMutation({
		mutationFn: (newCategory: CategoryRequest) =>
			categoryService.addNew(newCategory),
	});

	const createCategory = (values: CategoryRequest) => {
		mutation.mutate(values);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate("/category");
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
				<h1 style={{ textAlign: "center" }}>Create a category</h1>
				<Form
					name="category"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					onFinish={createCategory}
				>
					<Form.Item
						label="Category name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input category name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Category description" name="description">
						<Input />
					</Form.Item>
					{departments ? (
						<Form.Item label="Department" name="departmentId">
							<Select
								showSearch
								placeholder="Select a department"
							>
								{departments.map((department, index) => (
									<Option key={index} value={department.id}>
										{department.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					) : null}
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

export default CategoryCreate;
