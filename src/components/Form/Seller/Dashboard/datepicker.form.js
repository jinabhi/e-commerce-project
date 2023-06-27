import { Formik, Form } from "formik";
import React from "react";
import { withTranslation } from "react-i18next";
import { DatePicker } from "../../../Antd";

function SellerDatePickerForm(mainProps) {
  const { onSubmit } = mainProps;

  const initialValues = {
    date: undefined
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <DatePicker
              id="date"
              name="date"
              disabled={false}
              variant="standard"
              className="form-control datetimepicker-input"
              placeholder="DD/MM/YY"
              suffixIcon=""
              setFieldValue={props.handleChange}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default withTranslation()(SellerDatePickerForm);
