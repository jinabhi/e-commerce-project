import { ProductVariant } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const ProductVariantsServices = {
  addProductVariant: async (bodyData) => {
    try {
      const payload = {
        ...ProductVariant.addProductVariant,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getProductVariant: async ({ queryParams }) => {
    try {
      const payload = {
        ...ProductVariant.getProductVariant,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  deleteProductVariantService: async (id) => {
    try {
      const payload = {
        ...ProductVariant.deleteProductVariant(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateProductVariantService: async (bodyData, id) => {
    try {
      const payload = {
        ...ProductVariant.updateProductVariant(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getVariantDetails: async (id) => {
    try {
      const payload = {
        ...ProductVariant.getProductVariantDetail(id)
      }
      return await APIrequest(payload)
    } catch (error) {
      logger(error)
    }
  }
};
