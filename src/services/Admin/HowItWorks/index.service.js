import { HowItWorks } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const HowItWorksServices = {
  getHowItWorksService: async ({ queryParams }) => {
    try {
      const payload = { ...HowItWorks.getHowItWorksList, queryParams };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  addHowItWorksService: async ({ bodyData }) => {
    try {
      const payload = { ...HowItWorks.addHowItWorks, bodyData };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  deleteHowItWorksService: async (id) => {
    try {
      const payload = {
        ...HowItWorks.deleteHowItWorks(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  updateHowItWorksService: async (bodyData, id) => {
    try {
      const payload = {
        ...HowItWorks.updateHowItWorks(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getSingleHowItWorksService: async (id) => {
    try {
      const payload = {
        ...HowItWorks.getSingleHowItWorks(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
