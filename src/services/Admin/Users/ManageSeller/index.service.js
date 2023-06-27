import { ManageSeller } from "../../../../apiEndPoints/Admin/Users/ManageSeller/index";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const ManageSellerServices = {
  rejectManageSeller: async (bodyData, id) => {
    try {
      const payload = {
        ...ManageSeller.rejectSeller(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  manageSeller: async ({ queryParams }) => {
    try {
      const payload = {
        ...ManageSeller.getManageSeller,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateSellerStatus: async (id, bodyData) => {
    try {
      const payload = {
        ...ManageSeller.activeAndDeactivateSeller(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getSellerDetailService: async (id) => {
    try {
      const payload = {
        ...ManageSeller.getSellerDetails(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
};
