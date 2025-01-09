import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById, updateOrder } from "@/services/order.service";
import { Order, UpdateOrderRequest } from "@/types/order/orderTypes";

const OrderEdit = () => {
	const { orderId } = useParams();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState<Order | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (orderId) {
			fetchOrder();
		}
	}, [orderId]);

	const fetchOrder = async () => {
		setLoading(true);
		try {
			const response = await getOrderById(orderId!);
			setOrder(response.data);
			form.setFieldsValue(response.data);
		} catch (error) {
			message.error("Failed to fetch order");
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (values: UpdateOrderRequest) => {
		setLoading(true);
		try {
			await updateOrder(orderId!, values);
			message.success("Order updated successfully");
			navigate("/order");
		} catch (error) {
			message.error("Failed to update order");
		} finally {
			setLoading(false);
		}
	};

	if (!order) return null;

	return (
		<div>
			<h1>Edit Order</h1>
			<Form form={form} onFinish={handleSubmit} initialValues={order}>
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
						Update Order
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default OrderEdit;
