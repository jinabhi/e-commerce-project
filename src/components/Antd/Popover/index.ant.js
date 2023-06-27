import { Popover as AntPopover } from "antd";
import "./style.scss";

function Popovers({ children, content, visible, setVisible, width, ...rest }) {
  return (
    <AntPopover
      {...rest}
      overlayStyle={{ width }}
      content={content}
      visible={visible}
      trigger="click"
      onVisibleChange={(newVisible) => {
        setVisible(newVisible);
      }}
      title="Filter"
    >
      {children}
    </AntPopover>
  );
}

export default Popovers;
