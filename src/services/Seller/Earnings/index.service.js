import { Earnings } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const EarningsServices = {
  getAllEarningServices: async ({ queryParams }) => {
    try {
      const payload = {
        ...Earnings.getAllEarnings,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getEarningDetailsById: async (id) => {
    try {
      const payload = {
        ...Earnings.getEarningDetailsData(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  UpdateStatusServices: async (bodyData, id) => {
    try {
      const payload = {
        ...Earnings.updateStatus(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getEarningGraphServices: async ({ queryParams }) => {
    try {
      const payload = {
        ...Earnings.getEarningGraphData,
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
