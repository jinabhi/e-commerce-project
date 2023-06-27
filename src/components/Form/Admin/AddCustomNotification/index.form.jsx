import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  Input as TextInput,
  CommonButton,
  Select,
  AntTextArea,
} from "../../../index";
import validation from "./validation";

function AddCustomNotificationForm({ onSubmit, loading, arrayOfData }) {
  const { t } = useTranslation();
  const initialValues = {
    userType: undefined,
    title: "",
    description: "",
  };

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
              <label className="form-label" htmlFor="category-name">
                {t("text.customNotification.userType")}
              </label>
              <div className="form-control-wrap">
                <Select
                  name="userType"
                  disabled={false}
                  variant="standard"
                  setFieldValue={props.handleChange}
                  arrayOfData={arrayOfData}
                  placeholder={t("text.customNotification.userTypePlaceholder")}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="category-name">
                {t("text.customNotification.title")}
              </label>

              <div className="form-control-wrap">
                <TextInput
                  className="form-control"
                  name="title"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t("text.customNotification.titlePlaceholder")}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="fv-message">
                {t("text.customNotification.description")}
              </label>
              <div className="form-control-wrap">
                <AntTextArea
                  className="form-control form-control-sm"
                  name="description"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t(
                    "text.customNotification.descriptionPlaceholder"
                  )}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group text-center">
              <CommonButton
                type="submit"
                htmlType="submit"
                className="btn btn-primary ripple-effect"
                loading={loading}
              >
                {t("text.customNotification.submit")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddCustomNotificationForm;
