import { Dashboard } from "../../../apiEndPoints/Admin";
import logger from "../../../utils/logger";
import APIrequest from "../../axios";

export const DashboardServices = {
  /**
   * @returns
   * Function To handle Login action
   */
  adminDashboardData: async () => {
    try {
      const payload = {
        ...Dashboard.adminDashboard,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  adminRegisteredUserGraphData: async ({ queryParams }) => {
    try {
      const payload = {
        ...Dashboard.registeredUserGraph,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  adminVisitorBuyerGraphData: async ({ queryParams }) => {
    try {
      const payload = {
        ...Dashboard.visitorBuyerGraph,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  sellerGraphData: async ({ queryParams }) => {
    try {
      const payload = {
        ...Dashboard.sellerGraph,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  productCategoryGraphData: async ({ queryParams }) => {
    try {
      const payload = {
        ...Dashboard.productCategoryGraph,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
