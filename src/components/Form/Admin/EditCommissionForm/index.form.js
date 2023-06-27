import { Formik, Form } from "formik";
import React from "react";
import { withTranslation } from "react-i18next";
import { Input as TextInput, CommonButton } from "../../../index";
import validation from "./validation";

function EditCommissionForm({ t, onSubmit, loading, value }) {
  const initialValues = {
    commission: value?.commission || "",
  };

  function handleKey(e) {
    if (e.keyCode === 107 || e.keyCode === 109 || e.keyCode === 69) {
      e.preventDefault();
    }
  }
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
              <div className="form-control-wrap">
                <TextInput
                  className="form-control form-control-lg shadow-none"
                  name="commission"
                  disabled={false}
                  variant="standard"
                  type="number"
                  placeholder={t("text.brands.commissionPlaceholder")}
                  setFieldValue={props.handleChange}
                  onKeyDown={(e) => handleKey(e)}
                />
              </div>
            </div>
            <div className="form-group text-center">
              <CommonButton
                type="submit"
                htmlType="submit"
                loading={loading}
                className="btn btn-primary updateCommission ripple-effect"
              >
                {t("text.common.update")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withTranslation()(EditCommissionForm);
