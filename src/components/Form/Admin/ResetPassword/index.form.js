import { Formik, Form } from "formik";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import validation from "./validation";
import { CommonButton, Password as TextPassword } from "../../../index";

function ResetPasswordForm({ t, onSubmit, loading }) {
  const initialValues = {
    newPassword: "",
    confirmPassword: ""
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkRegex, setCheckRegex] = useState({
    capital: false,
    number: false,
    length: false
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
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  {t("text.adminResetPassword.newPassword")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  className="form-control form-control-lg"
                  name="newPassword"
                  placeholder={t(
                    "text.adminResetPassword.newPasswordPlaceholder"
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
                        className={`passcode-icon icon-show icon ni ni-eye${
                          showPassword ? "" : "-off"
                        } `}
                      />
                    </Link>
                  }
                />
              </div>
            </div>
            <div className="form-group passwordInfo">
              <h6>{t("text.adminResetPassword.passwordContains")}:</h6>
              <p
                className={`text-${checkRegex.capital ? "success" : "danger"}`}
              >
                <em className="icon ni ni-check" /> &nbsp;
                {t("text.changePassword.capitalLetter")}
              </p>
              <p className={`text-${checkRegex.number ? "success" : "danger"}`}>
                <em className="icon ni ni-check" /> &nbsp;
                {t("text.changePassword.specialCharacterNumber")}
              </p>
              <p className={`text-${checkRegex.length ? "success" : "danger"}`}>
                <em className="icon ni ni-check" /> &nbsp;
                {t("text.changePassword.characterLength")}
              </p>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="confirmPassword">
                  {t("text.adminResetPassword.confirmPassword")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  className="form-control form-control-lg"
                  name="confirmPassword"
                  placeholder={t("text.adminResetPassword.confirmPassword")}
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
                        className={`passcode-icon icon-show icon ni ni-eye${
                          showConfirmPassword ? "" : "-off"
                        } `}
                      />
                    </Link>
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <CommonButton
                type="submit"
                htmlType="submit"
                loading={loading}
                className="btn btn-lg btn-primary btn-block"
              >
                {t("text.adminResetPassword.submit")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withTranslation()(ResetPasswordForm);
