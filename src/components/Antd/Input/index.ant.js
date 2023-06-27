import { Form } from "antd";
import { useField } from "formik";
import {
  FloatingLabel,
  OverlayTrigger,
  Tooltip,
  Form as BootstapForm,
} from "react-bootstrap";

function Input({
  name,
  icon,
  setFieldValue,
  floatingLabel = false,
  tooltip = false,
  tooltipText,
  extraClassName,
  ...rest
}) {
  const [field, meta] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return (
    <Form.Item
      label={rest?.label}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      {icon}
      {floatingLabel ? (
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
          <BootstapForm.Control {...field} {...rest} />
        </FloatingLabel>
      ) : (
        <>
          {icon}
          <input type="text" {...field} {...rest} />
        </>
      )}
    </Form.Item>
  );
}

export default Input;
