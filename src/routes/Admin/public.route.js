import { DesktopOutlined } from "@ant-design/icons";
import {
  AdminForgotPassword,
  AdminLogin,
  AdminResetPassword,
} from "../../pages";
import routesMap from "../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.LOGIN.path,
      name: "Admin Login",
      key: routesMap.LOGIN.path,
      private: false,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminLogin />,
    },
    {
      path: routesMap.FORGOT_PASSWORD.path,
      private: false,
      name: "Admin Forget password",
      key: routesMap.FORGOT_PASSWORD.path,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminForgotPassword />,
    },
    {
      path: routesMap.RESET_PASSWORD.path,
      private: false,
      name: " Admin Reset password",
      key: routesMap.RESET_PASSWORD.path,
      belongsToSidebar: false,
      icon: <DesktopOutlined />,
      element: <AdminResetPassword />,
    },
  ];
}
