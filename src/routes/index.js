/* eslint-disable no-unused-vars */
import { useTranslation } from "react-i18next";
import { AdminLayout, PromotionalPublicLayout, SellerLayout } from "../layouts";
import { NotFound } from "../pages";
import { adminRoutes } from "./Admin";
import { sellerRoutes } from "./Seller";
import { staffRoutes } from "./Staff";
import publicRoutes from "./Promotional/public.route";
import { promotionalRoutes } from "./Promotional";

export const routes = () => {
  const { t } = useTranslation();
  return [
    {
      element: <PromotionalPublicLayout />,
      children: [...publicRoutes(t)],
    },
    {
      element: <AdminLayout />,
      children: [...adminRoutes(), ...staffRoutes()],
    },
    {
      element: <SellerLayout />,
      children: [...sellerRoutes()],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
};

export const routesList = () => {
  let adminRouteArr = [
    ...adminRoutes()[0].children,
    ...adminRoutes()[1].children,
    ...staffRoutes()[0].children,
    ...staffRoutes()[1].children,
    ...sellerRoutes()[0].children,
    ...sellerRoutes()[1].children,
    ...promotionalRoutes()[0].children,
    ...promotionalRoutes()[1].children,
  ];
  return [...adminRouteArr];
};

export const moduleRoutesList = () => {
  let adminRouteArr = {
    admin: [...adminRoutes()[0].children, ...adminRoutes()[1].children],
    staff: [...staffRoutes()[0].children, ...staffRoutes()[1].children],
    seller: [...sellerRoutes()[0].children, ...sellerRoutes()[1].children],
    promotional: [
      ...promotionalRoutes()[0].children,
      ...promotionalRoutes()[1].children,
    ],
  };
  return adminRouteArr;
};

export const getCompletePathList = () => {
  return routesList().reduce((prev, curr) => {
    prev.push(curr);
    if (curr.children) {
      prev.push(...curr.children);
    }
    return prev;
  }, []);
};
