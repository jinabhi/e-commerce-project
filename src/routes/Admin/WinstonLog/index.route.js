import { WinstonLog } from "../../../pages";

import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.WINSTON_LOGS.path,
      private: true,
      name: "WinstonLog",
      key: routesMap.WINSTON_LOGS.path,
      belongsToSidebar: false,
      element: <WinstonLog />,
    },
  ];
}
