import { baseRoutes } from "../../../helpers/baseRoutes";

const Orders = {
  ORDERS: {
    path: `${baseRoutes.sellerBaseRoutes}/orders`,
  },
  ORDER_DETAILS: {
    path: `${baseRoutes.sellerBaseRoutes}/orders/details`,
  },
};

export default Orders;
