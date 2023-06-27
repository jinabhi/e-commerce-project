import { MorInventory } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const MorInventoryServices = {
  getAllInventoryService: async ({ queryParams }) => {
    try {
      const payload = {
        ...MorInventory.getAllInventory,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  addToMorService: async (bodyData) => {
    try {
      const payload = {
        ...MorInventory.addToMor,
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getShippingLogService: async ({ queryParams }) => {
    try {
      const payload = {
        ...MorInventory.getShippingLogs,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
