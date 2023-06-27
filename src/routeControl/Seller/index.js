import auth from "./Auth";
import dashboard from "./Dashboard";
import products from "./Products";
import discountOffer from "./DiscountsOffers";
import morInventory from "./MorInventory";
import myStore from "./MyStore";
import Orders from "./Orders";
import earnings from "./Earnings";
import RatingReview from "./RatingReviews";
import Notification from "./Notification/index";
import ManageCms from "./ManageCms";

const AccessControl = {
  ...auth,
  ...dashboard,
  ...products,
  ...discountOffer,
  ...earnings,
  ...morInventory,
  ...myStore,
  ...Orders,
  ...RatingReview,
  ...Notification,
  ...ManageCms,
};
export default AccessControl;
