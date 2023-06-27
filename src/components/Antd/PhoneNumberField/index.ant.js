import { Form } from "antd";
import { useField } from "formik";
import { useEffect } from "react";
import { FloatingLabel, OverlayTrigger, Tooltip } from "react-bootstrap";
import PhoneInput from "react-phone-number-input/input";

function PhoneNumberInput({
  name,
  icon,
  setFieldValue,
  floatingLabel = false,
  tooltip = false,
  tooltipText,
  extraClassName,
  setValues,
  value,
  ...rest
}) {
  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }
  useEffect(() => {
    if (value) {
      helpers.setValue(value);
      helpers.setTouched(false);
      helpers.setError("");
    } else {
      helpers.setValue("");
      // helpers.setTouched(true);
      config.error = true;
      config.helperText = meta.error;
    }
  }, [value]);

  return (
    <Form.Item
      label={rest?.label}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      {icon}
      {floatingLabel && (
        <FloatingLabel
          className={extraClassName}
          controlId={name}
          label={rest?.label}
        >
          {tooltip && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">{tooltipText}</Tooltip>}
            >
              <span className="inputExtraInfo position-absolute">
                <em className="icon-info text-white" />
              </span>
            </OverlayTrigger>
          )}
          <PhoneInput
            placeholder={rest?.label}
            className="form-control ps-0"
            country="US"
            value={value}
            onChange={setValues}
            onKeyPress={(e) =>
              e.target.value?.length === 14 && e.preventDefault()
            }
          />
        </FloatingLabel>
      )}
    </Form.Item>
  );
}

export default PhoneNumberInput;
