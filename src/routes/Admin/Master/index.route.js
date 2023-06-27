import { Outlet } from "react-router-dom";
import {
  Brands,
  CategoryList,
  ChildCategories,
  DiscountOffer,
  ProductVariants,
  SubCategories,
} from "../../../pages";

import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.MASTER.path,
      private: true,
      name: "Master",
      key: routesMap.MASTER.path,
      belongsToSidebar: true,
      icon: routesMap.MASTER.icon,
      element: <Outlet />,
      children: [
        {
          path: routesMap.BRANDS.path,
          private: true,
          name: "Brands",
          key: routesMap.BRANDS.path,
          belongsToSidebar: true,
          icon: routesMap.BRANDS.icon,
          element: <Brands />,
        },
        {
          path: routesMap.CATEGORY.path,
          private: true,
          name: "Category",
          key: routesMap.CATEGORY.path,
          belongsToSidebar: true,
          icon: routesMap.CATEGORY.icon,
          element: <CategoryList />,
        },
        {
          path: routesMap.SUB_CATEGORIES.path,
          private: true,
          name: "Sub Categories",
          key: routesMap.SUB_CATEGORIES.path,
          belongsToSidebar: true,
          icon: routesMap.SUB_CATEGORIES.icon,
          element: <SubCategories />,
        },
        {
          path: routesMap.CHILD_CATEGORIES.path,
          private: true,
          name: "Child Categories",
          key: routesMap.CHILD_CATEGORIES.path,
          belongsToSidebar: true,
          icon: routesMap.CHILD_CATEGORIES.icon,
          element: <ChildCategories />,
        },
        {
          path: routesMap.PRODUCT_VARIANTS.path,
          private: true,
          name: "Product Variants",
          key: routesMap.PRODUCT_VARIANTS.path,
          belongsToSidebar: true,
          icon: routesMap.PRODUCT_VARIANTS.icon,
          element: <ProductVariants />,
        },
        {
          path: routesMap.DISCOUNT_OFFER.path,
          private: true,
          name: "Discounts",
          key: routesMap.DISCOUNT_OFFER.path,
          belongsToSidebar: true,
          icon: routesMap.DISCOUNT_OFFER.icon,
          element: <DiscountOffer />,
        },
      ],
    },
  ];
}
