import { AdminProfile, ChangePassword } from "../../../pages";
import routesMap from "../../../routeControl/staffRoutes";

export default function route() {
  return [
    {
      path: routesMap.PROFILE.path,
      private: true,
      name: "Profile",
      key: routesMap.PROFILE.path,
      belongsToSidebar: false,
      element: <AdminProfile />,
    },
    {
      path: routesMap.CHANGE_PASSWORD.path,
      private: true,
      name: "Change Password",
      key: routesMap.CHANGE_PASSWORD.path,
      belongsToSidebar: false,
      element: <ChangePassword />,
    },
  ];
}
