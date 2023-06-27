import React from "react";
import { useField } from "formik";
import { Form } from "antd";
import DatePicker from "react-datepicker";
import { dateFormateWithSlash } from "../../../helpers";
import { dateFormatter } from "../../../utils";

export default function ReactDatepicker({
  label,
  name,
  onChange,
  disabledDate,
  values,
  placeholder,
  requiredDateFormat,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };
  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }
  return (
    <>
      <Form.Item
        // label={label || name}
        help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
        validateStatus={config.error ? "error" : "success"}
      >
        <DatePicker
          dateFormat="yyyy-MM-dd"
          placeholderText={placeholder}
          minDate={disabledDate}
          selected={values}
          {...rest}
          onChange={(value) => {
            onChange();
            helpers.setValue(
              dateFormatter(value, requiredDateFormat || dateFormateWithSlash)
            );
            helpers.setError("");
            helpers.setTouched(false);
          }}
        />
      </Form.Item>
    </>
  );
}
