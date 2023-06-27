import { SellerProduct } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const SellerProductServices = {
  /**
   * @returns
   * Function To handle Add Product
   */

  addProduct: async (bodyData) => {
    try {
      const payload = {
        ...SellerProduct.addProduct,
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  updateProduct: async (id, bodyData) => {
    try {
      const payload = {
        ...SellerProduct.updateProduct(id),
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getAllProduct: async ({ queryParams }) => {
    try {
      const payload = {
        ...SellerProduct.getAllProduct,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getProductDetail: async (id) => {
    try {
      const payload = {
        ...SellerProduct.getProductDetail(id),
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const payload = {
        ...SellerProduct.deleteProduct(id),
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  bulkUploadProduct: async (bodyData) => {
    try {
      const payload = {
        ...SellerProduct.bulkUploadProduct,
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },

  getSampleFileUrl: async () => {
    try {
      const payload = {
        ...SellerProduct.bulkUploadSampleFile,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },

  updateStatus: async (id, bodyData) => {
    try {
      const payload = {
        ...SellerProduct.statusUpdate(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
