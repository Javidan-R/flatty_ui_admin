import Order from "@/modules/Order";
import OrderCreate from "@/modules/Order/create";
import OrderEdit from "@/modules/Order/edit";
import { RouteObject } from "react-router-dom";

const orderRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <Order />,
	},
	{
		path: "create",
		element: <OrderCreate />,
	},
	{
		path: "edit/:orderId",
		element: <OrderEdit />,
	},
];

export default orderRoutes;
