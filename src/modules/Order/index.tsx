import { useEffect, useState } from "react";
import { message, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { getOrders } from "@/services/order.service";
import type { Order as OrderType } from "@/types/order/orderTypes";

const Order = () => {
	const [orders, setOrders] = useState<OrderType[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		setLoading(true);
		try {
			const response = await getOrders();
			setOrders(response.data);
		} catch (error) {
			message.error("Failed to load orders");
		} finally {
			setLoading(false);
		}
	};

	const columns = [
		{
			title: "Order ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Customer",
			dataIndex: "customerName",
			key: "customerName",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Total",
			dataIndex: "total",
			key: "total",
		},
		{
			title: "Actions",
			render: (text: any, record: OrderType) => (
				<>
					<Link to={`/order/edit/${record.id}`}>
						<Button>Edit</Button>
					</Link>
				</>
			),
		},
	];

	return (
		<div>
			<h1>Orders</h1>
			<Button type="primary">
				<Link to="/order/create">Create Order</Link>
			</Button>
			<Table
				dataSource={orders}
				columns={columns}
				loading={loading}
				rowKey="id"
			/>
		</div>
	);
};

export default Order;
