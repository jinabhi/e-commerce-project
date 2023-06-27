import { SellerDashboard } from "../../../pages";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.DASHBOARD.path,
      private: true,
      name: "Dashboard",
      key: routesMap.DASHBOARD.path,
      belongsToHeader: true,
      icon: routesMap.DASHBOARD.icon,
      element: <SellerDashboard />,
    },
  ];
}
