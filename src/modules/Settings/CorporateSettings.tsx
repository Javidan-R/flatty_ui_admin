import React from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CorporateSettings: React.FC<{ onSave: Function }> = ({ onSave }) => {
	const onFinish = (values: any) => {
		onSave(values); // Dəyişiklikləri yuxarıda göndərir
	};

	return (
		<Form onFinish={onFinish} layout="vertical">
			<Form.Item
				label="Brand Name"
				name="brandName"
				rules={[{ required: true, message: "Please enter brand name" }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Logo"
				name="logo"
				valuePropName="fileList"
				getValueFromEvent={(e: any) => e?.fileList}
				rules={[{ required: true, message: "Please upload logo" }]}
			>
				<Upload
					name="logo"
					listType="picture"
					maxCount={1}
					beforeUpload={() => false} // Prevent auto upload
				>
					<Button icon={<UploadOutlined />}>Upload Logo</Button>
				</Upload>
			</Form.Item>
			<Button type="primary" htmlType="submit">
				Save Corporate Settings
			</Button>
		</Form>
	);
};

export default CorporateSettings;
