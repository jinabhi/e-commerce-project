import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import config from "../../config";

function AdminPublicLayout() {
  const location = useLocation();
  const { pathname } = location;

  let path =
    pathname.search("admin") >= 0
      ? pathname.replace("/admin/", "")
      : pathname.replace("/staff/", "");
  path = path === "" || path === "/admin" || path === "/staff" ? "login" : path;
  path = pathname.search("forget-password") >= 0 ? "forget-password" : path;
  path = pathname.search("reset-password") >= 0 ? "reset-password" : path;

  const pageData = {
    login: {
      image: `login_bg.png`,
    },
    "forget-password": {
      image: `ic_forgot_password.png`,
    },
    "reset-password": {
      image: `ic_forgot_password.png`,
    },
  };

  return (
    <div className="nk-body bg-white npc-default pg-auth dark-mode">
      <div className="nk-app-root">
        <div className="nk-main ">
          <div className="nk-wrap nk-wrap-nosidebar">
            <div className="nk-content ">
              <div className="nk-split nk-split-page nk-split-md">
                <div className="nk-split-content nk-split-stretch bg-light d-flex toggle-break-lg toggle-slide toggle-slide-right">
                  <div className="w-100  p-3 p-sm-5 m-auto">
                    <div className="nk-feature nk-feature-center">
                      <div className="nk-feature-img text-center">
                        <img
                          className="round"
                          src={`${config.ADMIN_IMAGE_URL}/${pageData?.[path]?.image}`}
                          alt="login"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white pg-auth-form">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPublicLayout;
