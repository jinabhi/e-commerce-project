import {
  Faq,
  LandingPage,
  PromotionalAboutUs,
  PromotionalAccessibility,
  PromotionalContactUs,
  PromotionalGetEarlyAccess,
  PromotionalPrivacyPolicy,
  PromotionalTermsConditions,
} from "../../pages";
import routesMap from "../../routeControl/promotionalRoutes";

export default function route(t) {
  return [
    {
      path: "/",
      name: t("text.common.home"),
      key: routesMap.LANDING_PAGE.path,
      private: false,
      belongsToFooter: false,
      element: <LandingPage />,
    },
    {
      path: routesMap.ABOUT_US.path,
      name: t("text.common.aboutUs"),
      key: routesMap.ABOUT_US.path,
      private: false,
      belongsToFooter: true,
      element: <PromotionalAboutUs />,
    },
    {
      path: routesMap.PRIVACY_POLICY.path,
      name: t("text.common.privacyPolicy"),
      key: routesMap.PRIVACY_POLICY.path,
      private: false,
      belongsToFooter: true,
      element: <PromotionalPrivacyPolicy />,
    },
    {
      path: routesMap.FAQ.path,
      name: t("text.common.faq"),
      key: routesMap.FAQ.path,
      private: false,
      belongsToFooter: true,
      element: <Faq />,
    },
    {
      path: routesMap.TERMS_CONDITIONS.path,
      name: t("text.common.termsConditions"),
      key: routesMap.TERMS_CONDITIONS.path,
      private: false,
      belongsToFooter: true,
      element: <PromotionalTermsConditions />,
    },
    {
      path: routesMap.ACCESSIBILITY.path,
      name: t("text.common.accessibility"),
      key: routesMap.ACCESSIBILITY.path,
      private: false,
      belongsToFooter: true,
      element: <PromotionalAccessibility />,
    },
    {
      path: routesMap.CONTACT_US.path,
      name: t("text.contactPromotional.metaTitle"),
      key: routesMap.CONTACT_US.path,
      private: false,
      belongsToFooter: false,
      element: <PromotionalContactUs />,
    },
    {
      path: routesMap.GET_EARLY_ACCESS.path,
      name: t("text.common.accessibility"),
      key: routesMap.GET_EARLY_ACCESS.path,
      private: false,
      belongsToFooter: false,
      element: <PromotionalGetEarlyAccess />,
    },
  ];
}
