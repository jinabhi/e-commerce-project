import { Form, Switch } from "antd";

function ToggleButton({
  checkedText = "",
  unCheckedText = "",
  defaultChecked = false,
  checked,
  name = "toggleSwitch",
  disabled,
  ...rest
}) {
  return (
    <Form.Item name={name} className="mb-0">
      <Switch
        checkedChildren={checkedText}
        unCheckedChildren={unCheckedText}
        defaultChecked={defaultChecked}
        checked={checked}
        disabled={disabled}
        {...rest}
      />
    </Form.Item>
  );
}
export default ToggleButton;
