import Payment from "@/modules/Payment";
import PaymentCreate from "@/modules/Payment/create";
import PaymentEdit from "@/modules/Payment/edit";
import { RouteObject } from "react-router-dom";

const paymentRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <Payment />,
	},
	{
		path: "create",
		element: <PaymentCreate />,
	},
	{
		path: "edit/:paymentId",
		element: <PaymentEdit />,
	},
];

export default paymentRoutes;
