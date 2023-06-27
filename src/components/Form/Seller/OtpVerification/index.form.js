import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import validation from "./validation";
import { GradientButton, Input as TextInput } from "../../../index";
import { selectSellerRegisterData } from "../../../../redux/AuthSlice/index.slice";

function OtpVerificationForm(mainProps) {
  const {
    loading,
    onSubmit,
    otp,
    setOtp,
    reSendOtp,
    counter,
    number = "",
  } = mainProps;
  const initialValues = {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  };
  const { t } = useTranslation();
  const sellerRegisterData = useSelector(selectSellerRegisterData);

  const onChangeInput = (event) => {
    let { name, value } = event.target;
    if (value.match(/^[0-9]+$/)) {
      setOtp((data) => {
        return {
          ...data,
          [name]: value,
        };
      });
    }
  };

  const movetoNext = (e, nextFieldID, prevFieldID, currentFieldId) => {
    if (e.target.value.length >= e.target.maxLength) {
      if (e.target.value.match(/^[0-9]+$/)) {
        document.getElementById(nextFieldID).focus();
      }
    }
    if (e.keyCode === 8) {
      let data = { ...otp };
      data[currentFieldId] = "";
      setOtp(data);
      document.getElementById(prevFieldID).focus();
    }
  };

  const onFocusInput = (currentFieldId) => {
    document.getElementById(currentFieldId).select();
  };

  const Timerformat = (time) => {
    const minutes = Math.floor(time / 60);

    const seconds = time % 60;
    let secs = seconds > 9 ? seconds : `0${seconds}`;

    return `${minutes}:${secs}`;
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      //   validationSchema={validation()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => {
        return (
          <Form className="d-flex h-100 flex-column otpSection justify-content-between">
            <div className="">
              <div className="authHeader mb-0">
                <a
                  href="<?php echo BASE_URL ?>/signup.php"
                  className="back-icon d-block d-lg-none mb-2 mb-md-3 mb-lg-0 position-static"
                >
                  {" "}
                  <em className="icon-arrow-left" />
                </a>
                <h1>{t("text.register.otpTitle")}</h1>
                <p className="mb-0">{t("text.register.otpText")}</p>
                <h6 className="font-md mt-2 mb-0 text-white">
                  {sellerRegisterData.phoneNumberCountryCode}-
                  {number !== "" ? number : sellerRegisterData.phoneNumber}
                </h6>
              </div>
              <div className="form-group userInput d-flex">
                <TextInput
                  className="form-control text-center"
                  type="text"
                  maxLength="1"
                  name="input1"
                  onKeyUp={(e) => movetoNext(e, "second", "first", "input1")}
                  onChange={onChangeInput}
                  id="first"
                  onFocus={() => onFocusInput("first")}
                  value={otp.input1}
                />
                <TextInput
                  className="form-control text-center"
                  type="text"
                  maxLength="1"
                  name="input2"
                  onKeyUp={(e) => movetoNext(e, "third", "first", "input2")}
                  onChange={onChangeInput}
                  id="second"
                  onFocus={() => onFocusInput("second")}
                  value={otp.input2}
                />
                <TextInput
                  className="form-control text-center"
                  type="text"
                  maxLength="1"
                  name="input3"
                  onKeyUp={(e) => movetoNext(e, "fourth", "second", "input3")}
                  onChange={onChangeInput}
                  id="third"
                  onFocus={() => onFocusInput("third")}
                  value={otp.input3}
                />
                <TextInput
                  className="form-control text-center"
                  type="text"
                  maxLength="1"
                  name="input4"
                  onKeyUp={(e) => movetoNext(e, "fourth", "third", "input4")}
                  onChange={onChangeInput}
                  id="fourth"
                  onFocus={() => onFocusInput("fourth")}
                  value={otp.input4}
                />
              </div>
              <p className="otp-timer mb-0 d-flex align-items-center">
                <em className="icon-clock" /> {Timerformat(counter)}
              </p>
            </div>
            <div className="formAction d-flex align-items-center justify-content-between">
              {counter === 0 ? (
                <p className="mb-0">
                  Didnt received the code?{" "}
                  <Link
                    className="link"
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      reSendOtp();
                      setOtp({
                        input1: "",
                        input2: "",
                        input3: "",
                        input4: "",
                      });
                    }}
                  >
                    Resend
                  </Link>
                </p>
              ) : (
                <p />
              )}
              <GradientButton
                extraClassName="flex-shrink-0 w190"
                loading={loading}
                htmlType="submit"
                type="submit"
              >
                Continue
              </GradientButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default OtpVerificationForm;
