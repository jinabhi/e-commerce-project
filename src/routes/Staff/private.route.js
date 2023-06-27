import DashboardRoutes from "./Dashboard/index.route";
import ManageInventoryRoutes from "./ManageInventory/index.route";
import AccountRoutes from "./Account/index.route";

export default function route() {
  return [...DashboardRoutes(), ...ManageInventoryRoutes(), ...AccountRoutes()];
}
