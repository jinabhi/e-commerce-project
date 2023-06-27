import { ShippingLog } from "../../../../apiEndPoints";
import logger from "../../../../utils/logger";
import APIrequest from "../../../axios";

export const ShippingLogServices = {
  /**
   *
   * @returns
   * Function To handle Login action
   */
  getShippingLogListService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ShippingLog.getShippingLog,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateShippingLogStatusService: async (id, bodyData) => {
    try {
      const payload = {
        ...ShippingLog.updateShippingLogStatus(id),
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
