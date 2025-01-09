import Settings from "@/modules/Settings";
import { RouteObject } from "react-router-dom";

const settingsRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <Settings />,
	},
];

export default settingsRoutes;
