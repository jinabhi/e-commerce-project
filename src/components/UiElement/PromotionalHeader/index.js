import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import routesMap from "../../../routeControl/Promotional";

function Header() {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  }, []);
  return (
    <>
      <header className="mainHeader">
        <nav className={`navbar navbar-expand-xxl fixed-top ${scroll ? 'scrolled' : ''}`}>
          <div className="container">
            <div className="navbar-holder text-center w-100">
              <Link
                className="navbar-brand mx-auto"
                to={routesMap.LANDING_PAGE.path}
              >
                <img
                  src={`${config.IMAGE_URL}/logo.svg`}
                  className="img-fluid"
                  height="112"
                  alt="morluxury"
                />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
