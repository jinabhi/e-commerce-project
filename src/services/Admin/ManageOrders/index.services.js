import { Orders } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const OrdersServices = {
  getOrdersServices: async ({ queryParams }) => {
    try {
      const payload = { ...Orders.getOrders, queryParams };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  UpdateStatusServices: async (bodyData, id) => {
    try {
      const payload = {
        ...Orders.updateStatus(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getOrdersDetailsServices: async (id) => {
    try {
      const payload = {
        ...Orders.getOrdersDetailSeller(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
  getadminOrdersDetailsServices: async (id) => {
    try {
      const payload = {
        ...Orders.getOrdersDetail(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
};
