import React from "react";
import { Form, DatePicker as AntDatePicker } from "antd";
import { useField } from "formik";
import { dateFormatter } from "../../../utils";
import { dateFormateWithSlash } from "../../../helpers";

function DatePicker({
  name,
  icon,
  setFieldValue,
  onSelectChange,
  extraClassName,
  validation = false,
  placeholder,
  allowClear = false,
  requiredDateTimeFormat,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);

  const config = { ...field, ...rest };
  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const handleChangeDate = (value) => {
    helpers.setValue(
      dateFormatter(value, requiredDateTimeFormat || dateFormateWithSlash)
    );
    helpers.setError("");
    helpers.setTouched(false);
  };

  return (
    <>
      {validation ? (
        <Form.Item
          label={rest?.label}
          help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
          validateStatus={config.error ? "error" : "success"}
        >
          <AntDatePicker
            format="MM/DD/YYYY"
            allowClear={allowClear}
            {...rest}
            placeholder={placeholder}
            onChange={handleChangeDate}
          />
        </Form.Item>
      ) : (
        <AntDatePicker
          format="MM/DD/YYYY"
          allowClear={allowClear}
          {...rest}
          placeholder={placeholder}
          onChange={handleChangeDate}
        />
      )}
    </>
  );
}

export default DatePicker;
