import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, TextEditor } from "../../../../UiElement";
import { Input as TextInput, Select } from "../../../../index";
import validation from "./validation";

function AddEditFAQsForm({ onSubmit, loading, rowData, initialData }) {
  const initialValues = {
    question: initialData?.question || "",
    typeOfFaqs: initialData?.type || undefined,
    answer: initialData?.answer || "",
  };
  const { t } = useTranslation();

  const arrayOfData = [
    {
      id: "seller",
      name: "Seller",
    },
    {
      id: "customer",
      name: "Customer",
    },
    {
      id: "promotional",
      name: "Promotional",
    },
  ];

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
              <label className="form-label" htmlFor="category-name">
                {t("text.faqs.question")}
              </label>

              <div className="form-control-wrap">
                <TextInput
                  className="form-control"
                  name="question"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t("text.faqs.question")}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                className="form-label"
                htmlFor="category-name"
              >
                {t("text.faqs.typeOfFaq")}
              </label>
              <div className="form-control-wrap">
                <Select
                  id="typeOfFaqs"
                  extraClassName="form-select form-select-sm select2-hidden-accessible"
                  name="typeOfFaqs"
                  disabled={false}
                  variant="standard"
                  placeholder={t("text.faqs.typeOfFaq")}
                  setFieldValue={props.handleChange}
                  arrayOfData={arrayOfData}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t("text.faqs.answer")}</label>
              <div className="form-control-wrap">
                <div className="nk-block">
                  <TextEditor
                    name="answer"
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
                {rowData?.id ? t("text.common.update") : t("text.common.add")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddEditFAQsForm;
