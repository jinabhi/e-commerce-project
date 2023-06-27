import { Button } from "../../Antd/index";

function ModifyButton({ children, ...rest }) {
  return (
    <Button className="btn btn-success" {...rest}>
      {children}
    </Button>
  );
}
export default ModifyButton;
