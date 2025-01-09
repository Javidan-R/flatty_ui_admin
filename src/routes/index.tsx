import { RouteObject } from "react-router-dom";
import Dashboard from "@modules/Dashboard/index.tsx";
import Layout from "@components/AppLayout.tsx";
import Login from "@modules/Auth/login.tsx";
import NotFound from "@components/NotFound.tsx";
import categoryRoutes from "./category.tsx";
import departmentRoutes from "./department.tsx";
import vendorRoutes from "./vendor.tsx";
import productRoutes from "./product.tsx";
import orderRoutes from "./order.tsx";
import paymentRoutes from "./payment.tsx";
import settingsRoutes from "./settings.tsx";
import userRoutes from "./users.tsx";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "users",
				children: userRoutes,
			},
			{
				path: "category",
				children: categoryRoutes,
			},
			{
				path: "department",
				children: departmentRoutes,
			},
			{
				path: "product",
				children: productRoutes,
			},
			{
				path: "order",
				children: orderRoutes,
			},
			{
				path: "payment",
				children: paymentRoutes,
			},

			{
				path: "vendor",
				children: vendorRoutes,
			},
			{
				path: "settings",
				children: settingsRoutes,
			},
		],
	},
	{
		path: "auth/*",
		children: [
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
];

export default routes;
