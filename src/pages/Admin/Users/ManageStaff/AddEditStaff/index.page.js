import React, { useEffect, useState } from "react";
import { Media } from "../../../../../apiEndPoints";
import { AddEditStaffForm } from "../../../../../components";
import { ManageStaffServices } from "../../../../../services";
import { logger, modalNotification } from "../../../../../utils";

function AddEditStaff({
  onHandleShowAlert,
  onHandleHide,
  staffId,
  getStaffData,
  tableReset,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState();
  const [userAddress, setAddress] = useState("");

  async function onSubmit(values) {
    try {
      let bodyData = { ...values };
      bodyData.phoneNumber = `${bodyData.phoneNumber}`;
      let res;
      if (staffId) {
        delete bodyData.password;
        res = await ManageStaffServices.updateStaffbyId(bodyData, staffId);
      } else {
        res = await ManageStaffServices.addNewStaffService(bodyData);
      }
      setLoading(true);

      const { message, success } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onHandleHide();
        tableReset();
        getStaffData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  }

  async function getStaffDataById(id) {
    try {
      const res = await ManageStaffServices.getStaffById(id);
      const { success, data } = res;
      if (success) {
        setFormData(data);
        setAddress(data.userAddressDetails[0].address);
      }
    } catch (error) {
      logger(error);
    }
  }

  useEffect(() => {
    if (staffId >= 0) {
      getStaffDataById(staffId);
    }
  }, [staffId]);

  const onAlertModal = (e) => {
    e.preventDefault();
    onHandleShowAlert();
  };

  return (
    <div>
      <AddEditStaffForm
        onHandleCancel={onAlertModal}
        loading={loading}
        apiEndPoints={Media.profileImage}
        onSubmit={onSubmit}
        formData={formData}
        staffId={staffId}
        address={userAddress}
      />
    </div>
  );
}

export default AddEditStaff;
