import { ProductResponse } from "@/types/product/ProductResponse";
import { Alert, Button, Empty, message, Popconfirm, Space } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import Table, { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import productService from "@/services/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Product = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const fetchProducts = async () => {
		const { data } = await productService.getAll();
		return data;
	};

	const {
		isError,
		error,
		data: products,
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	// Uğurlu silinmə bildirişi
	const success = () => {
		messageApi.open({
			type: "success",
			content: "Product deleted successfully",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const deleteProductMutation = useMutation({
		mutationFn: (id: number) => productService.delete(id),
	});

	const deleteProduct = (id: number) => {
		deleteProductMutation.mutate(id);
	};

	useEffect(() => {
		if (deleteProductMutation.isSuccess) {
			success(); // Məhsul uğurla silindikdə success mesajını göstər
			setTimeout(() => {
				navigate(0); // Sayfanı yenilə
			}, 2500);
		}
	}, [deleteProductMutation]);

	const columns: ColumnsType<ProductResponse> = [
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
			title: "Price",
			dataIndex: "price",
			key: "price",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record: ProductResponse) => (
				<Space size="middle">
					<a
						onClick={() => {
							navigate(`edit/${record.id}`);
						}}
					>
						Edit
					</a>
					<Popconfirm
						title="Are you sure?"
						onConfirm={() => deleteProduct(record.id)} // Məhsul silinərkən `deleteProduct` funksiyasını çağır
					>
						<a>Delete</a>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			{contextHolder}
			<Space
				direction="vertical"
				style={{ display: "flex" }}
				size={"large"}
			>
				{isError ? (
					<Alert
						message={`Error: ${error}`}
						type="warning"
						closable
						style={{ marginBottom: "20px" }}
					/>
				) : null}

				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => navigate("create")}
				>
					Add Product
				</Button>
				{products?.length ? (
					<Table
						columns={columns}
						dataSource={products}
						rowKey={(record) => record.id.toString()}
					/>
				) : (
					<Empty description="No products found" />
				)}
			</Space>
		</>
	);
};

export default Product;
