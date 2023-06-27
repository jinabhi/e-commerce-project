import { SellerAccount } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const SellerAccountServices = {
  getAccount: async () => {
    try {
      const payload = {
        ...SellerAccount.getSellerAccount,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getSellerData: async (id) => {
    try {
      const payload = {
        ...SellerAccount.getSellerDetail(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  editSellerAccountService: async (bodyData) => {
    try {
      const payload = {
        ...SellerAccount.editSellerAccount,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  editStoreDetailService: async (bodyData, id) => {
    try {
      const payload = {
        ...SellerAccount.editStoreDetails(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  editBankDetailService: async (bodyData, id) => {
    try {
      const payload = {
        ...SellerAccount.editBankDetails(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  otpVerifyEditNumber: async (bodyData) => {
    try {
      const payload = {
        ...SellerAccount.otpVerifyEditNumber,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  sendOtpForEditNumber: async (bodyData) => {
    try {
      const payload = {
        ...SellerAccount.sendOtpForNumber,
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
