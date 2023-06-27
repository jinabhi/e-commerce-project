import DashboardRoutes from "./Dashboard/index.route";
import SellerAccountRoutes from "./Account/index.route";
import ProductRoutes from "./Products/index.route";
import SellerDiscountOffers from "./DiscountsOffers/index.route";
import MyStore from "./MyStore/index.route";
import MorInventoryRoutes from "./MorInventory/index.route";
import Orders from "./Orders/index.route";
import Earnings from "./Earnings/index.route";
import RatingReviewRoutes from "./RatingReviews/index.route";
import Notification from "./Notification/index.route";
import ManageCms from "./ManageCms/index.routes";

export default function route() {
  return [
    ...DashboardRoutes(),
    ...SellerAccountRoutes(),
    ...MyStore(),
    ...Orders(),
    ...ProductRoutes(),
    ...SellerDiscountOffers(),
    ...Earnings(),
    ...MorInventoryRoutes(),
    ...RatingReviewRoutes(),
    ...Notification(),
    ...ManageCms(),
  ];
}
