import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Password as TextPassword,
  CommonButton,
  Input as TextInput,
  CustomCheckbox,
} from "../../../index";
import routeControl from "../../../../routeControl/sellerRoutes";
import { validationStepOne } from "./validation";

export function PersonalDetails({ onSubmit, loading, onChangeTAndC }) {
  let initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    phoneNumberCountryCode: "+1",
    email: "",
    password: "",
    confirmPassword: "",
    // checkboxVal: false,
  };
  const { t } = useTranslation();
  const [checkRegex, setCheckRegex] = useState({
    capital: false,
    number: false,
    length: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  function onKeyChange(e) {
    if (
      e.keyCode === 190 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 110 ||
      e.keyCode === 69
    ) {
      e.preventDefault();
    }
  }
  return (
    <fieldset className="h-100">
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validationStepOne()}
        onSubmit={(e) => {
          onFormSubmit(e);
        }}
        validate={(e) => {
          onPasswordChange(e.password);
        }}
        enableReinitialize
      >
        {(props) => {
          return (
            <Form>
              <div className="d-flex h-100 flex-column justify-content-between">
                <div className="formBlk">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          {t("text.register.firstName")}
                        </label>
                        <TextInput
                          className="form-control"
                          type="text"
                          placeholder={t("text.register.firstNamePlaceholder")}
                          name="firstName"
                          variant="standard"
                          setFieldValue={props.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">
                          {t("text.register.lastName")}
                        </label>
                        <TextInput
                          className="form-control"
                          type="text"
                          placeholder={t("text.register.lastNamePlaceholder")}
                          name="lastName"
                          variant="standard"
                          setFieldValue={props.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.register.mobileNumber")}
                      </label>
                      <div className="row">
                        <div className="col-lg-2 col-md-3 col-4 pr-1">
                          <div className="form-control-wrap">
                            <TextInput
                              className="form-control"
                              type="text"
                              name="phoneNumberCountryCode"
                              readOnly
                              variant="standard"
                              placeholder="Country Code"
                              setFieldValue={props.handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-9 col-8 pl-1">
                          <div className="form-control-wrap">
                            <TextInput
                              className="form-control"
                              type="number"
                              placeholder={t(
                                "text.register.mobileNumberPlaceholder"
                              )}
                              name="phoneNumber"
                              variant="standard"
                              onKeyDown={onKeyChange}
                              setFieldValue={props.handleChange}
                              maxLength={12}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {t("text.register.email")}
                    </label>
                    <TextInput
                      className="form-control"
                      type="email"
                      placeholder={t("text.register.emailPlaceholder")}
                      name="email"
                      variant="standard"
                      setFieldValue={props.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.register.password")}
                    </label>
                    <div className="form-control-wrap">
                      <TextPassword
                        id="password"
                        className="form-control shadow-none"
                        name="password"
                        variant="standard"
                        placeholder={t("text.register.passwordPlaceholder")}
                        setFieldValue={props.handleChange}
                        type={showPassword ? "text" : "password"}
                        toggleIcon={
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowPassword(!showPassword);
                            }}
                            className="form-icon form-icon-right"
                            data-target="password"
                          >
                            <em
                              className={`icon-eye${
                                showPassword ? "" : "-off"
                              } `}
                            />
                          </Link>
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group passwordInfo">
                    <h6 className="text-white">
                      {t("text.changePassword.passwordContains")}
                    </h6>
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
                      {t("text.register.confirmPassword")}
                    </label>
                    <div className="form-control-wrap">
                      <TextPassword
                        id="confirmPassword"
                        className="form-control shadow-none"
                        name="confirmPassword"
                        variant="standard"
                        placeholder={t(
                          "text.register.confirmPasswordPlaceholder"
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
                            className="form-icon form-icon-right"
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
                  <div className="form-group">
                    <div className="checkbox">
                      <label className={!loading ? `checked` : `notChecked`}>
                        <span className="checkbox-icon" />
                        By continuing you choose to agree to our{" "}
                        <Link
                          to={routeControl.TERMS_CONDITIONS.path}
                          className="link font-md"
                          target="_blank"
                        >
                          Terms & Condition
                        </Link>{" "}
                        and{" "}
                        <Link
                          to={routeControl.PRIVACY_POLICY.path}
                          className="link font-md"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                        <CustomCheckbox
                          type="checkbox"
                          name="checkboxVal"
                          onChange={onChangeTAndC}
                          setFieldValue={props.handleChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="formAction d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    {t("text.register.alreadyHaveAnAccount")}{" "}
                    <Link className="link" to={routeControl.LOGIN.path}>
                      {t("text.register.logIn")}
                    </Link>
                  </p>
                  <CommonButton
                    extraClassName="btn btn-primary flex-shrink-0 w190 btn-gradiant"
                    htmlType="submit"
                    type="submit"
                    loading={loading}
                  >
                    {t("text.register.continue")}
                  </CommonButton>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </fieldset>
  );
}
