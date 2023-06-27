import { DesktopOutlined } from "@ant-design/icons";
import {
  SellerForgotPassword,
  SellerLogin,
  SellerRegister,
  OtpVerification,
  SellerResetPassword,
  SellerChangePassword,
} from "../../pages";
import routesMap from "../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.LOGIN.path,
      name: "Login",
      key: routesMap.LOGIN.path,
      private: false,
      belongsToHeader: false,
      icon: <DesktopOutlined />,
      element: <SellerLogin />,
    },
    {
      path: routesMap.FORGOT_PASSWORD.path,
      private: false,
      name: "Forget password",
      key: routesMap.FORGOT_PASSWORD.path,
      belongsToHeader: false,
      icon: <DesktopOutlined />,
      element: <SellerForgotPassword />,
    },
    {
      path: routesMap.RESET_PASSWORD.path,
      private: false,
      name: "Reset password",
      key: routesMap.RESET_PASSWORD.path,
      belongsToHeader: false,
      icon: <DesktopOutlined />,
      element: <SellerResetPassword />,
    },
    {
      path: routesMap.REGISTER.path,
      private: false,
      name: "Seller Registration",
      key: routesMap.REGISTER.path,
      belongsToHeader: false,
      icon: <DesktopOutlined />,
      element: <SellerRegister />,
    },
    {
      path: routesMap.OTP_VERIFICATION.path,
      private: false,
      name: "OTP verification",
      key: routesMap.OTP_VERIFICATION.path,
      belongsToHeader: false,
      icon: <DesktopOutlined />,
      element: <OtpVerification />,
    },
    {
      path: routesMap.CHANGE_PASSWORD.path,
      private: true,
      name: "Change Password",
      key: routesMap.CHANGE_PASSWORD.path,
      belongsToHeader: false,
      element: <SellerChangePassword />,
    },
  ];
}
