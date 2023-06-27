import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header, PromotionalFooter } from "../../components";
import { routesList } from "../../routes";

import "../../styles/scss/promotional/frontend.scss";

function PromotionalPublicLayout() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  useEffect(() => {
    let pathPattern = /[\/]$/g;
    if (pathPattern.test(pathname)) {
      let navigatePath = pathname.replace(pathPattern, "");
      navigatePath = navigatePath.replace(/\/{2,}/g, "/");
      navigate(navigatePath, { replace: true });
    }
  }, [pathname]);

  let path = pathname.replace("/", "");
  path = path === "" ? "login" : path;
  path = path.includes("reset-password") ? "reset-password" : path;

  let pageClass = {
    home: {
      class: "home",
      title: "MorLuxury - Buy American Luxury Beauty & Skin Care Products",
      description:
        "Your go-to brand for shopping authentic American luxury beauty & skin care products. Get skincare products at pocket-friendly prices; visit MorLuxury now!",
    },
    about: {
      class: "about",
      title: "Learn Out More About Us | MorLuxury",
      description:
        "Find out more about MorLuxury, one of the leading platforms in India that help Indians afford to buy authentic American luxury beauty & skin care products.",
    },
    "privacy-policy": {
      class: "privacy-policy",
      title: "Find Privacy Policy of MorLuxury | Luxury American Brand Seller",
      description:
        "Learn how your personal information is collected, used, and shared and the privacy of customers is protected. Read the privacy policy of MorLuxury now!",
    },
    faq: {
      class: "faq",
      title: "Frequently Asked Questions | MorLuxury",
      description:
        "Get answers to all the frequently asked questions related to American luxury cosmetic brands and all the other queries you've in mind. Read FAQs here now!",
    },
    "terms-of-use": {
      class: "privacy-policy",
      title: "Terms of Use | MorLuxury",
      description:
        "Find here information on the terms of use, copyright, trademarks, content submissions & product information of MorLuxury. Read information on terms of use!",
    },
    accessibility: {
      class: "privacy-policy",
      title: "Find Information on Accessibility | MorLuxury",
      description:
        "Learn more about the accessibility and usability of the website and mobile platform of MorLuxury for all guests and people with disability. Read it all now!",
    },
    "contact-us": {
      class: "",
      title: "Contact MorLuxury for American Beauty & Skin Care Products",
      description:
        "Get in touch with the qualified team of MorLuxury for more details regarding American Luxury Beauty and Skin Care Products. Find contact information here!",
    },
  };
  path = pathname.replace("/", "");
  path = path === "" ? "home" : path;

  useEffect(() => {
    let metaDescription = document.querySelector('meta[name="description"]');
    let OgMetaDescription = document.querySelector(
      'meta[name="og:description"]'
    );

    let metaTitle = document.querySelector('meta[name="title"]');
    let OgMetaTitle = document.querySelector('meta[name="og:title"]');
    if (
      OgMetaDescription &&
      metaDescription &&
      pageClass?.[path]?.description
    ) {
      metaDescription.setAttribute("content", pageClass?.[path]?.description);
      OgMetaDescription.setAttribute("content", pageClass?.[path]?.description);
    }
    if (OgMetaTitle && metaTitle && pageClass?.[path]?.title) {
      metaTitle.setAttribute("content", pageClass?.[path]?.title);
      OgMetaTitle.setAttribute("content", pageClass?.[path]?.title);
    }
  }, [location, path]);
  return (
    <>
      <main className={`main-content ${pageClass?.[path]?.class ?? ""}`}>
        <Header />
        <Outlet />
      </main>
      <PromotionalFooter routes={routesList()} />
    </>
  );
}

export default PromotionalPublicLayout;
