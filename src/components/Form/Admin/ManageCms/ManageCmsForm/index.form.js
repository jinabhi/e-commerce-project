import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, TextEditor } from "../../../../UiElement";
import validation from "./validation";

function ManageCmsForm({ onSubmit, loading, onCancel, initialData }) {
  const initialValues = {
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
            <div className="nk-block">
              <TextEditor
                name="description"
                setFieldValue={props.handleChange}
              />
            </div>
            <CommonButton
              extraClassName="btn btn-lg btn-primary my-3"
              htmlType="submit"
              type="submit"
              loading={loading}
            >
              {t("text.common.update")}
            </CommonButton>
            <CommonButton
              extraClassName="btn btn-lg btn-outline-primary ml-2 my-3"
              type="submit"
              htmlType="submit"
              onClick={onCancel}
            >
              {t("text.common.cancel")}
            </CommonButton>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ManageCmsForm;
