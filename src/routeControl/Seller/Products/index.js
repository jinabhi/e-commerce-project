// import { DesktopOutlined } from "@ant-design/icons";

import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  PRODUCTS: {
    path: `${baseRoutes.sellerBaseRoutes}/products`,
  },
  ADD_PRODUCT: {
    path: `${baseRoutes.sellerBaseRoutes}/products/add`,
  },
  EDIT_PRODUCT: {
    path: `${baseRoutes.sellerBaseRoutes}/products/edit`,
  },
  PRODUCT_DETAIL: {
    path: `${baseRoutes.sellerBaseRoutes}/product/detail`,
  },
  BULK_UPLOAD: {
    path: `${baseRoutes.sellerBaseRoutes}/products/bulk-upload`,
  },
};

export default accessRoute;
