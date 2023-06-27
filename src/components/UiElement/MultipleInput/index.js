import { Form, Select, Tag } from "antd";
import { useField } from "formik";
import { useEffect, useState } from "react";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={value?.length < 24 ? "black" : "red"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

function MultipleInput({
  name,
  placeholder,
  defaultValue,
  totalProduct,
  setData,
  data,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };
  const [state, setState] = useState();

  useEffect(() => {
    if (defaultValue) {
      setState([...defaultValue]);
    }
  }, []);

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  } else if (data?.length < 1) {
    config.error = true;
    meta.touched = true;
    config.helperText = meta.error;
  }

  const handleChangeSelect = (value) => {
    helpers.setValue(value);
    if (value.length === 0) {
      helpers.setValue(undefined);
    } else {
      helpers.setValue(value);
    }
    setData(value);
  };

  const onDeselect = (val) => {
    if (state.includes(val)) {
      data.filter((item) => item);
      setData(state);
    }
  };

  return (
    <Form.Item
      label={rest?.label}
      help={meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      <Select
        mode="tags"
        allowClear
        defaultValue={defaultValue}
        tagRender={tagRender}
        open={false}
        style={{
          width: "100%",
        }}
        placeholder={placeholder}
        onChange={handleChangeSelect}
        onDeselect={totalProduct > 0 && onDeselect}
        value={data}
      />
    </Form.Item>
  );
}

export default MultipleInput;
