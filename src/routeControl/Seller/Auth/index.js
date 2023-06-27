import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  LOGIN: {
    path: baseRoutes.sellerBaseRoutes,
  },
  FORGOT_PASSWORD: {
    path: `${baseRoutes.sellerBaseRoutes}/forgot-password`,
  },
  CHANGE_PASSWORD: {
    path: `${baseRoutes.sellerBaseRoutes}/change-password`,
  },
  RESET_PASSWORD: {
    path: `${baseRoutes.sellerBaseRoutes}/reset-password/:token`,
  },
  REGISTER: {
    path: `${baseRoutes.sellerBaseRoutes}/register`,
  },
  OTP_VERIFICATION: {
    path: `${baseRoutes.sellerBaseRoutes}/otp-verification`,
  },
  SELLER_PROFILE: {
    path: `${baseRoutes.sellerBaseRoutes}/profile`,
  },
};

export default accessRoute;
