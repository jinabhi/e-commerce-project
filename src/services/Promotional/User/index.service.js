import { User } from "../../../apiEndPoints";
import logger from "../../../utils/logger";
import APIrequest from "../../axios";

export const UserServices = {
  earlyAccessService: async (bodyData) => {
    try {
      const payload = {
        ...User.earlyAccess,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  contactUsService: async (bodyData) => {
    try {
      const payload = {
        ...User.contactUs,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  faqService: async ({ queryParams }) => {
    try {
      const payload = {
        ...User.faq,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  videoService: async () => {
    try {
      const payload = {
        ...User.video,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  cmsService: async ({ queryParams }) => {
    try {
      const payload = {
        ...User.cms,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  emailService: async (bodyData) => {
    try {
      const payload = {
        ...User.email,
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
