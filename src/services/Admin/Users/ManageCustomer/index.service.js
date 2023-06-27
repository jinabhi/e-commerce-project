import { ManageCustomer } from "../../../../apiEndPoints/Admin";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const ManageCustomerServices = {
  manageCustomer: async ({ queryParams }) => {
    try {
      const payload = {
        ...ManageCustomer.getAllCustomerList,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  customerStatusUpdate: async (id, bodyData) => {
    try {
      const payload = {
        ...ManageCustomer.customerStatusUpdate(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
  customerDetailsServices: async (id) => {
    try {
      const payload = {
        ...ManageCustomer.getCustomerDetails(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
    }
  },
};
