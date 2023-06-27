import React from "react";

export const LandingPage = React.lazy(() => import("./LandingPage/index.page"));
export const PromotionalAboutUs = React.lazy(() =>
  import("./AboutUs/index.page")
);
export const PromotionalPrivacyPolicy = React.lazy(() =>
  import("./PrivacyPolicy/index.page")
);
export const Faq = React.lazy(() => import("./Faq/index.page"));
export const PromotionalTermsConditions = React.lazy(() =>
  import("./termsConditions/index.page")
);
export const PromotionalAccessibility = React.lazy(() =>
  import("./accessibility/index.page")
);
export const PromotionalGetEarlyAccess = React.lazy(() =>
  import("./GetEarlyAccess/index.page")
);
export const PromotionalContactUs = React.lazy(() =>
  import("./ContactUs/index.page")
);
