import { SellerManageCms } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const SellerManageCmsService = {
  getAllHowItWorksData: async () => {
    try {
      const payload = {
        ...SellerManageCms.getHowItWork,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },
  postContactUsDetail: async (bodyData) => {
    try {
      const payload = {
        ...SellerManageCms.postContactUs,
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },

  getAllManageCmsData: async ({ queryParams }) => {
    try {
      const payload = {
        ...SellerManageCms.getManageCms,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getAllFaqsData: async ({ queryParams }) => {
    try {
      const payload = {
        ...SellerManageCms.getFaqsCms,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
