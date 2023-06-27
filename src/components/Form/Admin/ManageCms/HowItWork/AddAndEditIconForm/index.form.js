import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, TextEditor } from "../../../../../UiElement";
import { Input as TextInput } from "../../../../../index";
import validation from "./validation";

function AddAndEditIconForm({ onSubmit, loading, initialData }) {
  const initialValues = {
    title: initialData?.title || "",
    description: initialData?.description || "",
  };
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={onSubmit}
      validationSchema={validation()}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <label className="form-label">{t("text.howItWorks.title")}</label>
              <div className="form-control-wrap">
                <TextInput
                  id="title"
                  className="form-control form-control-lg"
                  name="title"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t("text.howItWorks.titleHere")}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                {t("text.common.description")}
              </label>
              <div className="form-control-wrap">
                <div className="nk-block">
                  <TextEditor
                    name="description"
                    setFieldValue={props.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group text-center">
              <CommonButton
                className="btn btn-lg btn-primary my-3 "
                htmlType="submit"
                loading={loading}
                type="submit"
              >
                {initialData?.id
                  ? t("text.common.update")
                  : t("text.common.add")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddAndEditIconForm;
