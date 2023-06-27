import { BannerListing } from "../../../pages";
import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.BANNER.path,
      private: true,
      name: "Banner",
      key: routesMap.BANNER.path,
      belongsToSidebar: true,
      icon: routesMap.BANNER.icon,
      element: <BannerListing />,
    },
  ];
}
