import React from "react";
import { Redirect } from "react-router-dom";

export const menu = [
  {
    path: "/",
    exact: true,
    type: "single",
    lazyComponent: () => <Redirect to={"/blogs"}/>
  },
  {
    path: "/blogs",
    initial: "blogs",
    type: "nested",
    exact: false,
    nested: [
      {
        path: "/blogs",
        exact: true,
        type: "single",
        lazyComponent: React.lazy(() => import('../pages/blog'))
      },
      {
        path: "/blogs/create",
        exact: true,
        type: "single",
        lazyComponent: React.lazy(() => import('../pages/blog'))
      },
      {
        path: "/blogs/update/:id",
        exact: true,
        type: "single",
        lazyComponent: React.lazy(() => import('../pages/blog'))
      }
    ]
  }
]