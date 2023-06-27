import dashboard from "./Dashboard";
import auth from "./Auth";
import manageInventory from "./ManageInventory";

const AccessControl = {
  ...dashboard,
  ...auth,
  ...manageInventory,
};

export default AccessControl;
