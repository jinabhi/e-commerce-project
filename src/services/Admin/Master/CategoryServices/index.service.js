import { Category } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const CategoryServices = {
  getCategoryService: async ({ queryParams }) => {
    try {
      const payload = {
        ...Category.getAllCategoryList,
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
