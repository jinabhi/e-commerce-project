import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import config from "../../config";

function SellerPublicLayout() {
  const location = useLocation();
  const { pathname } = location;

  let path = pathname.replace("/brand/", "");
  path = path === "/brand" ? "login" : path;
  path = path.includes("reset-password") ? "reset-password" : path;
  const param = useParams();

  const pageData = {
    login: {
      image: `logo.svg`,
    },
    "forgot-password": {
      image: `forgot-img.svg`,
    },
    "otp-verification": {
      image: `otp-img.svg`,
    },
    register: {
      image: `logo.svg`,
    },
    "reset-password": {
      image: `reset-img.svg`,
    },
    "change-password": {
      image: `reset-img.svg`,
    },
  };

  const imagesClass =
    pathname === "/change-password"
      ? "authPage_left-img passwordImg"
      : pathname === `/reset-password/${param.token}`
      ? "authPage_left-img passwordImg"
      : pathname === "/forgot-password"
      ? "authPage_left-img"
      : pathname === "/otp-verification"
      ? "authPage_left-img"
      : "authPage_left-logo";

  return (
    <main className="main-content">
      <section className="authPage vh-100">
        <div className="row g-0 h-100">
          <div className="col-lg-6 col-xxl-7 d-none d-lg-block">
            <div className="d-flex justify-content-center align-items-center h-100 authPage_left">
              <div className="d-flex justify-content-center align-items-center h-100">
                <img
                  src={`${config.IMAGE_URL}/${pageData?.[path]?.image}`}
                  className={`img-fluid ${imagesClass}`}
                  alt="morluxury"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-5 authPage_right">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}

export default SellerPublicLayout;
