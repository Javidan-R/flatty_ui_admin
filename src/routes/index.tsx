import { RouteObject } from "react-router-dom";
import Dashboard from "@modules/Dashboard/index.tsx";
import Layout from "@components/AppLayout.tsx";
import Login from "@modules/Auth/login.tsx";
import NotFound from "@components/NotFound.tsx";
import categoryRoutes from "./category.tsx";
import departmentRoutes from "./department.tsx";
import vendorRoutes from "./vendor.tsx";
import postsRoutes from "./posts.tsx";
import settingsRoutes from "./settings.tsx";
import agentsRoutes from "./agents.tsx";

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
        path: "agents",
        children: agentsRoutes,
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
        path: "posts",
        children: postsRoutes,
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
