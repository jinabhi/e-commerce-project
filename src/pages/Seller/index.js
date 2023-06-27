import React from "react";

/*
 * Authentication, Registration and Change/Forget Password
 */
export const SellerLogin = React.lazy(() => import("./Login/index.page"));
export const SellerRegister = React.lazy(() => import("./Register/index.page"));
export const SellerForgotPassword = React.lazy(() =>
  import("./ForgotPassword/index.page")
);
export const SellerChangePassword = React.lazy(() =>
  import("./Account/ChangePassword/index.page")
);
export const SellerResetPassword = React.lazy(() =>
  import("./ResetPassword/index.page")
);
export const OtpVerification = React.lazy(() =>
  import("./OtpVerification/index.page")
);

/*
 * Seller Profile
 */
export const SellerProfile = React.lazy(() =>
  import("./Account/SellerProfile/index.page")
);

/*
 * Seller Dashboard
 */
export const SellerDashboard = React.lazy(() =>
  import("./Dashboard/index.page")
);

/*
 * Seller Products
 */
export const AddEditSellerProduct = React.lazy(() =>
  import("./Products/AddEditSellerProduct/index.page")
);
export const Products = React.lazy(() =>
  import("./Products/ProductList/index.page")
);

export const SellerProductDetail = React.lazy(() =>
  import("./Products/ProductDetail/index.page")
);
export const SellerProductBulkUpload = React.lazy(() =>
  import("./Products/BulkUploadProduct/index.page")
);

export const SellerDiscountOffer = React.lazy(() =>
  import("./DiscountsOffers/index.page")
);
/*
 * My Store
 */
export const MyStore = React.lazy(() => import("./MyStore/index.page"));
export const MorInventory = React.lazy(() =>
  import("./MorInventory/MorInventoryListing/index.page")
);

export const AddEditSellerDiscount = React.lazy(() =>
  import("./DiscountsOffers/AddEditDiscountOffer/index.page")
);
export const ShipToMor = React.lazy(() =>
  import("./MorInventory/ShipToMor/index.page")
);
export const SubCategoryProduct = React.lazy(() =>
  import("./MyStore/SubcategoryProduct/index.page")
);
export const ViewShippingLog = React.lazy(() =>
  import("./MorInventory/ViewShippingLog/index.page")
);

export const SellerContactUs = React.lazy(() =>
  import("./ManageCms/ContactUs/index.page")
);

export const TermsAndCondition = React.lazy(() =>
  import("./ManageCms/TermsAndCondition/index.page")
);

export const SellerAboutUs = React.lazy(() =>
  import("./ManageCms/AboutUs/index.page")
);
export const SellerPrivacyPolicy = React.lazy(() =>
  import("./ManageCms/PrivacyPolicy/index.page")
);
export const Faqs = React.lazy(() => import("./ManageCms/Faqs/index.page"));
export const EarningsList = React.lazy(() =>
  import("./Earnings/EarningListing/index.page")
);
export const Earnings = React.lazy(() =>
  import("./Earnings/EarningTab/index.page")
);
export const EarningsGraph = React.lazy(() =>
  import("./Earnings/EarningGraph/index.page")
);
export const Orders = React.lazy(() => import("./Orders/OrderList/index.page"));

export const OrderDetail = React.lazy(() =>
  import("./Orders/OrderDetail/index.page")
);
export const RatingReviews = React.lazy(() =>
  import("./RatingReviews/index.page")
);

export const SellerHowItWorks = React.lazy(() =>
  import("./ManageCms/HowItWorks/index.page")
);

export const SellerNotification = React.lazy(() =>
  import("./Notification/index.page")
);

export const SellerReturnAndRefundPolicy = React.lazy(() =>
  import("./ManageCms/ReturnAndRefundPolicy/index.page")
);
export const SellerCancellationPolicy = React.lazy(() =>
  import("./ManageCms/CancellatonPolicy/index.page")
);
