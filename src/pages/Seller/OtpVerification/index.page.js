import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MetaTags, OtpVerificationForm } from "../../../components";
import { logger, modalNotification } from "../../../utils";
import { SellerRegisterServices } from "../../../services";
import { selectSellerRegisterData } from "../../../redux/AuthSlice/index.slice";
import routesControl from "../../../routeControl/sellerRoutes";

function OtpVerification() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [counter, setCounter] = useState(60);
  const sellerRegisterData = useSelector(selectSellerRegisterData);
  const navigate = useNavigate();

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
          phoneNumber: sellerRegisterData.phoneNumber,
        };
        let res = await SellerRegisterServices.otpVerification(bodyData);
        if (res.success) {
          navigate(routesControl.REGISTER.path, {
            state: { defaultStep: "two" },
          });
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <MetaTags title="OTP Verification" />
      <OtpVerificationForm
        onSubmit={onSubmit}
        loading={loading}
        otp={otp}
        setOtp={setOtp}
        reSendOtp={reSendOtp}
        counter={counter}
      />
    </>
  );
}

export default OtpVerification;
