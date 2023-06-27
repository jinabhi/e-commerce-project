import { Button } from "../../Antd";

function FilterButton({ children, ...rest }) {
  return (
    <Button className="btn btn-warning" {...rest}>
      {children}
    </Button>
  );
}
export default FilterButton;
