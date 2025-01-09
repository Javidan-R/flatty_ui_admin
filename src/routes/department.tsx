import Department from "@/modules/Department";
import DepartmentCreate from "@/modules/Department/create";
import DepartmentEdit from "@/modules/Department/edit";
import { RouteObject } from "react-router-dom";

const departmentRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <Department />,
	},
	{
		path: "create",
		element: <DepartmentCreate />,
	},
	{
		path: "edit/:departmentId",
		element: <DepartmentEdit />,
	},
];

export default departmentRoutes;
