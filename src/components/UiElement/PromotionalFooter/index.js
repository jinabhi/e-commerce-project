import React, { useEffect, useState } from "react";

// import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
// import config from "../../../config";
// import routesMap from "../../../routeControl";
import { getFooterLink } from "../../../utils";
import ImageElement from "../ImageElement";
import routesMap from "../../../routeControl/promotionalRoutes";

function Footer({ routes }) {
  const footerLink = getFooterLink(routes);
  const location = useLocation();
  const [currentActive, setCurrentActive] = useState(location.pathname);

  useEffect(() => {
    setCurrentActive(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <footer>
        <div className="container">
          <div className="footersec d-flex ">
            <Link to="/" className="footersec-logo">
              <ImageElement source="logo-footer.svg" alt="" />
            </Link>
            <ul className="footersec-links d-flex mb-0">
              {footerLink.map((item, key) => {
                return (
                  <li key={key}>
                    <Link
                      to={item.path}
                      className={item.path === currentActive && "active"}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              {/* <li>
                <a href={config.REDIRECTION_LINK}>
                  {t("text.common.wantToSell")}
                </a>
              </li> */}
            </ul>
            <ul className="footersec-links socialicons d-flex mb-0">
              <li>
                <a
                  href="https://www.facebook.com/morluxury777"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3"
                >
                  <span className="icon-fb icomoon" />
                </a>
              </li>
              {/* <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="px-3"
                >
                  <span className="icon-insta icomoon" />
                </a>
              </li> */}
              <li>
                <a
                  href="https://www.instagram.com/mluxury777/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3"
                >
                  <span className="icon-twitter icomoon" />
                </a>
              </li>
            </ul>
          </div>
          <div className="footersec-copyright">
            ©2022 all right reserved.
            {/* <a href="mailto:info@mor.luxury"> Contact Us</a> */}
            <Link to={routesMap.CONTACT_US.path}> Contact Us</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
