import { PromotionalGetEarlyAccess } from "../../pages";
import routesMap from "../../routeControl/promotionalRoutes";

export default function route(t) {
  return [
    {
      path: routesMap.GET_EARLY_ACCESS.path,
      name: t("text.common.accessibility"),
      key: routesMap.GET_EARLY_ACCESS.path,
      private: false,
      belongsToFooter: false,
      element: <PromotionalGetEarlyAccess />,
    },
  ];
}
