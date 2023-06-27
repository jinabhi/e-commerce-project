import {
  Products,
  AddEditSellerProduct,
  SellerProductDetail,
  SellerProductBulkUpload,
} from "../../../pages";

import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.PRODUCTS.path,
      private: true,
      name: "Products",
      key: routesMap.PRODUCTS.path,
      belongsToHeader: true,
      element: <Products />,
    },
    {
      path: routesMap.ADD_PRODUCT.path,
      private: true,
      name: "Products",
      key: routesMap.ADD_PRODUCT.path,
      belongsToHeader: false,
      element: <AddEditSellerProduct />,
    },
    {
      path: `${routesMap.EDIT_PRODUCT.path}/:id`,
      private: true,
      name: "Products",
      key: `${routesMap.EDIT_PRODUCT.path}/:id`,
      belongsToHeader: false,
      element: <AddEditSellerProduct />,
    },
    {
      path: `${routesMap.PRODUCT_DETAIL.path}/:id`,
      private: true,
      name: "Product Detail",
      key: `${routesMap.PRODUCT_DETAIL.path}/:id`,
      belongsToSidebar: false,
      element: <SellerProductDetail />,
    },
    {
      path: routesMap.BULK_UPLOAD.path,
      private: true,
      name: "Products",
      key: routesMap.BULK_UPLOAD.path,
      belongsToHeader: false,
      element: <SellerProductBulkUpload />,
    },
  ];
}
