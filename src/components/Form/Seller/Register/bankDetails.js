import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { CommonButton, Input as TextInput } from "../../../index";
import { validationStepThree } from "./validation";

export function BankDetails({ onSubmit, loading }) {
  const { t } = useTranslation();
  const initialValues = {
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
  };
  return (
    <fieldset className="h-100">
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validationStepThree()}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <Form>
              <div className="d-flex h-100 flex-column justify-content-between">
                <div className="formBlk">
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.register.accountHolderName")}
                    </label>
                    <TextInput
                      className="form-control"
                      type="text"
                      placeholder={t(
                        "text.register.accountHolderNamePlaceholder"
                      )}
                      name="accountHolderName"
                      variant="standard"
                      setFieldValue={props.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.register.accountNumber")}
                    </label>
                    <TextInput
                      className="form-control"
                      type="number"
                      placeholder={t("text.register.accountNumberPlaceholder")}
                      name="accountNumber"
                      variant="standard"
                      setFieldValue={props.handleChange}
                      maxLength={12}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.register.routingNumber")}
                    </label>
                    <TextInput
                      className="form-control"
                      type="text"
                      placeholder={t("text.register.routingNumberPlaceholder")}
                      name="routingNumber"
                      variant="standard"
                      setFieldValue={props.handleChange}
                      maxLength={12}
                    />
                  </div>
                </div>
                <div className="formAction d-flex align-items-center justify-content-between justify-content-lg-end">
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
