import { Button } from "../..";
import "./style.scss";

function SuccessButton({ children, loading, ...rest }) {
  return (
    <Button loading={loading} className="btn btn-success m-3" {...rest}>
      {children}
    </Button>
  );
}
export default SuccessButton;
