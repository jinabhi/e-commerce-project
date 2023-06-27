import {
  AddEditSellerDiscount,
  SellerDiscountOffer,
} from "../../../pages/Seller";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.DISCOUNTS_OFFERS.path,
      private: true,
      name: "Discounts",
      key: routesMap.DISCOUNTS_OFFERS.path,
      belongsToHeader: true,
      element: <SellerDiscountOffer />,
    },
    {
      path: routesMap.DISCOUNTS_ADD.path,
      private: true,
      name: "Add Discount",
      key: routesMap.DISCOUNTS_ADD.path,
      belongsToHeader: false,
      element: <AddEditSellerDiscount />,
    },
    {
      path: `${routesMap.DISCOUNTS_EDIT.path}/:id`,
      private: true,
      name: "Edit Discount",
      key: `${routesMap.DISCOUNTS_EDIT.path}/:id`,
      belongsToHeader: false,
      element: <AddEditSellerDiscount />,
    },
  ];
}
