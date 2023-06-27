import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  MOR_INVENTORY: {
    path: `${baseRoutes.sellerBaseRoutes}/mor-inventory`,
  },
  VIEW_SHIPPING_LOG: {
    path: `${baseRoutes.sellerBaseRoutes}/view-shipping-log`,
  },
};

export default accessRoute;
