/* eslint-disable no-useless-catch */
import Auth from "../../../apiEndPoints/Admin/Auth";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const AdminAuthServices = {
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
  editProfileService: async (bodyData) => {
    try {
      const payload = {
        ...Auth.editProfile,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  changePasswordService: async (bodyData) => {
    try {
      const payload = {
        ...Auth.changePassword,
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
        ...Auth.logout,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
