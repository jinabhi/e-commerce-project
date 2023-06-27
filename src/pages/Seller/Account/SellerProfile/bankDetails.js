import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BankDetailsForm } from "../../../../components";
import { updateUserDataAction } from "../../../../redux/AuthSlice/index.slice";
import { SellerAccountServices } from "../../../../services";

import { logger } from "../../../../utils";

function BankDetails({
  accountData,
  getAccountData,
  userData,
  showSuccessModal,
}) {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const onSubmit = async (bodyData) => {
    setLoading(true);
    try {
      const response = await SellerAccountServices.editBankDetailService(
        bodyData,
        userData.id
      );
      const { success, message } = response;
      if (success) {
        setLoading(false);
        setIsEdit(false);
        showSuccessModal(message);
        dispatch(updateUserDataAction(response?.data));
        getAccountData();
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const editProfile = () => {
    setIsEdit(true);
  };
  const cancelProfile = () => {
    formRef.current.resetForm({ ...accountData });
    setIsEdit(false);
  };
  return (
    <>
      <BankDetailsForm
        onSubmit={onSubmit}
        loading={loading}
        editProfile={editProfile}
        cancelProfile={cancelProfile}
        isEdit={isEdit}
        formRef={formRef}
        accountData={accountData}
      />
    </>
  );
}

export default BankDetails;
