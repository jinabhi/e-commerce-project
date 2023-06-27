import { Button } from "../../Antd/index";

function DeleteButton({ children, ...rest }) {
  return (
    <Button type="btn btn-danger m-3" {...rest}>
      {children}
    </Button>
  );
}
export default DeleteButton;
