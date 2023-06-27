import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Sidebar, AdminHeader, Footer } from "../../components";
import { selectUserData } from "../../redux/AuthSlice/index.slice";
import { moduleRoutesList } from "../../routes/index";

function AdminPrivateLayout() {
  const userData = useSelector(selectUserData);
  let routeList = moduleRoutesList();

  useEffect(() => {
    document.querySelector("body").classList.add("dark-mode");
  });

  return (
    <div className="nk-body bg-lighter npc-general has-sidebar dark-mode">
      <div className="nk-app-root">
        <div className="nk-main">
          <Sidebar routes={routeList[userData?.userRole]} />
          <div className="nk-wrap">
            <AdminHeader />
            <div className="nk-content orderDetails ">
              <div className="container-fluid">
                <div className="nk-content-inner">
                  <div className="nk-content-body">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <div
            className="overlay-container"
            onClick={() => {
              window.showSideBar("hide");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminPrivateLayout;
