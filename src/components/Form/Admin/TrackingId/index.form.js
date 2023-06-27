import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import { Input as TextInput, CommonButton } from "../../../index";
import validation from "./validation";

function TrackingIdForm(mainProps) {
  const { onSubmit, loading } = mainProps;
  const initialValues = {
    trackingId: "",
  };
  const { t } = useTranslation();

  function handleKey(e) {
    let ASCIICode = e.which ? e.which : e.keyCode;
    if (
      (ASCIICode > 31 && ASCIICode < 48) ||
      ASCIICode === 60 ||
      ASCIICode === 62 ||
      ASCIICode === 126 ||
      ASCIICode === 96 ||
      ASCIICode === 63 ||
      ASCIICode === 58 ||
      ASCIICode === 123 ||
      ASCIICode === 125 ||
      ASCIICode === 91 ||
      ASCIICode === 93 ||
      ASCIICode === 92 ||
      ASCIICode === 124 ||
      ASCIICode === 64 ||
      ASCIICode === 59 ||
      ASCIICode === 95 ||
      ASCIICode === 94 ||
      ASCIICode === 61
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
                {t("text.manageOrders.trackingId")}
              </label>
              <div className="form-control-wrap">
                <TextInput
                  id="trackingId"
                  className="form-control"
                  name="trackingId"
                  disabled={false}
                  variant="standard"
                  onKeyPress={(e) => handleKey(e)}
                  type="text"
                  placeholder={t("text.manageOrders.trackingIdPlaceholder")}
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

export default TrackingIdForm;
