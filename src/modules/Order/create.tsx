import { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/services/order.service";
import { CreateOrderRequest } from "@/types/order/orderTypes";

const OrderCreate = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (values: CreateOrderRequest) => {
		setLoading(true);
		try {
			await createOrder(values);
			message.success("Order created successfully");
			navigate("/order");
		} catch (error) {
			message.error("Failed to create order");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>Create Order</h1>
			<Form
				form={form}
				onFinish={handleSubmit}
				initialValues={{
					status: "pending",
				}}
			>
				<Form.Item
					label="Customer Name"
					name="customerName"
					rules={[
						{
							required: true,
							message: "Customer name is required",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Total Amount"
					name="total"
					rules={[
						{ required: true, message: "Total amount is required" },
					]}
				>
					<Input type="number" />
				</Form.Item>

				<Form.Item
					label="Status"
					name="status"
					rules={[
						{ required: true, message: "Order status is required" },
					]}
				>
					<Select>
						<Select.Option value="pending">Pending</Select.Option>
						<Select.Option value="completed">
							Completed
						</Select.Option>
						<Select.Option value="shipped">Shipped</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading}>
						Create Order
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default OrderCreate;
