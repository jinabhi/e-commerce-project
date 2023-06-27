import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Media from "../../../../apiEndPoints/Seller/SellerMedia";
import { AccountDetailsForm, ModalComponent } from "../../../../components";
import {
  selectUserData,
  updateUserDataAction,
} from "../../../../redux/AuthSlice/index.slice";
import { SellerAccountServices } from "../../../../services";
import VerifyOtp from "./verifyOtp";

import { logger, modalNotification } from "../../../../utils";

function AccountDetails({ getAccountData, showSuccessModal }) {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState("");
  const userData = useSelector(selectUserData);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const sendOtp = async (value) => {
    try {
      let bodyData = {
        phoneNumber: value,
      };
      const response = await SellerAccountServices.sendOtpForEditNumber(
        bodyData
      );
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setShowModal(true);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      let bodyData = {
        email: value.email,
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNumber: ` ${value.phoneNumber}`,
        profilePicture: value.profilePicture,
      };
      if (value.phoneNumber.toString() === userData.phoneNumber) {
        const response = await SellerAccountServices.editSellerAccountService(
          bodyData
        );
        const { success, message } = response;
        if (success) {
          setLoading(false);
          setIsEdit(false);
          showSuccessModal(message);
          dispatch(updateUserDataAction(response?.data));
          getAccountData();
        }
      } else {
        sendOtp(value.phoneNumber.toString());
        setNumber(value.phoneNumber.toString());
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
    formRef.current.resetForm({ ...userData });
    setIsEdit(false);
  };
  return (
    <>
      <AccountDetailsForm
        onSubmit={onSubmit}
        loading={loading}
        editProfile={editProfile}
        cancelProfile={cancelProfile}
        isEdit={isEdit}
        formRef={formRef}
        userData={userData}
        apiEndPoints={Media.profileImage}
        OtpVerificationForm
      />
      <ModalComponent
        show={showModal}
        onHandleCancel={() => {
          setShowModal(false);
          setLoading(false);
        }}
        title="OTP Verification"
      >
        <VerifyOtp
          setShowModal={setShowModal}
          setLoadingPage={setLoading}
          number={number}
        />
      </ModalComponent>
    </>
  );
}

export default AccountDetails;
