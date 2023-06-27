import React from "react";

export { default as AppLayout } from "./Auth/index.layout";
// export {default as MainLayout} from "./Main/index.layout";
// export {default as PublicLayout} from "./Public/index.layout";
export { default as RouteLayout } from "./Route/index.layout";

// export const AppLayout = Lazy(()=>import("./Auth/index.layout"));
export const MainLayout = React.lazy(() => import("./Main/index.layout"));
export const PublicLayout = React.lazy(() => import("./Public/index.layout"));
export const AdminLayout = React.lazy(() => import("./Admin/index.layout"));
export const AdminPublicLayout = React.lazy(() =>
  import("./Admin/public.layout")
);
export const AdminPrivateLayout = React.lazy(() =>
  import("./Admin/private.layout")
);
export const SellerLayout = React.lazy(() => import("./Seller/index.layout"));
export const SellerPublicLayout = React.lazy(() =>
  import("./Seller/public.layout")
);
export const SellerPrivateLayout = React.lazy(() =>
  import("./Seller/private.layout")
);
export const PromotionalPublicLayout = React.lazy(() =>
  import("./Promotional/public.layout")
);
export const SingleLayout = React.lazy(() => import("./Single/index.layout"));
