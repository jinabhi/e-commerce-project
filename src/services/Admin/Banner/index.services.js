import { Banner } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const BannerServices = {
  addBannerService: async ({ bodyData }) => {
    try {
      const payload = { ...Banner.addBanner, bodyData };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getBannerListService: async ({ queryParams }) => {
    try {
      const payload = { ...Banner.getBannerlist, queryParams };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deleteBannerService: async (id) => {
    try {
      const payload = { ...Banner.deleteBanner(id) };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateBannerStatusService: async (id, bodyData) => {
    try {
      const payload = { ...Banner.updateBannerStatus(id), bodyData };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
