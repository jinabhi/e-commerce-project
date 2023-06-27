import { MyStore } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const MyStoreServices = {
  getMyStoreService: async ({ queryParams }) => {
    try {
      const payload = {
        ...MyStore.getSellerStore,
        queryParams,
      };
      return await APIrequest(payload);
    } catch (error) {
      logger(error);
      throw error;
    }
  },
};
