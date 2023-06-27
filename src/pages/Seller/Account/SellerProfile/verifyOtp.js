import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OtpVerificationForm } from "../../../../components";
import { logger, modalNotification } from "../../../../utils";
import {
  SellerRegisterServices,
  SellerAccountServices,
} from "../../../../services";
import {
  selectSellerRegisterData,
  updateUserData,
} from "../../../../redux/AuthSlice/index.slice";

function VerifyOtp({ setShowModal, setLoadingPage, number }) {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [counter, setCounter] = useState(60);
  const sellerRegisterData = useSelector(selectSellerRegisterData);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  const reSendOtp = async () => {
    let bodyData = {
      phoneNumber: sellerRegisterData.phoneNumber,
    };
    setCounter(60);
    try {
      let res = await SellerRegisterServices.reSendOtp(bodyData);
      if (res.success) {
        modalNotification({
          type: "success",
          message: res.message,
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      let otpValue = "";
      for (let key in otp) {
        if (key) {
          otpValue += otp[key];
        }
      }
      if (otpValue && otpValue.length === 4) {
        let bodyData = {
          otp: otpValue,
        };
        let res = await SellerAccountServices.otpVerifyEditNumber(bodyData);
        if (res.success) {
          setLoading(false);
          setLoadingPage(false);
          setShowModal(false);
          modalNotification({
            type: "success",
            message: res.message,
          });
          dispatch(updateUserData({ phoneNumber: number }));
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <OtpVerificationForm
        onSubmit={onSubmit}
        loading={loading}
        otp={otp}
        setOtp={setOtp}
        reSendOtp={reSendOtp}
        counter={counter}
        number={number}
      />
    </>
  );
}

export default VerifyOtp;
