import { SellerNotification } from "../../../pages/Seller";
import routesMap from "../../../routeControl/Seller";

export default function route() {
  return [
    {
      path: routesMap.NOTIFICATION.path,
      private: true,
      name: " Notifications",
      key: routesMap.NOTIFICATION.path,
      belongsToHeader: false,
      icon: routesMap.NOTIFICATION.icon,
      element: <SellerNotification />,
    },
  ];
}
