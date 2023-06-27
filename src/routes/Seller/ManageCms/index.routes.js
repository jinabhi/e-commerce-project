import { Outlet } from "react-router-dom";
import {
  SellerContactUs,
  TermsAndCondition,
  SellerAboutUs,
  SellerPrivacyPolicy,
  Faqs,
  SellerHowItWorks,
  SellerReturnAndRefundPolicy,
  SellerCancellationPolicy,
} from "../../../pages";
import routesMap from "../../../routeControl/sellerRoutes";

export default function route() {
  return [
    {
      path: routesMap.MANAGE_CMS.path,
      private: true,
      name: "Support",
      key: routesMap.MANAGE_CMS.path,
      belongsToHeader: true,
      element: <Outlet />,
      children: [
        {
          path: routesMap.CONTACT_US.path,
          private: false,
          commonRoutes: true,
          name: "Contact Us",
          key: routesMap.CONTACT_US.path,
          belongsToHeader: true,
          element: <SellerContactUs />,
        },
        {
          path: routesMap.TERMS_CONDITIONS.path,
          private: false,
          commonRoutes: true,
          name: "Terms & Conditions",
          key: routesMap.TERMS_CONDITIONS.path,
          belongsToHeader: true,
          element: <TermsAndCondition />,
        },
        {
          path: routesMap.PRIVACY_POLICY.path,
          private: false,
          commonRoutes: true,
          name: "Privacy Policy",
          key: routesMap.PRIVACY_POLICY.path,
          belongsToHeader: true,
          element: <SellerPrivacyPolicy />,
        },
        {
          path: routesMap.ABOUT_US.path,
          commonRoutes: true,
          private: false,
          name: "About Us",
          key: routesMap.ABOUT_US.path,
          belongsToHeader: true,
          element: <SellerAboutUs />,
        },
        {
          path: routesMap.FAQS.path,
          private: false,
          commonRoutes: true,
          name: "Faqs",
          key: routesMap.FAQS.path,
          belongsToHeader: true,
          element: <Faqs />,
        },
        {
          path: routesMap.HOW_IT_WORKS.path,
          private: false,
          commonRoutes: true,
          name: "How it Works",
          key: routesMap.HOW_IT_WORKS.path,
          belongsToHeader: true,
          element: <SellerHowItWorks />,
        },
        {
          path: routesMap.RETURNS_REFUND_POLICY.path,
          private: false,
          commonRoutes: true,
          name: "Returns & Refund Policy",
          key: routesMap.RETURNS_REFUND_POLICY.path,
          belongsToHeader: false,
          element: <SellerReturnAndRefundPolicy />,
        },
        {
          path: routesMap.CANCELLATION_POLICY.path,
          private: false,
          commonRoutes: true,
          name: "Cancellation Policy",
          key: routesMap.CANCELLATION_POLICY.path,
          belongsToHeader: false,
          element: <SellerCancellationPolicy />,
        },
      ],
    },
  ];
}
