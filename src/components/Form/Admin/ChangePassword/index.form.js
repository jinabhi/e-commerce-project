import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import validation from "./validation";
import { Password as TextPassword, CommonButton } from "../../../index";
import "./index.scss";

function ChangePasswordForm({ onSubmit, loading, checkRegex, setCheckRegex }) {
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    location:
      "Atlantis Tower 3rd Floor Plot No 13- A scheme No 78 Part 2 Indore"
  };
  const { t } = useTranslation();

  const onPasswordChange = (e) => {
    let data = e;
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

  const onFormSubmit = (value, resetForm) => {
    if (checkRegex.capital && checkRegex.length && checkRegex.number) {
      onSubmit(value, resetForm);
    }
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e, { resetForm }) => {
        onFormSubmit(e, resetForm);
      }}
      validate={(e) => {
        onPasswordChange(e.newPassword);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label">
                  {t("text.changePassword.currentPassword")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  id="currentPassword"
                  className="form-control shadow-none"
                  name="currentPassword"
                  disabled={false}
                  variant="standard"
                  placeholder={t("text.changePassword.currentPlaceholder")}
                  setFieldValue={props.handleChange}
                  type={currentPassword ? "text" : "password"}
                  toggleIcon={
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPassword(!currentPassword);
                      }}
                      className="form-icon form-icon-right passcode-switch"
                      data-target="password"
                    >
                      <em
                        className={`passcode-icon icon-show icon ni ni-eye${
                          currentPassword ? "" : "-off"
                        } `}
                      />
                    </Link>
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label">
                  {t("text.changePassword.newPassword")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  id="newPassword"
                  className="form-control shadow-none"
                  name="newPassword"
                  disabled={false}
                  variant="standard"
                  placeholder={t("text.changePassword.newPlaceholder")}
                  setFieldValue={props.handleChange}
                  type={newPassword ? "text" : "password"}
                  toggleIcon={
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setNewPassword(!newPassword);
                      }}
                      className="form-icon form-icon-right passcode-switch"
                      data-target="password"
                    >
                      <em
                        className={`passcode-icon icon-show icon ni ni-eye${
                          newPassword ? "" : "-off"
                        } `}
                      />
                    </Link>
                  }
                />
              </div>
            </div>
            <div className="form-group passwordInfo">
              <h6>{t("text.changePassword.passwordContains")}:</h6>
              <p
                className={`text-${checkRegex.capital ? "success" : "danger"}`}
              >
                <em className="icon ni ni-check" />
                &nbsp;
                {t("text.changePassword.capitalLetter")}
              </p>
              <p className={`text-${checkRegex.number ? "success" : "danger"}`}>
                <em className="icon ni ni-check" />
                &nbsp;
                {t("text.changePassword.specialCharacterNumber")}
              </p>
              <p className={`text-${checkRegex.length ? "success" : "danger"}`}>
                <em className="icon ni ni-check" />
                &nbsp;
                {t("text.changePassword.characterLength")}
              </p>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label">
                  {t("text.changePassword.confirmPassword")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  id="confirmPassword"
                  className="form-control shadow-none"
                  name="confirmPassword"
                  disabled={false}
                  variant="standard"
                  placeholder={t("text.changePassword.confirmPlaceholder")}
                  setFieldValue={props.handleChange}
                  type={confirmPassword ? "text" : "password"}
                  toggleIcon={
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setConfirmPassword(!confirmPassword);
                      }}
                      className="form-icon form-icon-right passcode-switch"
                      data-target="password"
                    >
                      <em
                        className={`passcode-icon icon-show icon ni ni-eye${
                          confirmPassword ? "" : "-off"
                        } `}
                      />
                    </Link>
                  }
                />
              </div>
            </div>
            <div className="formAction text-end">
              <CommonButton
                extraClassName="btn btn-primary flex-shrink-0 w190 btn-gradiant saveButton"
                htmlType="submit"
                type="submit"
                loading={loading}
              >
                {t("text.common.update")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ChangePasswordForm;
