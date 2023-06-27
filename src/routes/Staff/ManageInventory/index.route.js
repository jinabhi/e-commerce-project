import { Outlet } from "react-router-dom";
import {
  Product,
  ProductDetails,
  ProductRequest,
  ShippingLog,
} from "../../../pages";

import routesMap from "../../../routeControl/staffRoutes";

export default function route() {
  return [
    {
      path: routesMap.MANAGE_INVENTORY.path,
      private: true,
      name: "Manage Inventory",
      key: routesMap.MANAGE_INVENTORY.path,
      belongsToSidebar: true,
      icon: routesMap.MANAGE_INVENTORY.icon,
      element: <Outlet />,
      children: [
        {
          path: routesMap.PRODUCT_REQUEST.path,
          private: true,
          name: "Product Requests",
          key: routesMap.PRODUCT_REQUEST.path,
          belongsToSidebar: true,
          icon: routesMap.PRODUCT_REQUEST.icon,
          element: <ProductRequest />,
        },
        {
          path: routesMap.PRODUCT.path,
          private: true,
          name: "Product",
          key: routesMap.PRODUCT.path,
          belongsToSidebar: true,
          icon: routesMap.PRODUCT.icon,
          element: <Product />,
        },
        {
          path: routesMap.SHIPPING_LOG.path,
          private: true,
          name: "Shipping Log",
          key: routesMap.SHIPPING_LOG.path,
          belongsToSidebar: true,
          icon: routesMap.SHIPPING_LOG.icon,
          element: <ShippingLog />,
        },
        {
          path: `${routesMap.PRODUCT_DETAILS.path}/:productId`,
          key: `${routesMap.PRODUCT_DETAILS.path}/:productId`,
          name: "Product Details",
          private: true,
          belongsToSidebar: false,
          element: <ProductDetails />,
        },

        {
          path: `${routesMap.SHIPPING_LOG.path}/:productId`,
          private: true,
          name: "Shipping Log",
          key: `${routesMap.SHIPPING_LOG.path}/:productId`,
          belongsToSidebar: false,
          icon: routesMap.SHIPPING_LOG.icon,
          element: <ShippingLog />,
        },
        {
          path: `${routesMap.PRODUCT_DETAILS.path}/:dataKey/:productId`,
          key: `${routesMap.PRODUCT_DETAILS.path}/:dataKey/:productId`,
          name: "Product Details",
          private: true,
          belongsToSidebar: false,
          element: <ProductDetails />,
        },
      ],
    },
  ];
}
