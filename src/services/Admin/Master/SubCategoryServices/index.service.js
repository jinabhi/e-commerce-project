import { SubCategory } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const SubCategoryServices = {
  getSubCategoryService: async ({ queryParams }) => {
    try {
      const payload = {
        ...SubCategory.getAllSubCategoryList,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  addNewSubCategoryService: async (bodyData) => {
    try {
      const payload = {
        ...SubCategory.addNewSubCategory,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  updateSubCategoryService: async (bodyData, id) => {
    try {
      const payload = {
        ...SubCategory.updateSubCategory(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getChildCategoryByIdService: async (id) => {
    try {
      const payload = {
        ...SubCategory.getSubCategoryById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
