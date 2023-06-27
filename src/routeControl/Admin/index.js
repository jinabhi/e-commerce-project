import dashboard from "./Dashboard";
import auth from "./Auth";
import user from "./User";
import manageOrders from "./ManageOrders";
import contactedUs from "./ContactedUs";
import master from "./Master";
import manageInventory from "./ManageInventory";
import customNotification from "./CustomNotification/index";
import manageCms from "./ManageCms/index";
import generalSettings from "./GeneralSettings";
import ManageEarning from "./ManageEarning/index";
import promotional from "./Promotional/index";
import banner from "./Banner/index";
import winstonLog from "./WinstonLog/index";

const AccessControl = {
  ...dashboard,
  ...auth,
  ...user,
  ...master,
  ...manageOrders,
  ...contactedUs,
  ...ManageEarning,
  ...manageInventory,
  ...customNotification,
  ...manageCms,
  ...generalSettings,
  ...promotional,
  ...banner,
  ...winstonLog,
};

export default AccessControl;
