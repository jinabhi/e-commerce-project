import DashboardRoutes from "./Dashboard/index.route";
import MasterRoutes from "./Master/index.route";
import UserRoutes from "./User/index.route";
import ManageOrdersRoutes from "./ManageOrders/index.route";
import ContactedUs from "./ContactedUs/index.route";
import ManageInventoryRoutes from "./ManageInventory/index.route";
import CustomNotificationRoutes from "./CustomNotification/index.route";
import ManageCms from "./ManageCms/index.route";
import GeneralSettings from "./GeneralSettings/index.route";
import AccountRoutes from "./Account/index.route";
import ManageEarning from "./ManageEarning/index.route";
import Promotional from "./Promotional/index.route";
import Banner from "./Banner/index.route";
import WinstonLog from "./WinstonLog/index.route";

export default function route() {
  return [
    ...DashboardRoutes(),
    ...MasterRoutes(),
    ...UserRoutes(),
    ...ManageInventoryRoutes(),
    ...ManageOrdersRoutes(),
    ...ContactedUs(),
    ...ManageEarning(),
    ...CustomNotificationRoutes(),
    ...ManageCms(),
    ...AccountRoutes(),
    ...GeneralSettings(),
    ...Promotional(),
    ...Banner(),
    ...WinstonLog(),
  ];
}
