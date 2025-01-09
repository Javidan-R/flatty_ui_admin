import Product from "@/modules/Product";
import ProductCreate from "@/modules/Product/create";
import ProductEdit from "@/modules/Product/edit";
import { RouteObject } from "react-router-dom";

const productRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <Product />,
	},
	{
		path: "create",
		element: <ProductCreate />,
	},
	{
		path: "edit/:productId",
		element: <ProductEdit />,
	},
];

export default productRoutes;
