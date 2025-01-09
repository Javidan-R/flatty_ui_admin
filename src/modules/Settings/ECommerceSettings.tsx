import React from "react";
import { Form, Input, Select, Button } from "antd";

const ECommerceSettings: React.FC<{ onSave: Function }> = ({ onSave }) => {
	const onFinish = (values: any) => {
		onSave(values); // Dəyişiklikləri yuxarıda göndərir
	};

	return (
		<Form onFinish={onFinish} layout="vertical">
			<Form.Item
				label="Store Name"
				name="storeName"
				rules={[{ required: true, message: "Please enter store name" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Currency"
				name="currency"
				rules={[{ required: true, message: "Please select currency" }]}
			>
				<Select>
					<Select.Option value="USD">USD</Select.Option>
					<Select.Option value="EUR">EUR</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item
				label="Payment Method"
				name="paymentMethod"
				rules={[
					{
						required: true,
						message: "Please select a payment method",
					},
				]}
			>
				<Select>
					<Select.Option value="paypal">PayPal</Select.Option>
					<Select.Option value="creditCard">
						Credit Card
					</Select.Option>
				</Select>
			</Form.Item>
			<Button type="primary" htmlType="submit">
				Save E-Commerce Settings
			</Button>
		</Form>
	);
};

export default ECommerceSettings;
