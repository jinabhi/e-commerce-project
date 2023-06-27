import { Common } from "../../apiEndPoints";
import { logger } from "../../utils";
import APIrequest from "../axios";

export const commonServices = {
  /**
   *
   * @returns
   * Function To handle Seller Register action
   */

  countries: async () => {
    try {
      const payload = {
        ...Common.countries,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  states: async ({ queryParams }) => {
    try {
      const payload = {
        ...Common.states,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  cities: async ({ queryParams }) => {
    try {
      const payload = {
        ...Common.cities,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  categories: async () => {
    try {
      const payload = {
        ...Common.categoryPublic,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  adminAndSeller: async ({ queryParams }) => {
    try {
      const payload = {
        ...Common.getAdminAndSeller,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getNotificationList: async ({ queryParams }) => {
    try {
      const payload = {
        ...Common.getNotification,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getNotificationCount: async () => {
    try {
      const payload = {
        ...Common.getNotificationCount,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  NotificationMarkService: async () => {
    try {
      const payload = {
        ...Common.getNotificationMark,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  /**
   *ManageCmsServices
   */
  getManageCmsService: async () => {
    try {
      const payload = { ...Common.getManageCmsList };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getManageCmsModuleService: async (id) => {
    try {
      const payload = { ...Common.getManageCmsModule(id) };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateManageCmsService: async (bodyData, id) => {
    try {
      const payload = {
        ...Common.ManageCmsModuleUpdate(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  /**
   Rating Review Services
   */

  getReviewRatingService: async ({ queryParams }) => {
    try {
      const payload = { ...Common.getAllReviewRating, queryParams };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
