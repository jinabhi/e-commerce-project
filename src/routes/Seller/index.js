import { SellerPrivateLayout, SellerPublicLayout } from "../../layouts";
import publicRoutes from "./public.route";
import privateRoutes from "./private.route";

export const sellerRoutes = () => {
  return [
    {
      element: <SellerPublicLayout />,
      children: [...publicRoutes()],
    },
    {
      element: <SellerPrivateLayout />,
      children: [...privateRoutes()],
    },
  ];
};
