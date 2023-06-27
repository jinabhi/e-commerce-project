import { Button } from "react-bootstrap";

function CommonButton({
  children,
  extraClassName,
  loading,
  variant = "none",
  ...rest
}) {
  return (
    <Button
      disabled={loading}
      variant={variant}
      className={`${extraClassName}`}
      {...rest}
    >
      {children}
    </Button>
  );
}
export default CommonButton;
