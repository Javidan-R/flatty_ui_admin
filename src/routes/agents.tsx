import User from "@/modules/Agents";
import { RouteObject } from "react-router-dom";

const userRoutes: RouteObject[] = [
  {
    path: "",
    index: true,
    element: <User />,
  },
];

export default userRoutes;
