import { MorInventory, ViewShippingLog } from "../../../pages";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.MOR_INVENTORY.path,
      private: true,
      name: "Mor Inventory",
      key: routesMap.MOR_INVENTORY.path,
      belongsToHeader: true,
      element: <MorInventory />,
    },
    {
      path: `${routesMap.VIEW_SHIPPING_LOG.path}/:id`,
      private: true,
      name: "View Shipping Log",
      key: `${routesMap.VIEW_SHIPPING_LOG.path}/:id`,
      belongsToHeader: false,
      element: <ViewShippingLog />,
    },
  ];
}
