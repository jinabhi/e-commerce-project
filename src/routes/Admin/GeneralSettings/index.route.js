import { GeneralSettings } from "../../../pages";
import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.GENERAL_SETTINGS.path,
      private: true,
      name: "General Settings",
      key: routesMap.GENERAL_SETTINGS.path,
      belongsToSidebar: true,
      icon: routesMap.GENERAL_SETTINGS.icon,
      element: <GeneralSettings />,
    },
  ];
}
