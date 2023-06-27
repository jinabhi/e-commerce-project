import { Outlet } from "react-router-dom";
import {
  ActiveOrders,
  CompletedOrders,
  CancelOrderDetails,
  CompletedOrderDetails,
  ActiveOrdersDetails,
  CancelledOrders,
} from "../../../pages";

import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.MANAGE_ORDERS.path,
      private: true,
      name: "Manage Orders",
      key: routesMap.MANAGE_ORDERS.path,
      belongsToSidebar: true,
      icon: routesMap.MANAGE_ORDERS.icon,
      element: <Outlet />,
      children: [
        {
          path: routesMap.ACTIVE_ORDER.path,
          private: true,
          name: "Active Orders",
          key: routesMap.ACTIVE_ORDER.path,
          belongsToSidebar: true,
          icon: routesMap.ACTIVE_ORDER.icon,
          element: <ActiveOrders />,
        },
        {
          path: `${routesMap.ACTIVE_ORDER_Details.path}/:id`,
          private: true,
          key: `${routesMap.ACTIVE_ORDER_Details.path}/:id`,
          belongsToSidebar: false,
          element: <ActiveOrdersDetails />,
        },
        {
          path: routesMap.COMPLETE_ORDER.path,
          private: true,
          name: "Completed Orders",
          key: routesMap.COMPLETE_ORDER.path,
          belongsToSidebar: true,
          icon: routesMap.COMPLETE_ORDER.icon,
          element: <CompletedOrders />,
        },
        {
          path: routesMap.CANCELLED_ORDER.path,
          private: true,
          name: "Cancelled Orders",
          key: routesMap.CANCELLED_ORDER.path,
          belongsToSidebar: true,
          icon: routesMap.CANCELLED_ORDER.icon,
          element: <CancelledOrders />,
        },
        {
          path: `${routesMap.CANCELLED_ORDER_DETAILS.path}/:id`,
          private: true,
          name: "Cancel Order Details",
          key: `${routesMap.CANCELLED_ORDER_DETAILS.path}/:id`,
          belongsToSidebar: false,
          element: <CancelOrderDetails />,
        },
        {
          path: `${routesMap.COMPLETED_ORDER_DETAILS.path}/:id`,
          private: true,
          name: "Completed Order Details",
          key: `${routesMap.COMPLETED_ORDER_DETAILS.path}/:id`,
          belongsToSidebar: false,
          element: <CompletedOrderDetails />,
        },
      ],
    },
  ];
}
