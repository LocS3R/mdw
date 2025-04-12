// import React from "react";
import { RouteObject } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import { AlbumPage, HomePage } from "./LoaderList";
// import { RouteObject } from "react-router-dom";
// import BaseLayout from "../layouts/BaseLayout";

// import BaseLayout from "../layouts/BaseLayout";

// import Home from "../content/home";

const router: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: (
          // <ProtectedRoute>
          <HomePage />
          // </ProtectedRoute>
          // <Navigate to={"home"} />
        ),
      },
      {
        path: "memories",
        element: (
          // <ProtectedRoute>
          <AlbumPage />
          // </ProtectedRoute>
          // <Navigate to={"home"} />
        ),
      },
    ],
  },
];

export default router;
