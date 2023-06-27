import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";

import { Input as TextInput, CommonButton } from "../../../index";
import validation from "./validation";

function CreditUserForm(mainProps) {
  const { onSubmit, loading } = mainProps;
  const initialValues = {
    point: "",
  };
  const { t } = useTranslation();

  function onKeyChange(e) {
    if (
      e.keyCode === 189 ||
      e.keyCode === 187 ||
      e.keyCode === 190 ||
      e.keyCode === 110 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 69
    ) {
      e.preventDefault();
    }
  }

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
              <label className="form-label">
                {t("text.productComplaints.creditPoints")}
              </label>
              <div className="form-control-wrap">
                <TextInput
                  id="point"
                  className="form-control"
                  name="point"
                  disabled={false}
                  variant="standard"
                  onKeyDown={onKeyChange}
                  type="number"
                  placeholder={t(
                    "text.productComplaints.creditPointsPlaceholder"
                  )}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group center">
              <CommonButton
                extraClassName="btn btn-md btn-primary  "
                loading={loading}
                htmlType="submit"
                data-dismiss="modal"
                type="submit"
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

export default CreditUserForm;
