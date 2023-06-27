import {
  AboutUs,
  Accessibility,
  CancellationPolicy,
  EditTermsAndCondition,
  FAQs,
  HowItWorks,
  ManageCms,
  PrivacyPolicy,
  ReturnAndRefundPolicy,
} from "../../../pages";
import routesMap from "../../../routeControl/adminRoutes";

export default function route() {
  return [
    {
      path: routesMap.MANAGE_CMS.path,
      private: true,
      name: "Manage CMS",
      key: routesMap.MANAGE_CMS.path,
      belongsToSidebar: true,
      icon: routesMap.MANAGE_CMS.icon,
      element: <ManageCms />,
    },
    {
      path: `${routesMap.EDIT_TERMS_CONDITION.path}/:id`,
      private: true,
      key: `${routesMap.EDIT_TERMS_CONDITION.path}/:id`,
      belongsToSidebar: false,
      element: <EditTermsAndCondition />,
    },
    {
      path: `${routesMap.CANCELLATION_POLICY.path}/:id`,
      private: true,
      key: `${routesMap.CANCELLATION_POLICY.path}/:id`,
      belongsToSidebar: false,
      element: <CancellationPolicy />,
    },
    {
      path: `${routesMap.RETURN_AND_REFUND_POLICY.path}/:id`,
      private: true,
      key: `${routesMap.RETURN_AND_REFUND_POLICY.path}/:id`,
      belongsToSidebar: false,
      element: <ReturnAndRefundPolicy />,
    },
    {
      path: `${routesMap.HOW_IT_WORKS.path}/:id`,
      private: true,
      key: `${routesMap.HOW_IT_WORKS.path}/:id`,
      belongsToSidebar: false,
      element: <HowItWorks />,
    },
    {
      path: `${routesMap.PRIVACY_POLICY.path}/:id`,
      private: true,
      key: `${routesMap.PRIVACY_POLICY.path}/:id`,
      belongsToSidebar: false,
      element: <PrivacyPolicy />,
    },
    {
      path: `${routesMap.ABOUT_US.path}/:id`,
      private: true,
      key: `${routesMap.ABOUT_US.path}/:id`,
      belongsToSidebar: false,
      element: <AboutUs />,
    },
    {
      path: routesMap.FAQs.path,
      private: true,
      key: routesMap.FAQs.path,
      belongsToSidebar: false,
      element: <FAQs />,
    },
    {
      path: `${routesMap.ACCESSIBILITY.path}/:id`,
      private: true,
      key: `${routesMap.ACCESSIBILITY.path}/:id`,
      belongsToSidebar: false,
      element: <Accessibility />,
    },
  ];
}
