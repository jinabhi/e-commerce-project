import { CustomNotification } from "../../../apiEndPoints/Admin";
import logger from "../../../utils/logger";
import APIrequest from "../../axios";

export const CustomNotificationServices = {
  /**
   *
   * @returns
   * Function To handle Login action
   */
  getCustomNotificationService: async ({ queryParams }) => {
    try {
      const payload = {
        ...CustomNotification.getCustomNotification,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addCustomNotificationService: async (bodyData) => {
    try {
      const payload = {
        ...CustomNotification.addCustomNotification,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deleteCustomNotificationService: async (id) => {
    try {
      const payload = {
        ...CustomNotification.deleteCustomNotification(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
