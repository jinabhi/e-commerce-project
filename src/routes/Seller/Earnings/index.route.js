import { Earnings } from "../../../pages";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.EARNINGS.path,
      private: true,
      name: "Earnings",
      key: routesMap.EARNINGS.path,
      belongsToHeader: true,
      element: <Earnings />,
    },
  ];
}
