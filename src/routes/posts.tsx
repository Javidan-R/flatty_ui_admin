import PostPage from "@/modules/Posts";

import { RouteObject } from "react-router-dom";

const postsRoutes: RouteObject[] = [
  {
    path: "",
    index: true,
    element: <PostPage />,
  },
];

export default postsRoutes;
