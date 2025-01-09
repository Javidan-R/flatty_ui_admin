import User from "@/modules/Users";
import { RouteObject } from "react-router-dom";

const userRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <User />,
	},
];

export default userRoutes;
