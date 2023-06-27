import { MyStore, SubCategoryProduct } from "../../../pages";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.MY_STORE.path,
      private: true,
      name: "My Store",
      key: routesMap.MY_STORE.path,
      belongsToHeader: true,
      element: <MyStore />,
    },
    {
      path: `${routesMap.SUBCATEGORY_PRODUCT.path}/:id`,
      private: true,
      name: "SubCategory Product",
      key: `${routesMap.SUBCATEGORY_PRODUCT.path}/:id`,
      belongsToHeader: false,
      element: <SubCategoryProduct />,
    },
  ];
}
