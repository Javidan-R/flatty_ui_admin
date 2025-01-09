import Vendor from "@/modules/Vendor";
import { RouteObject } from "react-router-dom";

const vendorRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <Vendor />,
	},
];

export default vendorRoutes;
