import { Brands } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const BrandsServices = {
  getBrandsService: async ({ queryParams }) => {
    try {
      const payload = { ...Brands.getBrands, queryParams };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateCommissionServices: async (bodyData, id) => {
    try {
      const payload = {
        ...Brands.updateCommission(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
