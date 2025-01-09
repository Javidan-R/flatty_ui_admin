import { DepartmentResponse } from "@/types/department/DepartmentResponse.ts";
import { Alert, Button, Empty, message, Popconfirm, Space } from "antd";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import Table, { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import departmentService from "@/services/department.service.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Department = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const fetchDepartments = async () => {
		const { data } = await departmentService.getAll();
		return data;
	};

	const {
		isError,
		error,
		data: departments,
	} = useQuery({
		queryKey: ["departments"],
		queryFn: () => fetchDepartments(),
	});

	const success = () => {
		messageApi.open({
			type: "success",
			content: "Department deleted",
		});
		setTimeout(messageApi.destroy, 2000);
	};

	const deleteDepartmentMutation = useMutation({
		mutationFn: (id: number) => departmentService.delete(id),
	});

	const deleteDepartment = (id: number) => {
		deleteDepartmentMutation.mutate(id);
	};

	useEffect(() => {
		if (deleteDepartmentMutation.isSuccess) {
			success();
			setTimeout(() => {
				navigate(0);
			}, 2500);
		}
	}, [deleteDepartmentMutation]);

	const columns: ColumnsType<DepartmentResponse> = [
		{
			title: "№",
			key: "index",
			render: (_, _record, index) => <b>{index + 1}</b>,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record: DepartmentResponse) => (
				<Space size="middle">
					<a
						key={_}
						onClick={() => {
							navigate(`edit/${record.id}`);
						}}
					>
						Edit
					</a>
					<Popconfirm
						title="Delete the department"
						description="Are you sure to delete this department?"
						okText="Yes"
						cancelText="No"
						onConfirm={() => deleteDepartment(record?.id)}
						okButtonProps={{
							loading: deleteDepartmentMutation.isPending,
						}}
					>
						<a key={_ + 1}>Delete</a>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			{contextHolder}
			{isError ? (
				<Alert
					message={`There is some error. ${error}`}
					type="warning"
					closable
					style={{
						marginBottom: "20px",
					}}
				/>
			) : null}
			<Space
				direction="vertical"
				style={{ display: "flex" }}
				size={"large"}
			>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => navigate("create")}
				>
					Add new
				</Button>
				{departments ? (
					<Table
						columns={columns}
						dataSource={departments}
						rowKey={"id"}
					/>
				) : (
					<Empty />
				)}
			</Space>
		</>
	);
};

export default Department;
