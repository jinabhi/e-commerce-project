import { SellerChangePassword, SellerProfile } from "../../../pages";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.CHANGE_PASSWORD.path,
      private: true,
      name: "Change Password",
      key: routesMap.CHANGE_PASSWORD.path,
      belongsToHeader: false,
      element: <SellerChangePassword />,
    },
    {
      path: routesMap.SELLER_PROFILE.path,
      private: true,
      name: "Seller Profile",
      key: routesMap.SELLER_PROFILE.path,
      belongsToHeader: false,
      element: <SellerProfile />,
    },
  ];
}
