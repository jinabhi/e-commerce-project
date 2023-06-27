import { ProductRequest } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const ProductRequestServices = {
  getProductRequestService: async ({ queryParams }) => {
    try {
      const payload = {
        ...ProductRequest.getProduct,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  rejectRequestServices: async (bodyData, id) => {
    try {
      const payload = {
        ...ProductRequest.rejectProductRequest(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  approveRequestService: async (id) => {
    try {
      const payload = {
        ...ProductRequest.approveProductRequest(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
