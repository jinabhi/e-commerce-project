import { DesktopOutlined } from "@ant-design/icons";
import {
  AdminForgotPassword,
  AdminLogin,
  AdminResetPassword,
} from "../../pages";
import routesMap from "../../routeControl/staffRoutes";

export default function route() {
  return [
    {
      path: routesMap.LOGIN.path,
      name: "Staff Login",
      key: routesMap.LOGIN.path,
      private: false,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminLogin />,
    },
    {
      path: routesMap.FORGOT_PASSWORD.path,
      private: false,
      name: "Staff Forget password",
      key: routesMap.FORGOT_PASSWORD.path,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminForgotPassword />,
    },
    {
      path: routesMap.RESET_PASSWORD.path,
      private: false,
      name: " Staff Reset password",
      key: routesMap.RESET_PASSWORD.path,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminResetPassword />,
    },
  ];
}
