import React from "react";

export const AdminDashboard = React.lazy(() =>
  import("./Dashboard/index.page")
);
export const Brands = React.lazy(() => import("./Master/Brands/index.page"));
export const ChildCategories = React.lazy(() =>
  import("./Master/ChildCategories/ChildCategoryListing/index.page")
);
export const AdminLogin = React.lazy(() => import("./Login/index.page"));
export const AdminForgotPassword = React.lazy(() =>
  import("./ForgotPassword/index.page")
);
export const AdminResetPassword = React.lazy(() =>
  import("./ResetPassword/index.page")
);
export const SubCategories = React.lazy(() =>
  import("./Master/SubCategories/index.page")
);
export const DiscountOffer = React.lazy(() =>
  import("./Master/Discounts/index.page")
);

export const ManageSellers = React.lazy(() =>
  import("./Users/ManageSellers/SellerListing/index.page")
);
export const SellerDetails = React.lazy(() =>
  import("./Users/ManageSellers/SellerDetails/index.page")
);

export const ManageCustomers = React.lazy(() =>
  import("./Users/ManageCustomers/CustomerListing/index.page")
);

export const CategoryList = React.lazy(() =>
  import("./Master/Category/index.page")
);
export const ProductVariants = React.lazy(() =>
  import("./Master/ProductVariants/ProductVariantListing/index.page")
);
export const Product = React.lazy(() =>
  import("./ManageInventory/Product/ManageProduct/index.page")
);
export const ShippingLog = React.lazy(() =>
  import("./ManageInventory/ShippingLog/index.page")
);
export const CustomNotification = React.lazy(() =>
  import("./CustomNotification/CustomNotificationListing/index.page")
);
export const CompletedOrders = React.lazy(() =>
  import("./ManageOrders/CompletedOrders/CompletedOrderListing/index.page")
);
export const CancelledOrders = React.lazy(() =>
  import("./ManageOrders/CancelledOrders/CancelledOrdersListing/index.page")
);
export const ManageStaff = React.lazy(() =>
  import("./Users/ManageStaff/ManageStaffListing/index.page")
);
export const StaffDetails = React.lazy(() =>
  import("./Users/ManageStaff/StaffDetails/index.page")
);
export const ProductComplaints = React.lazy(() =>
  import("./ContactedUs/ProductComplaints/index.page")
);

export const UserQueries = React.lazy(() =>
  import("./ContactedUs/UserQueries/index.page")
);
export const GetEarlyAccess = React.lazy(() =>
  import("./Promotional/GetEarlyAccess/index.page")
);
export const GetPromotionalContactUs = React.lazy(() =>
  import("./Promotional/GetPromotionalContactUs/index.page")
);
export const ManageCms = React.lazy(() =>
  import("./ManageCms/ManageCmsList/index.page")
);

export const ProductRequest = React.lazy(() =>
  import("./ManageInventory/ProductRequest/ProductRequestListing/index.page")
);
export const CustomerDetails = React.lazy(() =>
  import("./Users/ManageCustomers/CustomerDetails/index.page")
);

export const GeneralSettings = React.lazy(() =>
  import("./GeneralSettings/index.page")
);

export const Notification = React.lazy(() =>
  import("./Notification/index.page")
);
export const ProductDetails = React.lazy(() =>
  import("./ManageInventory/Product/ProductDetails/index.page")
);

export const AdminProfile = React.lazy(() =>
  import("./Account/AdminProfile/index.page")
);
export const ProductComplaintDetails = React.lazy(() =>
  import("./ContactedUs/ProductComplaintsDetails/index.page")
);
export const CancelOrderDetails = React.lazy(() =>
  import("./ManageOrders/CancelledOrders/CancelOrderDetails/index.page")
);

export const ManageEarning = React.lazy(() =>
  import("./ManageEarning/ManageEarningListing/index.page")
);
export const ChangePassword = React.lazy(() =>
  import("./Account/ChangePassword/index.page")
);
export const AddEditChildCategory = React.lazy(() =>
  import("./Master/ChildCategories/AddEditChildCategory/index.page")
);
export const AddEditStaff = React.lazy(() =>
  import("./Users/ManageStaff/AddEditStaff/index.page")
);
export const Rejection = React.lazy(() =>
  import("./Users/ManageSellers/Rejection/index.page")
);
export const EditTermsAndCondition = React.lazy(() =>
  import("./ManageCms/TermsAndCondition/index.page")
);
export const PrivacyPolicy = React.lazy(() =>
  import("./ManageCms/PrivacyPolicy/index.page")
);
export const ReturnAndRefundPolicy = React.lazy(() =>
  import("./ManageCms/ReturnAndRefundPolicy/index.page")
);
export const CancellationPolicy = React.lazy(() =>
  import("./ManageCms/CancellationPolicy/index.page")
);
export const HowItWorks = React.lazy(() =>
  import("./ManageCms/HowItWorks/ListingAndForm/index.page")
);
export const ChangeStaffPassword = React.lazy(() =>
  import("./Users/ManageStaff/ChangeStaffPassword/index.page")
);
export const CompletedOrderDetails = React.lazy(() =>
  import("./ManageOrders/CompletedOrders/CompletedOrderDetails/index.page")
);

export const AddCustomNotification = React.lazy(() =>
  import("./CustomNotification/AddCustomNotification/index.page")
);
export const AddEditProductVariants = React.lazy(() =>
  import("./Master/ProductVariants/AddEditProductVariant/index.page")
);
export const TrackingLink = React.lazy(() =>
  import("./ManageOrders/CompletedOrders/TrackingLink/index.page")
);
export const ActiveOrdersDetails = React.lazy(() =>
  import("./ManageOrders/ActiveOrders/ActiveOrderDetails/index.page")
);

export const AddAndEditIcon = React.lazy(() =>
  import("./ManageCms/HowItWorks/AddAndEditIcon/index.page")
);
export const EditCommission = React.lazy(() =>
  import("./Master/Brands/EditCommisson/index.page")
);
export const FAQs = React.lazy(() =>
  import("./ManageCms/FAQs/FAQsListing/index.page")
);
export const AboutUs = React.lazy(() =>
  import("./ManageCms/AboutUs/index.page")
);
export const ManageEarningOrdersDetails = React.lazy(() =>
  import("./ManageEarning/ManageEarningOrderDetails/index.page")
);
export const BannerListing = React.lazy(() =>
  import("./Banner/BannerListing/index.page")
);
export const AddBanner = React.lazy(() =>
  import("./Banner/AddBanner/index.page")
);
export const ActiveOrders = React.lazy(() =>
  import("./ManageOrders/ActiveOrders/ReceivedOrderListing/index.page")
);
export const PackedOrdersList = React.lazy(() =>
  import("./ManageOrders/ActiveOrders/PackedOrderListing/index.page")
);
export const PickedUpOrdersList = React.lazy(() =>
  import("./ManageOrders/ActiveOrders/PickedUpOrdersListing/index.page")
);
export const Accessibility = React.lazy(() =>
  import("./ManageCms/Accessibility/index.page")
);
export const WinstonLog = React.lazy(() => import("./WinstonLog/index.page"));
