import { ManageStaff } from "../../../../apiEndPoints";
import { logger } from "../../../../utils";
import APIrequest from "../../../axios";

export const ManageStaffServices = {
  getStaffListing: async ({ queryParams }) => {
    try {
      const payload = {
        ...ManageStaff.getAllStaffList,
        queryParams,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  addNewStaffService: async (bodyData) => {
    try {
      const payload = {
        ...ManageStaff.addNewStaff,
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  updateStaffbyId: async (bodyData, id) => {
    try {
      const payload = {
        ...ManageStaff.updateStaff(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  getStaffById: async (id) => {
    try {
      const payload = {
        ...ManageStaff.getStaffById(id),
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  changeStaffPassword: async (bodyData, id) => {
    try {
      const payload = {
        ...ManageStaff.changeStaffPassword(id),
        bodyData,
      };
      const res = await APIrequest(payload);
      return res;
    } catch (error) {
      logger(error);
      throw error;
    }
  },
  changeStaffStatus: async (bodyData, id) => {
    try {
      const payload = {
        ...ManageStaff.changeStaffStatus(id),
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
