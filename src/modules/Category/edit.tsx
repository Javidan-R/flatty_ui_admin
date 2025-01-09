import { useQuery, useMutation } from "@tanstack/react-query";
import { Alert, Button, Form, Input, Select, Space, message } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "@/services/category.service.ts";
import departmentService from "@/services/department.service.ts";
import { CategoryRequest } from "@/types/category/CategoryRequest";
import { CategoryResponse } from "@/types/category/CategoryResponse";
import { DepartmentResponse } from "@/types/department/DepartmentResponse";

const { Option } = Select;

const CategoryEdit = () => {
	const { id } = useParams<{ id: string }>(); // Category ID from URL
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	// Fetch existing category data
	const { data: category, isLoading: isCategoryLoading } =
		useQuery<CategoryResponse>({
			queryKey: ["category", id],
			queryFn: () =>
				categoryService.getById(Number(id)).then((res) => res.data),
			enabled: !!id,
		});

	// Fetch departments
	const { data: departments, isLoading: isDepartmentsLoading } = useQuery<
		DepartmentResponse[]
	>({
		queryKey: ["departments"],
		queryFn: () => departmentService.getAll().then((res) => res.data),
	});

	// Mutation for updating the category
	const updateCategoryMutation = useMutation({
		mutationFn: (updatedCategory: CategoryRequest) =>
			categoryService.update(updatedCategory, Number(id)),
		onSuccess: () => {
			messageApi.open({
				type: "success",
				content: "Category updated successfully!",
			});
			setTimeout(() => navigate("/category"), 2500);
		},
		onError: (error: any) => {
			messageApi.open({
				type: "error",
				content: `Failed to update category: ${error.message || "Unknown error"}`,
			});
		},
	});

	const onFinish = (values: CategoryRequest) => {
		updateCategoryMutation.mutate(values);
	};

	useEffect(() => {
		if (!id) {
			messageApi.open({
				type: "error",
				content: "Invalid category ID",
			});
			navigate("/category");
		}
	}, [id, navigate]);

	return (
		<>
			{contextHolder}
			<Space
				direction="vertical"
				style={{ display: "flex", maxWidth: 600, margin: "auto" }}
				size={"large"}
			>
				<h1 style={{ textAlign: "center" }}>Edit Category</h1>
				{isCategoryLoading || isDepartmentsLoading ? (
					<Alert
						message="Loading data..."
						type="info"
						showIcon
						style={{ marginBottom: "20px" }}
					/>
				) : (
					<Form
						name="edit-category"
						layout="vertical"
						initialValues={{
							name: category?.name,
							description: category?.description,
							departmentId: departments?.find(
								(dept) => dept.name === category?.departmentName
							)?.id,
						}}
						onFinish={onFinish}
					>
						<Form.Item
							label="Category Name"
							name="name"
							rules={[
								{
									required: true,
									message: "Please input the category name!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item label="Description" name="description">
							<Input />
						</Form.Item>
						<Form.Item
							label="Department"
							name="departmentId"
							rules={[
								{
									required: true,
									message: "Please select a department!",
								},
							]}
						>
							<Select placeholder="Select a department">
								{departments?.map((department) => (
									<Option
										key={department.id}
										value={department.id}
									>
										{department.name}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item>
							<Space size="middle">
								<Button onClick={() => navigate(-1)}>
									Cancel
								</Button>
								<Button type="primary" htmlType="submit">
									Update
								</Button>
							</Space>
						</Form.Item>
					</Form>
				)}
			</Space>
		</>
	);
};

export default CategoryEdit;
