import staffRoutes from "./Staff";
import sellerRoutes from "./Seller";
import adminRoutes from "./Admin";
import promotionalRoutes from "./Promotional";

const moduleRoutesMap = {
  admin: { ...adminRoutes },
  staff: { ...staffRoutes },
  seller: { ...sellerRoutes },
  promotional: { ...promotionalRoutes },
};

export default moduleRoutesMap;
