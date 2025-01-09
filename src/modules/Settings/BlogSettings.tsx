import React from "react";
import { Form, Input, Button } from "antd";

const BlogSettings: React.FC<{ onSave: Function }> = ({ onSave }) => {
	const onFinish = (values: any) => {
		onSave(values); // Dəyişiklikləri yuxarıda göndərir
	};

	return (
		<Form onFinish={onFinish} layout="vertical">
			<Form.Item
				label="Blog Title"
				name="blogTitle"
				rules={[{ required: true, message: "Please enter blog title" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Blog Description"
				name="blogDescription"
				rules={[
					{
						required: true,
						message: "Please enter blog description",
					},
				]}
			>
				<Input.TextArea />
			</Form.Item>
			<Button type="primary" htmlType="submit">
				Save Blog Settings
			</Button>
		</Form>
	);
};

export default BlogSettings;
