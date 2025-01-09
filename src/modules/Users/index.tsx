import {
	Alert,
	Empty,
	message,
	Space,
	Table,
	Avatar,
	Dropdown,
	Menu,
	Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserResponse } from "@/types/users/serResponse";
import { MoreOutlined } from "@ant-design/icons";
import userService from "@/services/users.service";
import { useState } from "react";
import "../../styles/UserTable.css"; // Import the CSS file for custom styles

const UserTable = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	// Fetch users from the API
	const fetchUsers = async (): Promise<UserResponse[]> => {
		return userService.getUsers();
	};

	const {
		isError,
		error,
		data: users = [],
	} = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

	// Success message after deleting user
	const success = () => {
		messageApi.open({
			type: "success",
			content: "User deleted successfully",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	// Mutation for deleting user
	const deleteUserMutation = useMutation({
		mutationFn: (id: number) => userService.deleteUser(id),
		onSuccess: success,
		onError: (error: any) => {
			messageApi.open({
				type: "error",
				content: `Error deleting user: ${error.message || "Something went wrong!"}`,
			});
		},
	});

	const deleteUser = (id: number) => {
		deleteUserMutation.mutate(id);
	};

	// Handle individual checkbox selection
	const handleCheckboxChange = (e: any, userId: number) => {
		const checked = e.target.checked;
		if (checked) {
			setSelectedRowKeys((prevSelectedKeys) => [
				...prevSelectedKeys,
				userId,
			]);
		} else {
			setSelectedRowKeys((prevSelectedKeys) =>
				prevSelectedKeys.filter((key) => key !== userId)
			);
		}
	};

	// Handle select/deselect all checkboxes
	const handleSelectAllChange = (e: any) => {
		if (e.target.checked) {
			setSelectedRowKeys(users.map((user) => user.id));
		} else {
			setSelectedRowKeys([]);
		}
	};

	// Row class name based on selection
	const rowClassName = (record: { id: number }) => {
		return selectedRowKeys.includes(record.id) ? "selected-row" : "";
	};

	const columns = [
		{
			title: (
				<Checkbox
					checked={selectedRowKeys.length === users.length}
					indeterminate={
						selectedRowKeys.length > 0 &&
						selectedRowKeys.length < users.length
					}
					onChange={handleSelectAllChange}
				/>
			),
			key: "checkbox",
			render: (_: any, record: UserResponse) => (
				<Checkbox
					checked={selectedRowKeys.includes(record.id)}
					onChange={(e) => handleCheckboxChange(e, record.id)}
				/>
			),
		},
		{
			title: "Users",
			key: "fullName",
			render: (_: any, record: UserResponse) => (
				<Space>
					<Avatar src={record.photo} size={40} />
					<span>
						{record.name} {record.surname}
					</span>
				</Space>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Phone Number",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Position",
			dataIndex: "position",
			key: "position",
		},
		{
			title: "Department",
			dataIndex: "department",
			key: "department",
		},
		{
			title: "Activity",
			dataIndex: "activity",
			key: "activity",
		},
		{
			title: "",
			key: "actions",
			render: (_: any, record: { id: number }) => (
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item
								key="1"
								onClick={() =>
									navigate(`/user/edit/${record.id}`)
								}
							>
								Edit
							</Menu.Item>
							<Menu.Item
								key="2"
								danger
								onClick={() => deleteUser(record.id)}
							>
								Delete
							</Menu.Item>
						</Menu>
					}
					trigger={["click"]}
				>
					<MoreOutlined
						style={{
							fontSize: "20px",
							cursor: "pointer" /* İkon kliklənən olur */,
							color: "rgba(0, 0, 0, 0.65)",
						}}
					/>
				</Dropdown>
			),
		},
	];

	return (
		<>
			{contextHolder}
			<Space direction="vertical" style={{ display: "flex" }}>
				{isError && (
					<Alert
						message={`Error: ${error}`}
						type="warning"
						closable
						style={{ marginBottom: "20px" }}
					/>
				)}

				{users.length ? (
					<Table
						columns={columns}
						dataSource={users}
						rowKey={(record) => record.id.toString()}
						rowClassName={rowClassName}
						pagination={false}
						bordered={false}
						style={{ marginBottom: "20px" }}
					/>
				) : (
					<Empty description="No users found" />
				)}
			</Space>
		</>
	);
};

export default UserTable;
