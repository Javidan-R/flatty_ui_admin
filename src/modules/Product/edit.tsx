import { ProductRequest } from "@/types/product/ProductRequest";
import productService from "@/services/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
	const navigate = useNavigate();
	const { productId } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const [productIdFromPath, setProductIdFromPath] = useState(0);

	useEffect(() => {
		if (productId) {
			setProductIdFromPath(parseInt(productId as string));
		}
	}, [productId]);

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Product updated successfully",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const fetchProduct = async () => {
		const { data } = await productService.getById(productIdFromPath);
		return data;
	};

	const {
		data: product,
		isError: isLoadError,
		error: loadError,
	} = useQuery({
		queryKey: ["product"],
		queryFn: fetchProduct,
		enabled: productIdFromPath !== 0,
	});

	const mutation = useMutation({
		mutationFn: (updateProduct: ProductRequest) =>
			productService.update(updateProduct, productIdFromPath),
	});

	const updateProduct = (values: ProductRequest) => {
		mutation.mutate(values);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate("/product");
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
						style={{ marginBottom: "20px" }}
					/>
				) : null}
				{product ? (
					<>
						<h1 style={{ textAlign: "center" }}>Edit Product</h1>
						<Form
							name="product"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{
								maxWidth: 600,
							}}
							onFinish={updateProduct}
							initialValues={product}
						>
							<Form.Item label="Product Name" name="name">
								<Input />
							</Form.Item>
							<Form.Item
								label="Product Description"
								name="description"
							>
								<Input />
							</Form.Item>
							<Form.Item label="Price" name="price">
								<Input />
							</Form.Item>
							<Form.Item>
								<Space
									style={{ display: "flex" }}
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
				) : isLoadError ? (
					<Alert
						message={`Error while fetching data: ${loadError}`}
						type="warning"
						closable
						style={{ marginBottom: "20px" }}
					/>
				) : null}
			</Space>
		</>
	);
};

export default ProductEdit;
