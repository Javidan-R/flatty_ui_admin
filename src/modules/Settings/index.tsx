import React, { useState, useEffect } from "react";
import { Tabs, Button, Table, Modal, message, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

// LocalStorage xidməti
const loadFromStorage = (key: string) =>
	JSON.parse(localStorage.getItem(key) || "[]");

const saveToStorage = (key: string, data: any) =>
	localStorage.setItem(key, JSON.stringify(data));

// Məlumat növü
interface SettingItem {
	id: number;
	name: string;
	value: string;
}

interface ModalState {
	visible: boolean;
	editingData: SettingItem | null;
}

const Settings: React.FC = () => {
	const [activeTab, setActiveTab] = useState("general");
	const [modalState, setModalState] = useState<ModalState>({
		visible: false,
		editingData: null,
	});

	// Hər bir məlumat üçün tip təyini
	const [general, setGeneral] = useState<SettingItem[]>(
		loadFromStorage("general")
	);
	const [userSettings, setUserSettings] = useState<SettingItem[]>(
		loadFromStorage("userSettings")
	);
	const [paymentSettings, setPaymentSettings] = useState<SettingItem[]>(
		loadFromStorage("paymentSettings")
	);
	const [logo, setLogo] = useState<SettingItem[]>(loadFromStorage("logo"));
	const [socialLinks, setSocialLinks] = useState<SettingItem[]>(
		loadFromStorage("socialLinks")
	);
	const [email, setEmail] = useState<SettingItem[]>(loadFromStorage("email"));
	const [phone, setPhone] = useState<SettingItem[]>(loadFromStorage("phone"));
	const [website, setWebsite] = useState<SettingItem[]>(
		loadFromStorage("website")
	);

	useEffect(() => {
		saveToStorage("general", general);
		saveToStorage("userSettings", userSettings);
		saveToStorage("paymentSettings", paymentSettings);
		saveToStorage("logo", logo);
		saveToStorage("socialLinks", socialLinks);
		saveToStorage("email", email);
		saveToStorage("phone", phone);
		saveToStorage("website", website);
	}, [
		general,
		userSettings,
		paymentSettings,
		logo,
		socialLinks,
		email,
		phone,
		website,
	]);

	// Məlumatı saxlamaq funksiyası
	const handleSave = (key: string, data: SettingItem) => {
		let setter: React.Dispatch<React.SetStateAction<SettingItem[]>>;

		switch (key) {
			case "general":
				setter = setGeneral;
				break;
			case "userSettings":
				setter = setUserSettings;
				break;
			case "paymentSettings":
				setter = setPaymentSettings;
				break;
			case "logo":
				setter = setLogo;
				break;
			case "socialLinks":
				setter = setSocialLinks;
				break;
			case "email":
				setter = setEmail;
				break;
			case "phone":
				setter = setPhone;
				break;
			case "website":
				setter = setWebsite;
				break;
			default:
				return;
		}

		setter((prev) => {
			if (modalState.editingData) {
				return prev.map((item) =>
					item.id === modalState.editingData?.id
						? { ...item, ...data }
						: item
				);
			}
			return [...prev, { ...data, id: Date.now() }];
		});

		setModalState({ visible: false, editingData: null });
		message.success("Settings saved successfully!");
	};

	// Məlumatı silmək funksiyası
	const handleDelete = (key: string, id: number) => {
		let setter: React.Dispatch<React.SetStateAction<SettingItem[]>>;

		switch (key) {
			case "general":
				setter = setGeneral;
				break;
			case "userSettings":
				setter = setUserSettings;
				break;
			case "paymentSettings":
				setter = setPaymentSettings;
				break;
			case "logo":
				setter = setLogo;
				break;
			case "socialLinks":
				setter = setSocialLinks;
				break;
			case "email":
				setter = setEmail;
				break;
			case "phone":
				setter = setPhone;
				break;
			case "website":
				setter = setWebsite;
				break;
			default:
				return;
		}

		setter((prev) => prev.filter((item) => item.id !== id));
		message.success("Setting deleted successfully!");
	};

	// Dəyişdirmək üçün məlumat seçimi
	const handleEdit = (data: SettingItem) => {
		setModalState({ visible: true, editingData: data });
	};

	const tabs = [
		{
			key: "general",
			title: "General Settings",
			data: general,
			form: GeneralSettingsForm,
		},
		{
			key: "userSettings",
			title: "User Settings",
			data: userSettings,
			form: UserSettingsForm,
		},
		{
			key: "paymentSettings",
			title: "Payment Settings",
			data: paymentSettings,
			form: PaymentSettingsForm,
		},
		{
			key: "logo",
			title: "Logo",
			data: logo,
			form: LogoForm,
		},
		{
			key: "socialLinks",
			title: "Social Links",
			data: socialLinks,
			form: SocialLinksForm,
		},
		{
			key: "email",
			title: "Email",
			data: email,
			form: EmailForm,
		},
		{
			key: "phone",
			title: "Phone",
			data: phone,
			form: PhoneForm,
		},
		{
			key: "website",
			title: "Website",
			data: website,
			form: WebsiteForm,
		},
	];

	return (
		<div>
			<Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
				{tabs.map(({ key, title, data, form: FormComponent }) => (
					<Tabs.TabPane tab={title} key={key}>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() =>
								setModalState({
									visible: true,
									editingData: null,
								})
							}
						>
							Add New
						</Button>
						<Table
							style={{ marginTop: 16 }}
							dataSource={data}
							rowKey="id"
							columns={[
								{
									title: "Name",
									dataIndex: "name",
									key: "name",
								},
								{
									title: "Value",
									dataIndex: "value",
									key: "value",
								},
								{
									title: "Actions",
									render: (_, record) => (
										<>
											<Button
												icon={<EditOutlined />}
												onClick={() =>
													handleEdit(record)
												}
												style={{ marginRight: 8 }}
											/>
											<Button
												icon={<DeleteOutlined />}
												danger
												onClick={() =>
													handleDelete(key, record.id)
												}
											/>
										</>
									),
								},
							]}
						/>
						<Modal
							title={
								modalState.editingData
									? "Edit Settings"
									: "Add New Settings"
							}
							visible={modalState.visible}
							onCancel={() =>
								setModalState({
									visible: false,
									editingData: null,
								})
							}
							footer={null}
						>
							<FormComponent
								initialValues={modalState.editingData || {}}
								onSave={(data: any) => handleSave(key, data)}
							/>
						</Modal>
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
};

export default Settings;

// Form Komponentləri

const GeneralSettingsForm: React.FC<any> = ({ initialValues, onSave }) => (
	<Form
		layout="vertical"
		initialValues={initialValues}
		onFinish={(values) => onSave(values)}
	>
		<Form.Item
			label="Setting Name"
			name="name"
			rules={[
				{ required: true, message: "Please enter the setting name!" },
			]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Setting Value"
			name="value"
			rules={[
				{ required: true, message: "Please enter the setting value!" },
			]}
		>
			<Input />
		</Form.Item>
		<Button type="primary" htmlType="submit">
			Save
		</Button>
	</Form>
);

const UserSettingsForm: React.FC<any> = ({ initialValues, onSave }) => (
	<Form
		layout="vertical"
		initialValues={initialValues}
		onFinish={(values) => onSave(values)}
	>
		<Form.Item
			label="User Name"
			name="name"
			rules={[{ required: true, message: "Please enter the user name!" }]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="User Email"
			name="value"
			rules={[
				{ required: true, message: "Please enter the user email!" },
			]}
		>
			<Input />
		</Form.Item>
		<Button type="primary" htmlType="submit">
			Save
		</Button>
	</Form>
);

const PaymentSettingsForm: React.FC<any> = ({ initialValues, onSave }) => (
	<Form
		layout="vertical"
		initialValues={initialValues}
		onFinish={(values) => onSave(values)}
	>
		<Form.Item
			label="Payment Method"
			name="name"
			rules={[
				{ required: true, message: "Please enter the payment method!" },
			]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Payment Value"
			name="value"
			rules={[
				{ required: true, message: "Please enter the payment value!" },
			]}
		>
			<Input />
		</Form.Item>
		<Button type="primary" htmlType="submit">
			Save
		</Button>
	</Form>
);

const LogoForm: React.FC<any> = ({ initialValues, onSave }) => (
	<Form
		layout="vertical"
		initialValues={initialValues}
		onFinish={(values) => onSave(values)}
	>
		<Form.Item
			label="Logo Name"
			name="name"
			rules={[{ required: true, message: "Please enter the logo name!" }]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Logo URL"
			name="value"
			rules={[{ required: true, message: "Please enter the logo URL!" }]}
		>
			<Input />
		</Form.Item>
		<Button type="primary" htmlType="submit">
			Save
		</Button>
	</Form>
);

const SocialLinksForm: React.FC<any> = ({ initialValues, onSave }) => (
	<Form
		layout="vertical"
		initialValues={initialValues}
		onFinish={(values) => onSave(values)}
	>
		<Form.Item
			label="Social Platform"
			name="name"
			rules={[
				{ required: true, message: "Please enter the platform name!" },
			]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Link"
			name="value"
			rules={[
				{ required: true, message: "Please enter the social link!" },
			]}
		>
			<Input />
		</Form.Item>
		<Button type="primary" htmlType="submit">
			Save
		</Button>
	</Form>
);

const EmailForm: React.FC<any> = ({ initialValues, onSave }) => (
	<Form
		layout="vertical"
		initialValues={initialValues}
		onFinish={(values) => onSave(values)}
	>
		<Form.Item
			label="Email Address"
			name="name"
			rules={[
				{ required: true, message: "Please enter the email address!" },
			]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Email Value"
			name="value"
			rules={[
				{ required: true, message: "Please enter the email value!" },
			]}
		>
			<Input />
		</Form.Item>
		<Button type="primary" htmlType="submit">
			Save
		</Button>
	</Form>
);

const PhoneForm: React.FC<any> = ({ initialValues, onSave }) => (
	<Form
		layout="vertical"
		initialValues={initialValues}
		onFinish={(values) => onSave(values)}
	>
		<Form.Item
			label="Phone Number"
			name="name"
			rules={[
				{ required: true, message: "Please enter the phone number!" },
			]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Phone Value"
			name="value"
			rules={[
				{ required: true, message: "Please enter the phone value!" },
			]}
		>
			<Input />
		</Form.Item>
		<Button type="primary" htmlType="submit">
			Save
		</Button>
	</Form>
);

const WebsiteForm: React.FC<any> = ({ initialValues, onSave }) => (
	<Form
		layout="vertical"
		initialValues={initialValues}
		onFinish={(values) => onSave(values)}
	>
		<Form.Item
			label="Website URL"
			name="name"
			rules={[
				{ required: true, message: "Please enter the website name!" },
			]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Website Link"
			name="value"
			rules={[
				{ required: true, message: "Please enter the website URL!" },
			]}
		>
			<Input />
		</Form.Item>
		<Button type="primary" htmlType="submit">
			Save
		</Button>
	</Form>
);
