import { Formik, Form } from "formik";
import React from "react";
import { withTranslation } from "react-i18next";
import validation from "./validation";
import { Input as TextInput, CommonButton } from "../../../index";

function ForgotPasswordForm({ t, onSubmit, loading }) {
  const initialValues = {
    email: "",
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form onSubmit={props.handleSubmit}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  {t("text.adminForgetPassword.email")}
                </label>
              </div>
              <div className="form-control-wrap">
                <div className="form-icon form-icon-left">
                  <em className="icon ni ni-user" />
                </div>
                <TextInput
                  className="form-control form-control-lg"
                  name="email"
                  disabled={false}
                  variant="standard"
                  type="email"
                  placeholder={t("text.adminForgetPassword.emailPlaceholder")}
                  setFieldValue={props.handleChange}
                  icon={
                    <div className="form-icon form-icon-left">
                      <em className="icon ni ni-user" />
                    </div>
                  }
                />
              </div>
            </div>
            <div className="form-control-wrap">
              <CommonButton
                type="submit"
                htmlType="submit"
                loading={loading}
                className="btn btn-lg btn-primary btn-block"
              >
                {t("text.adminForgetPassword.submit")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withTranslation()(ForgotPasswordForm);
