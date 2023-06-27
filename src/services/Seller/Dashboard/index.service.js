import { SellerDashboard } from "../../../apiEndPoints/Seller";
import logger from "../../../utils/logger";
import APIrequest from "../../axios";

export const SellerDashboardServices = {
  sellerDashboardData: async () => {
    try {
      const payload = {
        ...SellerDashboard.sellerDashboardData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
