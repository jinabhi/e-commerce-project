import { Register } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const SellerRegisterServices = {
  /**
   *
   * @returns
   * Function To handle Seller Register action
   */

  personalDetails: async (bodyData) => {
    try {
      const payload = {
        ...Register.personalDetail,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  storeDetails: async (bodyData) => {
    try {
      const payload = {
        ...Register.storeDetail,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  selectCategories: async (bodyData) => {
    try {
      const payload = {
        ...Register.selectCategory,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  bankDetails: async (bodyData) => {
    try {
      const payload = {
        ...Register.bankDetail,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  otpVerification: async (bodyData) => {
    try {
      const payload = {
        ...Register.otpVerification,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  reSendOtp: async (bodyData) => {
    try {
      const payload = {
        ...Register.reSendOtp,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getBrandDetails: async (id) => {
    try {
      const payload = {
        ...Register.getBrandDetails(id),
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getSellerDetails: async (id) => {
    try {
      const payload = {
        ...Register.getSellerDetails(id),
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
