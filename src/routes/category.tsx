import Category from "@/modules/Category";
import CategoryCreate from "@/modules/Category/create";
import CategoryEdit from "@/modules/Category/edit";
import { RouteObject } from "react-router-dom";

const categoryRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <Category />,
	},
	{
		path: "create",
		element: <CategoryCreate />,
	},
	{
		path: "edit/:categoryId",
		element: <CategoryEdit />,
	},
];

export default categoryRoutes;
