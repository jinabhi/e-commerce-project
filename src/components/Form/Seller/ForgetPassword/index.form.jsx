import { Formik, Form } from "formik";
import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import validation from "./validation";
import { Input as TextInput, GradientButton } from "../../../index";

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
          <Form
            className="d-flex h-100 flex-column justify-content-between"
            onSubmit={props.handleSubmit}
          >
            <div className="">
              <div className="authHeader">
                <Link
                  to="/"
                  className="back-icon d-block d-lg-none mb-2 mb-md-3 mb-lg-0 position-static"
                >
                  <em className="icon-arrow-left" />
                </Link>
                <h1>{t("text.sellerForgotPassword.forgotPasswordTitle")}</h1>
                <p className="mb-0">
                  {t("text.sellerForgotPassword.forgotPasswordDescriptionOne")}
                  <br className="d-none d-lg-block" />
                  {t("text.sellerForgotPassword.forgotPasswordDescriptionTwo")}
                </p>
              </div>
              <div className="form-group">
                <label className="form-label">
                  {t("text.sellerForgotPassword.email")}
                </label>
                <TextInput
                  className="form-control"
                  name="email"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t("text.sellerForgotPassword.emailPlaceholder")}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="formAction d-flex align-items-center justify-content-end">
              <GradientButton
                type="submit"
                htmlType="submit"
                loading={loading}
                extraClassName="flex-shrink-0 w190"
              >
                {t("text.sellerForgotPassword.submit")}
              </GradientButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withTranslation()(ForgotPasswordForm);
