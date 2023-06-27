import { baseRoutes } from "../../helpers/baseRoutes";

const accessRoute = {
  LANDING_PAGE: {
    path: baseRoutes.promotionalBaseRoutes,
  },
  ABOUT_US: {
    path: `${baseRoutes.promotionalBaseRoutes}about`,
  },
  PRIVACY_POLICY: {
    path: `${baseRoutes.promotionalBaseRoutes}privacy-policy`,
  },
  FAQ: {
    path: `${baseRoutes.promotionalBaseRoutes}faq`,
  },
  TERMS_CONDITIONS: {
    path: `${baseRoutes.promotionalBaseRoutes}terms-of-use`,
  },
  ACCESSIBILITY: {
    path: `${baseRoutes.promotionalBaseRoutes}accessibility`,
  },
  GET_EARLY_ACCESS: {
    path: `${baseRoutes.promotionalBaseRoutes}get-early-access`,
  },
  CONTACT_US: {
    path: `${baseRoutes.promotionalBaseRoutes}contact-us`,
  },
};

export default accessRoute;
