import { Alert, Button, Empty, message, Popconfirm, Space } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useNavigate } from "react-router-dom";
import Table, { ColumnsType } from "antd/es/table";
import { CategoryResponse } from "@/types/category/CategoryResponse.ts";
import categoryService from "@/services/category.service.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Category = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const fetchCategories = async () => {
		const { data } = await categoryService.getAll();
		return data;
	};

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Category deleted",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const deleteCategoryMutation = useMutation({
		mutationFn: (id: number) => categoryService.delete(id),
	});

	const deleteCategory = (id: number) => {
		deleteCategoryMutation.mutate(id);
	};

	useEffect(() => {
		if (deleteCategoryMutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate(0);
			}, 2500);
		}
	}, [deleteCategoryMutation]);

	const {
		isError,
		error,
		data: categories,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: () => fetchCategories(),
	});

	const columns: ColumnsType<CategoryResponse> = [
		{
			title: "№",
			key: "index",
			render: (_, _record, index) => <b>{index + 1}</b>,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Department",
			dataIndex: "departmentName",
			key: "departmentName",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record: CategoryResponse) => (
				<Space size="middle">
					<a
						key={_}
						onClick={() => {
							navigate(`edit/${record.id}`);
						}}
					>
						Edit
					</a>
					<Popconfirm
						title="Delete the category"
						description="Are you sure to delete this category?"
						okText="Yes"
						cancelText="No"
						onConfirm={() => deleteCategory(record?.id)}
						okButtonProps={{
							loading: deleteCategoryMutation.isPending,
						}}
					>
						<a key={_ + 1}>Delete</a>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			{contextHolder}
			{isError ? (
				<Alert
					message={`There is some error. ${error}`}
					type="warning"
					closable
					style={{
						marginBottom: "20px",
					}}
				/>
			) : null}
			<Space
				direction="vertical"
				style={{ display: "flex" }}
				size={"large"}
			>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => navigate("create")}
				>
					Add new
				</Button>
				{categories ? (
					<Table
						columns={columns}
						dataSource={categories}
						rowKey={"id"}
					/>
				) : (
					<Empty />
				)}
			</Space>
		</>
	);
};

export default Category;
