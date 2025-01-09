import { PaymentRequest } from "@/types/payment/PaymentRequest";
import paymentService from "@/services/payment.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Form, Input, Select, Space, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const currencies = ["USD", "EUR", "GBP", "AZN"];
const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer"];

const PaymentEdit = () => {
	const navigate = useNavigate();
	const { paymentId } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const [paymentIdFromPath, setPaymentIdFromPath] = useState<number | null>(
		null
	);

	useEffect(() => {
		if (paymentId) {
			setPaymentIdFromPath(parseInt(paymentId));
		}
	}, [paymentId]);

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Payment updated successfully",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const fetchPayment = async () => {
		if (!paymentIdFromPath) throw new Error("Invalid payment ID");
		const { data } = await paymentService.getById(paymentIdFromPath);
		return data;
	};

	const {
		data: payment,
		isLoading: isFetching,
		isError: isLoadError,
		error: loadError,
	} = useQuery({
		queryKey: ["payment", paymentIdFromPath],
		queryFn: fetchPayment,
		enabled: !!paymentIdFromPath,
		retry: false,
	});

	const mutation = useMutation({
		mutationFn: (updatePayment: PaymentRequest) =>
			paymentService.update(updatePayment, paymentIdFromPath!),
	});

	const updatePayment = (values: PaymentRequest) => {
		mutation.mutate(values);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate("/payment");
			}, 2500);
		}
	}, [mutation.isSuccess]);

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
				{isFetching ? (
					<Alert
						message="Loading payment data..."
						type="info"
						closable
						style={{ marginBottom: "20px" }}
					/>
				) : isLoadError ? (
					<Alert
						message={`Error while fetching data: ${loadError}`}
						type="warning"
						closable
						style={{ marginBottom: "20px" }}
					/>
				) : null}

				{payment && (
					<>
						<h1 style={{ textAlign: "center" }}>Edit Payment</h1>
						<Form
							name="payment"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							style={{
								maxWidth: 600,
							}}
							onFinish={updatePayment}
							initialValues={payment}
						>
							<Form.Item
								label="Payment Name"
								name="name"
								rules={[
									{
										required: true,
										message: "Please input payment name!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Payment Amount"
								name="amount"
								rules={[
									{
										required: true,
										message: "Please input payment amount!",
									},
								]}
							>
								<Input type="number" />
							</Form.Item>
							<Form.Item
								label="Currency"
								name="currency"
								rules={[
									{
										required: true,
										message: "Please select a currency!",
									},
								]}
							>
								<Select placeholder="Select currency">
									{currencies.map((currency) => (
										<Select.Option
											key={currency}
											value={currency}
										>
											{currency}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								label="Payment Method"
								name="method"
								rules={[
									{
										required: true,
										message:
											"Please select a payment method!",
									},
								]}
							>
								<Select placeholder="Select method">
									{paymentMethods.map((method) => (
										<Select.Option
											key={method}
											value={method}
										>
											{method}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item
								label="Payment Status"
								name="status"
								rules={[
									{
										required: true,
										message:
											"Please select payment status!",
									},
								]}
							>
								<Select placeholder="Select status">
									<Select.Option value="pending">
										Pending
									</Select.Option>
									<Select.Option value="completed">
										Completed
									</Select.Option>
									<Select.Option value="failed">
										Failed
									</Select.Option>
								</Select>
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
										Update
									</Button>
								</Space>
							</Form.Item>
						</Form>
					</>
				)}
			</Space>
		</>
	);
};

export default PaymentEdit;
