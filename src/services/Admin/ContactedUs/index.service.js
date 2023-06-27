import { ContactedUs } from "../../../apiEndPoints/Admin";
import logger from "../../../utils/logger";
import APIrequest from "../../axios";

export const ContactedUsServices = {
  /**
   *
   * @returns
   * Function To get User queries listing
   */
  getUserQueriesService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ContactedUs.userQueries,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deleteUserQueriesService: async (id) => {
    try {
      const payload = {
        ...ContactedUs.deleteUserQueries(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
  getProductComplaintsService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ContactedUs.getProductComplaints,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getProductComplaintsDetailService: async (id) => {
    try {
      const payload = {
        ...ContactedUs.getProductComplaintsDetails(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addProductComplaintCreditService: async (bodyData) => {
    try {
      const payload = {
        ...ContactedUs.addProductComplaintCredit,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  changeComplainStatusServices: async (bodyData, id) => {
    try {
      const payload = {
        ...ContactedUs.changeComplainStatus(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getEarlyAccessService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ContactedUs.getEarlyAccess,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getPromotionalContactusService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ContactedUs.getPromotionalContactus,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
