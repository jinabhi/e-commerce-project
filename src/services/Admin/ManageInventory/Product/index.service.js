import { Product } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const ProductServices = {
  getProductService: async ({ queryParams }) => {
    try {
      const payload = { ...Product.getProduct, queryParams };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateProductStatus: async (id, bodyData) => {
    try {
      const payload = {
        ...Product.productStatusUpdate(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
  getProductDetailService: async (id) => {
    try {
      const payload = {
        ...Product.getProductDetail(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
};
