import React from "react";
import { Redirect } from "react-router-dom";

export const menu = [
  {
    path: "/",
    exact: true,
    type: "single",
    lazyComponent: React.lazy(() => import('../pages/film'))
    // lazyComponent: () => <Redirect to={"/film"}/>
  },
  {
    path: "/film",
    initial: "film",
    type: "nested",
    exact: false,
    nested: [
      {
        path: "/film",
        exact: true,
        type: "single",
        lazyComponent: React.lazy(() => import('../pages/film'))
      },
      {
        path: "/film/create",
        exact: true,
        type: "single",
        lazyComponent: React.lazy(() => import('../pages/film'))
      },
      {
        path: "/film/update/:id",
        exact: true,
        type: "single",
        lazyComponent: React.lazy(() => import('../pages/film'))
      }
    ]
  }
]