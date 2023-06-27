// import { DesktopOutlined } from "@ant-design/icons";

import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  DASHBOARD: {
    path: `${baseRoutes.sellerBaseRoutes}/dashboard`,
    icon: (
      <span className="nk-menu-icon">
        <em className="icon ni ni-grid-alt" />
      </span>
    ),
  },
};

export default accessRoute;
