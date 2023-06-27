import { Outlet } from "react-router-dom";
import { GetEarlyAccess, GetPromotionalContactUs } from "../../../pages";
import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.PROMOTIONAL.path,
      private: true,
      name: "Promotional",
      key: routesMap.PROMOTIONAL.path,
      belongsToSidebar: true,
      icon: routesMap.PROMOTIONAL.icon,
      element: <Outlet />,
      children: [
        {
          path: routesMap.GET_EARLY_ACCESS.path,
          private: true,
          name: "Get Early Access",
          key: routesMap.GET_EARLY_ACCESS.path,
          belongsToSidebar: true,
          icon: routesMap.GET_EARLY_ACCESS.icon,
          element: <GetEarlyAccess />,
        },
        {
          path: routesMap.GET_PROMOTIONAL_CONTACTUS.path,
          private: true,
          name: "Enquiry",
          key: routesMap.GET_PROMOTIONAL_CONTACTUS.path,
          belongsToSidebar: true,
          icon: routesMap.GET_PROMOTIONAL_CONTACTUS.icon,
          element: <GetPromotionalContactUs />,
        },
      ],
    },
  ];
}
