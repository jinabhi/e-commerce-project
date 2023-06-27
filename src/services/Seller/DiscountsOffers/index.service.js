import { SellerDiscountOffer } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const SellerDiscountServices = {
  getDiscountList: async ({ queryParams }) => {
    try {
      const payload = {
        ...SellerDiscountOffer.sellerDiscountList,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateStatus: async (id, bodyData) => {
    try {
      const payload = {
        ...SellerDiscountOffer.statusUpdate(id),
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getDiscountDetail: async (id) => {
    try {
      const payload = {
        ...SellerDiscountOffer.getDiscountDetail(id),
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },
  addDiscount: async (bodyData) => {
    try {
      const payload = {
        ...SellerDiscountOffer.addDiscount,
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },
  updateDiscount: async (discountId, bodyData) => {
    try {
      const payload = {
        ...SellerDiscountOffer.updateDiscount(discountId),
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },
  getDiscountedProducts: async (queryParams) => {
    try {
      const payload = {
        ...SellerDiscountOffer.getDiscountedProduct,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },
  deleteDiscount: async (id) => {
    try {
      const payload = {
        ...SellerDiscountOffer.deleteDiscount(id),
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },
  productDiscountStatusUpdate: async (id, productId, bodyData) => {
    try {
      const payload = {
        ...SellerDiscountOffer.productDiscountStatusUpdate(id, productId),
        bodyData,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
    }
  },
};
