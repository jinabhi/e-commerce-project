import { CustomNotification } from "../../../pages";
import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.CUSTOM_NOTIFICATION.path,
      private: true,
      name: "Custom Notifications",
      key: routesMap.CUSTOM_NOTIFICATION.path,
      belongsToSidebar: true,
      icon: routesMap.CUSTOM_NOTIFICATION.icon,
      element: <CustomNotification />,
    },
  ];
}
