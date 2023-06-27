import { WinstonLogs } from "../../../apiEndPoints/Admin";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const WinstonLogsServices = {
  getWinstonFilesDropDownService: async ({ queryParams }) => {
    try {
      const payload = {
        ...WinstonLogs.getWinstonFiles,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getWinstonLogsListService: async ({ queryParams }) => {
    try {
      const payload = {
        ...WinstonLogs.getWinstonLogsList,
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
