import React from "react";
import { Formik, Form } from "formik";
import { CommonButton, AntTags } from "../../../index";
import { validationStepThree } from "./validation";

export function SelectCategories({ onSubmit, categories }) {
  const initialValues = {
    categoryIds: [],
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
                <div className="formBlk d-flex flex-wrap">
                  <AntTags
                    tagsData={categories}
                    name="categoryIds"
                    setFieldValue={props.handleChange}
                  />
                </div>
                <div className="formAction d-flex align-items-center justify-content-between justify-content-lg-end">
                  <CommonButton
                    extraClassName="btn btn-primary flex-shrink-0 w190 btn-gradiant"
                    htmlType="submit"
                    type="submit"
                    // loading={loading}
                  >
                    Continue
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
