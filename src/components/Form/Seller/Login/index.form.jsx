import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";
import { Link } from "react-router-dom";
import validation from "./validation";
import {
  Input as TextInput,
  Password as TextPassword,
  GradientButton,
  CustomCheckbox,
} from "../../../index";
import routesMap from "../../../../routeControl/sellerRoutes";

function LoginForm(mainProps) {
  const { loading, onSubmit, onChangeSelect, checked, authData } = mainProps;
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    emailMobileNumber: authData?.emailMobileNumber || "",
    password: authData?.password || "",
    rememberMe: authData?.rememberMe || false,
  };
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form className="d-flex h-100 flex-column justify-content-lg-between">
            <div className="">
              <div className="authHeader">
                <h1>{t("text.sellerLogin.loginHeading")}</h1>
                <p className="mb-0">{t("text.sellerLogin.loginDescription")}</p>
              </div>
              <div className="form-group">
                <label className="form-label">
                  {t("text.sellerLogin.email")}
                </label>
                <TextInput
                  id="emailMobileNumber"
                  className="form-control"
                  name="emailMobileNumber"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t("text.sellerLogin.emailPlaceholder")}
                  setFieldValue={props.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  {t("text.sellerLogin.password")}
                </label>
                <div className="form-control-wrap">
                  <TextPassword
                    className="form-control"
                    name="password"
                    placeholder={t("text.sellerLogin.passwordPlaceholder")}
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
                          className={`icon-eye${showPassword ? "" : "-off"} `}
                        />
                      </Link>
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="checkbox">
                    <label className={checked ? `checked` : `notChecked`}>
                      <span className="checkbox-icon" />
                      {t("text.sellerLogin.rememberMe")}
                      <CustomCheckbox
                        type="checkbox"
                        name="checkboxVal"
                        onChange={onChangeSelect}
                        setFieldValue={props.handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="col text-end">
                  <Link to="/brand/forgot-password" className="link font-md">
                    {t("text.sellerLogin.forgotPasswordLink")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="formAction d-flex align-items-center justify-content-between">
              <p className="mb-0">
                {t("text.sellerLogin.registerDescription")}&nbsp;
                <Link className="link" to={routesMap.REGISTER.path}>
                  {t("text.sellerLogin.register")}
                </Link>
              </p>
              <GradientButton
                extraClassName="flex-shrink-0 w190"
                loading={loading}
                htmlType="submit"
                type="submit"
              >
                {t("text.sellerLogin.submit")}
              </GradientButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
