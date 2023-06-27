import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";
import ClientCaptcha from "react-client-captcha";

import { PhoneNumberInput, Input as TextInput } from "../../../index";
import { CommonButton } from "../../../UiElement";
import validation from "./validation";
import "react-phone-number-input/style.css";
import { modalNotification } from "../../../../utils";

function ContactUsForm(mainProps) {
  const { onSubmit, loading, setValues, value } = mainProps;
  const [currentCaptcha, setCurrentCaptcha] = useState("");
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    companyUrl: "",
    message: "",
    phoneNumber: "",
    countryCode: "+1",
    instagramHandle: "",
    captcha: "",
  };
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      // onSubmit={(e, { resetForm }) => {
      //   onSubmit(e, resetForm);
      // }}
      onSubmit={(values, { resetForm }) => {
        if (currentCaptcha === values.captcha) {
          delete values.captcha;
          onSubmit(values, resetForm);
          document.getElementById("retryButton").click();
        } else {
          modalNotification({
            type: "error",
            message: "Please enter valid captcha code",
            closeButton: false,
          });
          document.getElementById("retryButton").click();
        }
      }}
      validationSchema={validation()}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="row">
              <div className="col-sm-6 form">
                <div className="form-floating">
                  <TextInput
                    label={t("text.landingPage.firstNamePlaceholder")}
                    className="form-control"
                    name="firstName"
                    disabled={false}
                    variant="standard"
                    floatingLabel
                    type="text"
                    placeholder={t("text.landingPage.firstNamePlaceholder")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-user icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6 form">
                <div className="form-floating">
                  <TextInput
                    label={t("text.landingPage.lastNamePlaceholder")}
                    className="form-control"
                    name="lastName"
                    disabled={false}
                    variant="standard"
                    type="text"
                    floatingLabel
                    placeholder={t("text.landingPage.lastNamePlaceholder")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-user icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6 form">
                <div className="form-floating">
                  <TextInput
                    label={t("text.landingPage.emailPlaceholder")}
                    className="form-control"
                    name="email"
                    disabled={false}
                    variant="standard"
                    type="text"
                    floatingLabel
                    placeholder={t("text.landingPage.emailPlaceholder")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-email icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6 form">
                <div className="row g-0">
                  <div className="col-auto">
                    <div className="form-floating form-floating-country">
                      <TextInput
                        label=""
                        floatingLabel
                        className="form-control ps-0"
                        name="countryCode"
                        disabled
                        variant="standard"
                        type="text"
                        placeholder="Country"
                        value="+1"
                        setFieldValue={props.handleChange}
                        icon={
                          <span className="form-icon">
                            <span className="icon-phone icomoon text-white" />
                          </span>
                        }
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating form-floating-mobile">
                      <PhoneNumberInput
                        floatingLabel
                        label={t("text.landingPage.phoneNumberPlaceholder")}
                        className="form-control"
                        name="phoneNumber"
                        disabled={false}
                        variant="standard"
                        type="text"
                        extraClassName="form-floating-tooltip"
                        placeholder={t(
                          "text.landingPage.phoneNumberPlaceholder"
                        )}
                        setFieldValue={props.handleChange}
                        setValues={setValues}
                        value={value}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.landingPage.companyUrlPlaceholder")}
                    className="form-control"
                    name="companyUrl"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t("text.landingPage.companyUrlPlaceholder")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-link icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-sm-6 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.landingPage.instagramUrlPlaceholder")}
                    className="form-control"
                    name="instagramHandle"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t("text.landingPage.instagramUrlPlaceholder")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-twitter icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-sm-12 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.landingPage.subjectPlaceholder")}
                    className="form-control"
                    name="subject"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t("text.landingPage.subjectPlaceholder")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-arrow-down icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-md-12 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.landingPage.messagePlaceholder")}
                    className="form-control"
                    name="message"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t("text.landingPage.messagePlaceholder")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-pencil icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>

              <div className="col-md-6 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.landingPage.captchaCode")}
                    className="form-control"
                    name="captcha"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t("text.landingPage.captchaCode")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-pencil icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-md-6 form align-self-end mb-4">
                <ClientCaptcha
                  captchaCode={(code) => setCurrentCaptcha(code)}
                  width="130"
                  charsCount="6"
                />
              </div>

              <div className="col-md-12 text-center mt-3">
                <CommonButton
                  type="submit"
                  extraClassName="btn btn-primary ripple-effect flex-shrink-0 w190 btn-gradiant"
                  disabled={loading}
                >
                  {t("text.landingPage.send")}
                </CommonButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ContactUsForm;
