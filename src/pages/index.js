/* eslint-disable import/export */
import React from "react";

export * from "./Admin";
export * from "./Seller";
export const NotFound = React.lazy(() => import("./NotFound"));
export * from "./Promotional";
