import { AdminDashboard, Notification } from "../../../pages";
import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.DASHBOARD.path,
      private: true,
      name: "Dashboard",
      key: routesMap.DASHBOARD.path,
      belongsToSidebar: true,
      icon: routesMap.DASHBOARD.icon,
      element: <AdminDashboard />,
    },
    {
      path: routesMap.NOTIFICATION.path,
      private: true,
      name: "Dashboard",
      key: routesMap.NOTIFICATION.path,
      belongsToSidebar: false,
      icon: routesMap.NOTIFICATION.icon,
      element: <Notification />,
    },
  ];
}
