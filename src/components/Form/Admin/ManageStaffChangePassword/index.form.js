import { Button } from "antd";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import validation from "./validation";
import {
  // Input as TextInput,
  Password as TextPassword,
  CommonButton,
} from "../../../index";

function ManageStaffPasswordForm({ onSubmit, loading, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label">
                  {t("text.staff.newPassword")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  id="password"
                  className="form-control shadow-none form-control-lg"
                  name="password"
                  disabled={false}
                  variant="standard"
                  placeholder={t("text.staff.newPassword")}
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
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label">
                  {t("text.staff.confirmPassword")}
                </label>
              </div>
              <div className="form-control-wrap">
                <TextPassword
                  id="confirmPassword"
                  className="form-control shadow-none form-control-lg"
                  name="confirmPassword"
                  disabled={false}
                  variant="standard"
                  placeholder={t("text.staff.confirmPassword")}
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
            <div className="form-group text-center mt-4">
              <Button
                type="button"
                className="btn btn-secondary ripple-effect mr-2 h-100"
                data-dismiss="modal"
                onClick={onClose}
              >
                {t("text.common.cancel")}
              </Button>

              <CommonButton
                extraClassName="btn btn-primary ripple-effect"
                // loading={loading}
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

export default ManageStaffPasswordForm;
