import { Orders, OrderDetail } from "../../../pages";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.ORDERS.path,
      private: true,
      name: "Orders",
      key: routesMap.ORDERS.path,
      belongsToHeader: true,
      element: <Orders />,
    },
    {
      path: `${routesMap.ORDER_DETAILS.path}/:id`,
      private: true,
      name: "Orders Details",
      key: `${routesMap.ORDER_DETAILS.path}/:id`,
      belongsToHeader: false,
      element: <OrderDetail />,
    },
  ];
}
