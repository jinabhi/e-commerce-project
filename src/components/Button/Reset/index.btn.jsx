import { Button } from "../../Antd";

function ResetButton({ children, ...rest }) {
  return (
    <Button className="btn bg-dark text-warning border-0" {...rest}>
      {children}
    </Button>
  );
}
export default ResetButton;
