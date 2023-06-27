import { GeneralSetting } from "../../../apiEndPoints/Admin";
import logger from "../../../utils/logger";
import APIrequest from "../../axios";

export const GeneralSettingServices = {
  getGeneralSettingService: async () => {
    try {
      const payload = {
        ...GeneralSetting.getGeneralSetting,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  updateGeneralSettingService: async (values) => {
    try {
      const payload = {
        ...GeneralSetting.updateGeneralSetting,
        bodyData: values,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
