import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { Input as TextInput, AntTextArea as TextArea } from "../../../../Antd";
import { CommonButton } from "../../../../UiElement";
import validation from "./validation";

export default function ContactUsForm({ onSubmit, loading }) {
  const initialValues = {
    reason: "",
    description: "",
  };
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={(e, { resetForm }) => {
        onSubmit(e, resetForm);
      }}
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group mb-30">
              <label className="form-label" htmlFor="Specifications">
                {t("text.sellerManageCms.enterReason")}
              </label>
              <TextInput
                id="reason"
                className="form-control form-control-sm form-control-large"
                name="reason"
                disabled={false}
                variant="standard"
                type="text"
                placeholder={t("text.sellerManageCms.placeEnterReason")}
                setFieldValue={props.handleChange}
              />
            </div>
            <div className="form-group mb-30">
              <label className="form-label" htmlFor="Specifications">
                {t("text.sellerManageCms.writeDescription")}
              </label>
              <TextArea
                id="description"
                className="form-control form-control-sm form-control-large"
                name="description"
                disabled={false}
                variant="standard"
                type="text"
                placeholder={t("text.sellerManageCms.placeEnterDescription")}
              />
            </div>
            <div className="formAction d-flex align-items-center justify-content-end">
              <CommonButton
                htmlType="submit"
                type="submit"
                className="btn btn-primary flex-shrink-0 w190 btn-gradiant saveButton"
                loading={loading}
              >
                {t("text.common.submit")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
