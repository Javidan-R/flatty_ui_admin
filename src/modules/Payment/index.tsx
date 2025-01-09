import { PaymentResponse } from "@/types/payment/PaymentResponse";
import { Alert, Button, Empty, message, Popconfirm, Space, Table } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { useNavigate } from "react-router-dom";
import paymentService from "@/services/payment.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Payment = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const fetchPayments = async () => {
		const { data } = await paymentService.getAll();
		return data;
	};

	const {
		isError,
		error,
		data: payments,
	} = useQuery({
		queryKey: ["payments"],
		queryFn: fetchPayments,
	});

	const success = (msg: string) => {
		messageApi.open({
			type: "success",
			content: msg,
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const deletePaymentMutation = useMutation({
		mutationFn: (id: number) => paymentService.delete(id),
	});

	const deletePayment = (id: number) => {
		deletePaymentMutation.mutate(id);
	};

	useEffect(() => {
		if (deletePaymentMutation.isSuccess) {
			success("Payment deleted successfully");
			setTimeout(() => {
				navigate(0);
			}, 2500);
		}
	}, [deletePaymentMutation]);

	const columns = [
		{
			title: "№",
			key: "index",
			render: (_: any, _record: any, index: number) => <b>{index + 1}</b>,
		},
		{
			title: "User ID",
			dataIndex: "userId",
			key: "userId",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
		},
		{
			title: "Currency",
			dataIndex: "currency",
			key: "currency",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) => (
				<span
					style={{
						color:
							status === "completed"
								? "green"
								: status === "failed"
									? "red"
									: "orange",
					}}
				>
					{status}
				</span>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (_: any, record: PaymentResponse) => (
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
						onConfirm={() => deletePayment(record.id)}
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
				{isError && (
					<Alert
						message={`Error: ${error}`}
						type="warning"
						closable
					/>
				)}

				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => navigate("create")}
				>
					Add Payment
				</Button>

				{payments?.length ? (
					<Table
						columns={columns}
						dataSource={payments}
						rowKey={(record) => record.id.toString()}
					/>
				) : (
					<Empty description="No payments found" />
				)}
			</Space>
		</>
	);
};

export default Payment;
