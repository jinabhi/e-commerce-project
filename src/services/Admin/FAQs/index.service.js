import { FAQs } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const FAQsServices = {
  getFAQsService: async ({ queryParams }) => {
    try {
      const payload = { ...FAQs.getFAQsList, queryParams };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  addFAQsService: async ({ bodyData }) => {
    try {
      const payload = { ...FAQs.addNewFAQ, bodyData };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  deleteFAQsService: async (id) => {
    try {
      const payload = {
        ...FAQs.deleteFAQs(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  updateFAQsService: async (bodyData, id) => {
    try {
      const payload = {
        ...FAQs.updateFAQ(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getSingleFAQsService: async (id) => {
    try {
      const payload = {
        ...FAQs.getSingleFAQs(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
