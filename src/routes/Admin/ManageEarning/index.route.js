import { ManageEarning, ManageEarningOrdersDetails } from "../../../pages";
import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.MANAGE_EARNING.path,
      private: true,
      name: "Manage Earning",
      key: routesMap.MANAGE_EARNING.path,
      belongsToSidebar: true,
      icon: routesMap.MANAGE_EARNING.icon,
      element: <ManageEarning />,
    },

    {
      path: `${routesMap.MANAGE_EARNING_ORDER_DETAILS.path}/:orderId`,
      private: true,
      name: "Manage Earning Order Details",
      key: `${routesMap.MANAGE_EARNING_ORDER_DETAILS.path}/:orderId`,
      belongsToSidebar: false,
      element: <ManageEarningOrdersDetails />,
    },
  ];
}
