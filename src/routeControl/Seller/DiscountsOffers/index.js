import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  DISCOUNTS_OFFERS: {
    path: `${baseRoutes.sellerBaseRoutes}/discounts-offers`,
  },
  DISCOUNTS_ADD: {
    path: `${baseRoutes.sellerBaseRoutes}/add-discounts`,
  },
  DISCOUNTS_EDIT: {
    path: `${baseRoutes.sellerBaseRoutes}/edit-discounts`,
  },
};

export default accessRoute;
