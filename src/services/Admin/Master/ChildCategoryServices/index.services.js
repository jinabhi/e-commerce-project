import { ChildCategory } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const ChildCategoryServices = {
  getChildCategoryService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ChildCategory.getAllChildCategory,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addNewChildCategoryService: async (bodyData) => {
    try {
      const payload = {
        ...ChildCategory.addNewChildCategory,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateChildCategoryService: async (bodyData, id) => {
    try {
      const payload = {
        ...ChildCategory.updateChildCategory(id),
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
        ...ChildCategory.getChildCategoryById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  deleteChildCategoryService: async (id) => {
    try {
      const payload = {
        ...ChildCategory.deleteChildCategory(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
