import Auth from "../../apiEndPoints/Auth";
import logger from "../../utils/logger";
import APIrequest from "../axios";

export const AuthServices = {
  /**
   *
   * @returns
   * Function To handle Login action
   */
  userLogin: async (values) => {
    try {
      const payload = {
        ...Auth.accountLogin,
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
        ...Auth.forgetPassword,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  resetPassword: async (bodyData) => {
    try {
      const payload = {
        ...Auth.accountResetPassword,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
