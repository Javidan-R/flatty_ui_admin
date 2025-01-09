import { PaymentRequest } from "@/types/payment/PaymentRequest";
import paymentService from "@/services/payment.service";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Select, Space, message } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentCreate = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();

	// Notification for successful creation
	const success = () => {
		messageApi.open({
			type: "success",
			content: "Payment created successfully",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	// Payment creation mutation
	const mutation = useMutation({
		mutationFn: (newPayment: PaymentRequest) =>
			paymentService.create(newPayment),
	});

	// Handle form submission
	const createPayment = (values: PaymentRequest) => {
		mutation.mutate(values, {
			onSuccess: () => {
				success();
				setTimeout(() => {
					navigate("/payment");
				}, 2500);
			},
		});
	};

	// Payment methods and currency options
	const paymentMethods = [
		{ label: "Credit Card", value: "credit_card" },
		{ label: "Bank Transfer", value: "bank_transfer" },
		{ label: "PayPal", value: "paypal" },
		{ label: "Cash", value: "cash" },
	];

	const currencyOptions = [
		{ label: "USD", value: "USD" },
		{ label: "EUR", value: "EUR" },
		{ label: "AZN", value: "AZN" },
		{ label: "GBP", value: "GBP" },
	];

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
				<h1 style={{ textAlign: "center" }}>Create Payment</h1>
				<Form
					form={form}
					name="create_payment"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{
						maxWidth: 600,
					}}
					onFinish={createPayment}
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
						<Select
							options={currencyOptions}
							placeholder="Select currency"
						/>
					</Form.Item>

					<Form.Item
						label="Payment Method"
						name="method"
						rules={[
							{
								required: true,
								message: "Please select a payment method!",
							},
						]}
					>
						<Select
							options={paymentMethods}
							placeholder="Select payment method"
						/>
					</Form.Item>

					<Form.Item
						label="Payment Status"
						name="status"
						rules={[
							{
								required: true,
								message: "Please select payment status!",
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
							<Select.Option value="failed">Failed</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item>
						<Space style={{ display: "flex" }} size={"large"}>
							<Button onClick={() => navigate("/payment")}>
								Back
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

export default PaymentCreate;
