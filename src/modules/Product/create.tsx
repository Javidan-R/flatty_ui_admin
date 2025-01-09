import productService from "@/services/product.service";
import { ProductRequest } from "@/types/product/ProductRequest";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Product added successfully",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const mutation = useMutation({
		mutationFn: (newProduct: ProductRequest) =>
			productService.addNew(newProduct),
	});

	const createProduct = (values: ProductRequest) => {
		mutation.mutate(values);
	};

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
						style={{ marginBottom: "20px" }}
					/>
				) : null}
				<h1 style={{ textAlign: "center" }}>Create a Product</h1>
				<Form
					name="product"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					onFinish={createProduct}
				>
					<Form.Item
						label="Product Name"
						name="name"
						rules={[
							{
								required: true,
								message: "Please input product name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Product Description" name="description">
						<Input />
					</Form.Item>
					<Form.Item
						label="Price"
						name="price"
						rules={[
							{
								required: true,
								message: "Please input product price!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Space style={{ display: "flex" }} size={"large"}>
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

export default ProductCreate;
