import { Button } from "../..";
import "./style.scss";

function CreateButton({ children, ...rest }) {
  return (
    <Button className="btn btn-success" {...rest}>
      {children}
    </Button>
  );
}
export default CreateButton;
