import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
  MANAGE_CMS: {
    path: "/",
  },
  CONTACT_US: {
    path: `${baseRoutes.sellerBaseRoutes}/contact-us`,
  },
  TERMS_CONDITIONS: {
    path: `${baseRoutes.sellerBaseRoutes}/terms-conditions`,
  },
  PRIVACY_POLICY: {
    path: `${baseRoutes.sellerBaseRoutes}/privacy-policy`,
  },
  ABOUT_US: {
    path: `${baseRoutes.sellerBaseRoutes}/about-us`,
  },
  FAQS: {
    path: `${baseRoutes.sellerBaseRoutes}/faqs`,
  },
  HOW_IT_WORKS: {
    path: `${baseRoutes.sellerBaseRoutes}/how-it-works`,
  },

  RETURNS_REFUND_POLICY: {
    path: `${baseRoutes.sellerBaseRoutes}/returns-refund-policy`,
  },
  CANCELLATION_POLICY: {
    path: `${baseRoutes.sellerBaseRoutes}/cancellation-policy`,
  },
};

export default accessRoute;
