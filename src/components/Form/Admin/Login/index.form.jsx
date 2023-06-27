import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";
import { Link } from "react-router-dom";
import validation from "./validation";
import {
  Input as TextInput,
  Password as TextPassword,
  CommonButton,
  CustomCheckbox,
} from "../../../index";
import moduleRoutesMap from "../../../../routeControl";

function LoginForm(mainProps) {
  const { loading, onSubmit, user, authData } = mainProps;
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: authData?.email || "",
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
          <Form>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="email">
                  {t("text.adminLogin.email")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextInput
                  id="email"
                  className="form-control form-control-lg"
                  name="email"
                  disabled={false}
                  variant="standard"
                  type="email"
                  placeholder={t("text.adminLogin.emailPlaceholder")}
                  setFieldValue={props.handleChange}
                  icon={
                    <div className="form-icon form-icon-left">
                      <em className="icon ni ni-user" />
                    </div>
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="email">
                  {t("text.adminLogin.password")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  className="form-control form-control-lg"
                  name="password"
                  placeholder={t("text.adminLogin.passwordPlaceholder")}
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
                  icon={
                    <div className="form-icon form-icon-left">
                      <em className="icon ni ni-lock" />
                    </div>
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <div className="d-flex justify-content-between">
                <div className="custom-control custom-control-sm custom-checkbox">
                  <CustomCheckbox
                    className="custom-control-input"
                    id="checkbox"
                    name="rememberMe"
                    checked={props.values?.rememberMe}
                  >
                    <label className="custom-control-label" htmlFor="checkbox">
                      {t("text.adminLogin.rememberMe")}
                    </label>
                  </CustomCheckbox>
                </div>
                <Link
                  className="link link-primary link-sm"
                  to={moduleRoutesMap[user].FORGOT_PASSWORD.path}
                >
                  {t("text.adminLogin.forgotPasswordLink")}
                </Link>
              </div>
            </div>
            <div className="form-group">
              <CommonButton
                extraClassName="btn btn-lg btn-primary btn-block"
                loading={loading}
                htmlType="submit"
                type="submit"
              >
                {t("text.adminLogin.submit")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
