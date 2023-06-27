import { Discount } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const DiscountServices = {
  getDiscountService: async ({ queryParams }) => {
    try {
      const payload = {
        ...Discount.getDiscount,
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
