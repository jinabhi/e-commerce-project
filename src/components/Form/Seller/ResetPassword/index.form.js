import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import validation from "./validation";
import { CommonButton, Password as TextPassword } from "../../../index";

function ResetPasswordForm({ onSubmit, loading }) {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkRegex, setCheckRegex] = useState({
    capital: false,
    number: false,
    length: false,
  });

  const onPasswordChange = (e) => {
    let data = e;
    // setNewPassword(e.target.value);
    let stateData = { ...checkRegex };
    let upperCasePattern = /[A-Z]/g;
    let specialCharacterPattern =
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{1,}$/;
    let lengthPattern = /^.{6,15}$/g;
    stateData.capital = upperCasePattern.test(data);
    stateData.number = specialCharacterPattern.test(data);
    stateData.length = lengthPattern.test(data);
    setCheckRegex(stateData);
  };

  const onFormSubmit = (value) => {
    if (checkRegex.capital && checkRegex.length && checkRegex.number) {
      onSubmit(value);
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
      validate={(e) => {
        onPasswordChange(e.newPassword);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form onSubmit={props.handleSubmit}>
            <div className="d-flex h-100 flex-column justify-content-between">
              <div className="">
                <div className="authHeader">
                  <Link
                    to="/"
                    className="back-icon d-block d-lg-none mb-2 mb-md-3 mb-lg-0 position-static"
                  >
                    {" "}
                    <em className="icon-arrow-left" />
                  </Link>
                  <h1>{t("text.sellerResetPassword.resetPassword")}</h1>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerResetPassword.newPassword")}
                  </label>
                  <div className="form-control-wrap">
                    <TextPassword
                      className="form-control form-control-lg"
                      name="newPassword"
                      placeholder={t(
                        "text.sellerResetPassword.newPasswordPlaceholder"
                      )}
                      setFieldValue={props.handleChange}
                      type={showPassword ? "text" : "password"}
                      toggleIcon={
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                          }}
                          className="form-icon form-icon-right passcode-switch"
                          data-target="password"
                        >
                          <em
                            className={`icon-eye${showPassword ? "" : "-off"} `}
                          />
                        </Link>
                      }
                    />
                  </div>
                </div>
                <div className="form-group passwordInfo">
                  <h6>{t("text.changePassword.passwordContains")}:</h6>
                  <p
                    className={`text-${
                      checkRegex.capital ? "success" : "danger"
                    }`}
                  >
                    <em className="icon ni ni-check" />
                    &nbsp;
                    {t("text.changePassword.capitalLetter")}
                  </p>
                  <p
                    className={`text-${
                      checkRegex.number ? "success" : "danger"
                    }`}
                  >
                    <em className="icon ni ni-check" />
                    &nbsp;
                    {t("text.changePassword.specialCharacterNumber")}
                  </p>
                  <p
                    className={`text-${
                      checkRegex.length ? "success" : "danger"
                    }`}
                  >
                    <em className="icon ni ni-check" />
                    &nbsp;
                    {t("text.changePassword.characterLength")}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerResetPassword.confirmNewPassword")}
                  </label>
                  <div className="form-control-wrap">
                    <TextPassword
                      className="form-control form-control-lg"
                      name="confirmPassword"
                      placeholder={t(
                        "text.sellerResetPassword.confirmNewPassword"
                      )}
                      setFieldValue={props.handleChange}
                      type={showConfirmPassword ? "text" : "password"}
                      toggleIcon={
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                          className="form-icon form-icon-right passcode-switch"
                          data-target="password"
                        >
                          <em
                            className={`icon-eye${
                              showConfirmPassword ? "" : "-off"
                            } `}
                          />
                        </Link>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="formAction d-flex align-items-center justify-content-end">
                <CommonButton
                  type="submit"
                  htmlType="submit"
                  loading={loading}
                  className="btn btn-lg btn-primary btn-block"
                >
                  {t("text.sellerResetPassword.submit")}
                </CommonButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ResetPasswordForm;
