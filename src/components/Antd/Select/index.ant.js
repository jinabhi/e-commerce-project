import React from "react";
import { Select as AntSelect, Form } from "antd";
import "./style.scss";
import { useField } from "formik";

const { Option } = AntSelect;

function Select({
  Children,
  options = [],
  label = "",
  name,
  setFieldValue,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const handleChangeSelect = (value) => {
    helpers.setValue(value);
  };

  return (
    <Form.Item
      className="col selectComponent"
      label={label}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      <AntSelect
        size="large"
        {...field}
        {...rest}
        onChange={handleChangeSelect}
      >
        {options.map((item) => (
          <Option value={item.value}>{item.name}</Option>
        ))}
      </AntSelect>
    </Form.Item>
  );
}

export default Select;
