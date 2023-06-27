import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import moduleRoutesMap from "../../routeControl";
import {
  getSidebarKey,
  selectUserData,
  updateSidebarKey,
} from "../../redux/AuthSlice/index.slice";
import { getSideBarData } from "../../utils";
// import { Sider, Header } from "..";

function Sidebar({ routes }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const sidebarKey = useSelector(getSidebarKey);
  const userData = useSelector(selectUserData);
  const [state, setState] = useState({
    collapsed: false,
    menu: [],
    current: location.pathname,
  });
  const [currentActive, setCurrentActive] = useState(location.pathname);
  useEffect(() => {
    if (routes && routes instanceof Array) {
      setState({ ...state, menu: getSideBarData(routes) });
    }
  }, [routes]);

  useEffect(() => {
    setCurrentActive(location.pathname);
  }, [location.pathname]);

  let menuLink = document.querySelectorAll(
    ".nk-menu-link:not(.nk-menu-toggle)"
  );
  let sideBar = document.querySelector(".nk-sidebar");
  let overlayContainer = document.querySelector(".overlay-container");
  menuLink.forEach((link) => {
    link.addEventListener("click", function () {
      sideBar.classList.remove("nk-sidebar-active");
      overlayContainer.classList.remove("sidebar-overlay");
    });
  });

  // const toggleMenu = (e) => {
  //   console.log(e.target.closest("ul").clientHeight, "======");
  //   document.querySelectorAll(".nk-menu > li").forEach((item) => {
  //     if (item.classList.contains("active")) {
  //       item.classList.remove("active");
  //     }
  //   });
  //   e.target.parentNode.classList.toggle("active");
  // };

  return (
    <div
      className="nk-sidebar nk-sidebar-fixed is-light"
      data-content="sidebarMenu"
      id="admin-sidebar"
    >
      <div className="nk-sidebar-element nk-sidebar-head">
        <div className="nk-sidebar-brand">
          <Link
            to={
              userData?.userRole === "staff"
                ? moduleRoutesMap[userData?.userRole].PRODUCT_REQUEST.path
                : moduleRoutesMap[userData?.userRole].DASHBOARD.path
            }
            className="logo-link nk-sidebar-logo"
          >
            <img
              className="logo-img"
              src="/assets/images/logo_white_header.svg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="nk-menu-trigger mr-n2">
          <Link
            to="#"
            className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
            data-target="sidebarMenu"
            onClick={(e) => {
              e.preventDefault();
              window.showSideBar("hide");
            }}
          >
            <em className="icon ni ni-arrow-left" />
          </Link>
        </div>
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-content">
          <div className="nk-sidebar-menu" data-simplebar>
            <ul className="nk-menu">
              <Accordion
                defaultActiveKey={
                  userData?.userRole === "admin" ? sidebarKey : [0]
                }
              >
                {state.menu.map((item, i) => {
                  let routeData;
                  if (item.children) {
                    routeData = (
                      <React.Fragment key={item.label}>
                        <Accordion.Item
                          as="li"
                          className={`nk-menu-item ${
                            sidebarKey === i ? "active" : ""
                          }`}
                          eventKey={i}
                        >
                          <Accordion.Header>
                            <Link
                              to="#"
                              onClick={(e) => e.preventDefault()}
                              className="nk-menu-link nk-menu-toggle"
                            >
                              {item.icon}
                              <span className="nk-menu-text">{item.label}</span>
                            </Link>
                          </Accordion.Header>
                          <Accordion.Body className="pb-0">
                            <ul className="nk-menu-sub">
                              {item.children.map((child, key) => {
                                if (child.path === currentActive) {
                                  dispatch(updateSidebarKey(i));
                                }
                                return (
                                  <>
                                    <li
                                      className={`nk-menu-item ${
                                        child.path === currentActive
                                          ? "active"
                                          : ""
                                      }`}
                                      key={key}
                                    >
                                      <Link
                                        to={child.path}
                                        className="nk-menu-link"
                                        // onClick={(e) => toggleMenu(e)}
                                      >
                                        {child.icon}
                                        <span className="nk-menu-text">
                                          {child.label}
                                        </span>
                                      </Link>
                                    </li>
                                  </>
                                );
                              })}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </React.Fragment>
                    );
                  } else {
                    if (item.path === currentActive) {
                      dispatch(updateSidebarKey(0));
                    }
                    routeData = (
                      <Accordion.Item
                        as="li"
                        eventKey={i}
                        className={`nk-menu-item ${
                          item.path === currentActive ? "active" : ""
                        }`}
                      >
                        <Accordion.Button className="nk-menu-link-normal">
                          <Link
                            to={item.path}
                            className="nk-menu-link"
                            // onClick={(e) => toggleMenu(e)}
                          >
                            {item.icon}
                            <span className="nk-menu-text">{item.label}</span>
                          </Link>
                        </Accordion.Button>
                      </Accordion.Item>
                    );
                  }
                  return routeData;
                })}
              </Accordion>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
