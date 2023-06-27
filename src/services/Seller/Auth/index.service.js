import { SellerAuth } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const SellerAuthServices = {
  sellerResetPasswordService: async (bodyData) => {
    try {
      const payload = {
        ...SellerAuth.sellerResetPassword,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },

  changePasswordService: async (bodyData) => {
    try {
      const payload = {
        ...SellerAuth.changePassword,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  sellerLogin: async (values) => {
    try {
      const payload = {
        ...SellerAuth.accountLogin,
        bodyData: values,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  forgetPasswordService: async (bodyData) => {
    try {
      const payload = {
        ...SellerAuth.forgetPassword,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  logoutService: async () => {
    try {
      const payload = {
        ...SellerAuth.logout,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
