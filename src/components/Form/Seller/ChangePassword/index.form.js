import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import validation from "./validation";
import { Password as TextPassword, CommonButton } from "../../../index";
import routesMap from "../../../../routeControl/sellerRoutes";

function ChangePasswordForm({ onSubmit, loading }) {
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    location: "Indore",
  };
  const { t } = useTranslation();

  const onFormSubmit = (value) => {
    onSubmit(value);
  };

  const onCancel = () => {
    navigate(routesMap.DASHBOARD.path);
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e) => {
        onFormSubmit(e);
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form className="d-flex h-100 flex-column justify-content-between">
            <div className="">
              <div className="authHeader">
                <Link
                  to="/"
                  className="back-icon d-block d-lg-none mb-2 mb-md-3 mb-lg-0 position-static"
                >
                  {" "}
                  <em className="icon-arrow-left" />
                </Link>
                <h1> {t("text.sellerChangePassword.title")}</h1>
                <p className="mb-0">
                  {t("text.sellerChangePassword.setNewPasswordMsg")}
                  <br className="d-none d-lg-block" />
                  {t("text.sellerChangePassword.loginAccessMsg")}
                </p>
              </div>
              <div className="form-group">
                <label className="form-label">
                  {t("text.sellerChangePassword.currentPassword")}
                </label>
                <div className="form-control-wrap">
                  <div className="form-control-wrap">
                    <TextPassword
                      id="currentPassword"
                      className="form-control shadow-none"
                      name="currentPassword"
                      disabled={false}
                      variant="standard"
                      placeholder={t(
                        "text.sellerChangePassword.currentPlaceholder"
                      )}
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
                            className={`icon-eye${
                              currentPassword ? "" : "-off"
                            } `}
                          />
                        </Link>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  {t("text.sellerChangePassword.newPassword")}
                </label>
                <div className="form-control-wrap">
                  <TextPassword
                    id="newPassword"
                    className="form-control shadow-none"
                    name="newPassword"
                    disabled={false}
                    variant="standard"
                    placeholder={t("text.sellerChangePassword.newPlaceholder")}
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
                          className={`icon-eye${newPassword ? "" : "-off"} `}
                        />
                      </Link>
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t("text.sellerChangePassword.confirmPassword")}
                </label>
                <div className="form-control-wrap">
                  <TextPassword
                    id="confirmPassword"
                    className="form-control shadow-none"
                    name="confirmPassword"
                    disabled={false}
                    variant="standard"
                    placeholder={t(
                      "text.sellerChangePassword.confirmPlaceholder"
                    )}
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
                          className={`icon-eye${
                            confirmPassword ? "" : "-off"
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
                extraClassName="btn btn-primary-outline flex-shrink-0 w190 me-3"
                onClick={onCancel}
                htmlType="submit"
                type="submit"
                loading={loading}
              >
                {t("text.sellerChangePassword.cancel")}
              </CommonButton>

              <CommonButton
                extraClassName="btn btn-primary flex-shrink-0 w190 btn-gradiant saveButton"
                htmlType="submit"
                type="submit"
                loading={loading}
              >
                {t("text.sellerChangePassword.update")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ChangePasswordForm;
