import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import config from "../../config";
import { logout, selectUserData } from "../../redux/AuthSlice/index.slice";
import routesMap from "../../routeControl/sellerRoutes";
import { routesList } from "../../routes";
import { commonServices, SellerAuthServices } from "../../services";
import { getHeaderData, logger, modalNotification } from "../../utils";
import { CommonButton, ModalComponent } from "../UiElement";

function SellerHeader({ setState }) {
  const { t } = useTranslation();
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const headerData = getHeaderData(routesList());
  const [showSidebar, setShowSidebar] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [notificationCount, setNotificationCount] = useState();

  const showSweetAlert = () => {
    setIsAlertVisible(true);
  };

  const getNotificationData = async () => {
    try {
      let queryParams = {};
      const res = await commonServices.getNotificationList({ queryParams });
      const { success, data } = res;
      if (success) {
        setNotificationData(data.rows);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getSellerNotificationCount = async () => {
    try {
      const res = await commonServices.getNotificationCount();
      const { success, data } = res;
      if (success) {
        setNotificationCount(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  const accountLogout = async () => {
    try {
      const response = await SellerAuthServices.logoutService();
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        dispatch(logout(navigate, userData.userRole));
        setLoading(false);
        setIsAlertVisible(false);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  const handleClickOnSupport = (e) => {
    e.preventDefault();
    setState("dropOpen");
  };

  useEffect(() => {
    getNotificationData();
    getSellerNotificationCount();
    const interval = setInterval(() => {
      getSellerNotificationCount();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let navbar = document.querySelector(".navbar").clientHeight;
      document.querySelector(".mainHeader").style.paddingTop = `${navbar}px`;
    }, 300);
  }, []);

  return (
    <>
      <header className="mainHeader">
        <nav className="navbar navbar-expand-xxl navbar-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={routesMap.DASHBOARD.path}>
              <img
                src={`${config.IMAGE_URL}/logo-header.svg`}
                className="img-fluid"
                alt="morluxury"
              />
            </Link>
            <div
              className={
                !showSidebar ? "navbar-collapse" : "navbar-collapse menuShow"
              }
              id="navbarSupportedContent"
            >
              <a
                className="menuClose d-block d-xxl-none"
                href="#"
                onClick={() =>
                  !showSidebar ? setShowSidebar(true) : setShowSidebar(false)
                }
              >
                <em className="icon-close" />
              </a>

              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar_menu">
                {headerData.map((item, i) => {
                  let routeData;
                  if (item.children) {
                    routeData = (
                      <>
                        <li
                          className="nav-item dropdown dropdown-custom"
                          key={i}
                        >
                          <a
                            className="nav-link dropdown-toggle "
                            href="#"
                            id="navbarDropdown"
                            data-bs-toggle="dropdown"
                            onClick={handleClickOnSupport}
                          >
                            {" "}
                            {item.label}
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-center"
                            aria-labelledby="navbarDropdown"
                          >
                            {item.children.map((childItem, key) => {
                              return (
                                <>
                                  {" "}
                                  <li key={key}>
                                    <Link
                                      className={`dropdown-item ${
                                        childItem.path === pathname
                                          ? "active"
                                          : ""
                                      }`}
                                      to={childItem.path}
                                      onClick={() => {
                                        setShowSidebar(!showSidebar);
                                        setState("");
                                      }}
                                    >
                                      {childItem.label}
                                    </Link>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </li>
                      </>
                    );
                  } else {
                    routeData = (
                      <li className="nav-item" key={item.label}>
                        <Link
                          className={`nav-link ${
                            item.path === pathname ? "active" : ""
                          }`}
                          to={item.path}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  return routeData;
                })}
                {/* Older Header  */}
                {/* {headerData.map((item, key) => {
                  return (
                    <li className="nav-item" key={key}>
                      <Link
                        className={`nav-link ${
                          item.path === pathname ? "active" : ""
                        }`}
                        to={item.path}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })} */}

                {/* <li className="nav-item">
                  <a
                    className="nav-link <?php if($currentPage=='Dashboard') {echo'active';} ?>"
                    href="<?php echo BASE_URL ?>/dashboard.php"
                  >
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link <?php if($currentPage=='My Store') {echo'active';} ?>"
                    href="<?php echo BASE_URL ?>/my-store.php"
                  >
                    My Store
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link <?php if($currentPage=='Orders') {echo'active';} ?>"
                    href="<?php echo BASE_URL ?>/orders.php"
                  >
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link <?php if($currentPage=='Products') {echo'active';} ?>"
                    href="<?php echo BASE_URL ?>/products.php"
                  >
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link <?php if($currentPage=='Discounts Offers') {echo'active';} ?>"
                    href="<?php echo BASE_URL ?>/discounts-offers.php"
                  >
                    Discounts/Offers
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link <?php if($currentPage=='Earnings') {echo'active';} ?>"
                    href="<?php echo BASE_URL ?>/earnings.php"
                  >
                    Earnings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link <?php if($currentPage=='Mor Inventory') {echo'active';} ?>"
                    href="<?php echo BASE_URL ?>/mor-inventory.php"
                  >
                    Mor Inventory
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link <?php if($currentPage=='Ratings & Reviews') {echo'active';} ?>"
                    href="<?php echo BASE_URL ?>/reviews-ratings.php"
                  >
                    Ratings & Reviews
                  </a>
                </li> */}
                {/* <li className="nav-item dropdown dropdown-custom">
                  <a
                    className="nav-link dropdown-toggle <?php if(($currentPage=='Contact Us') || ($currentPage=='Terms & Conditions') || ($currentPage=='Privacy Policy') || ($currentPage=='About Us') || ($currentPage=='FAQs') || ($currentPage=='How it Works')) {echo'active';} ?>"
                    href="javascript:void(0)"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                  >
                    {" "}
                    Support{" "}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-center"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item <?php if($currentPage=='Contact Us') {echo'active';} ?>"
                        href="<?php echo BASE_URL ?>/contact-us.php"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item <?php if($currentPage=='Terms & Conditions') {echo'active';} ?>"
                        href="<?php echo BASE_URL ?>/terms-conditions.php"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item <?php if($currentPage=='Privacy Policy') {echo'active';} ?>"
                        href="<?php echo BASE_URL ?>/privacy-policy.php"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item <?php if($currentPage=='About Us') {echo'active';} ?>"
                        href="<?php echo BASE_URL ?>/about-us.php"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item <?php if($currentPage=='FAQs') {echo'active';} ?>"
                        href="<?php echo BASE_URL ?>/faqs.php"
                      >
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item <?php if($currentPage=='How it Works') {echo'active';} ?>"
                        href="<?php echo BASE_URL ?>/how-it-works.php"
                      >
                        How it Works
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
            <div className="float-right rightBlock">
              <ul className="d-flex mb-0 list-unstyled align-items-center">
                <li className="rightBlock_item">
                  <button
                    className="navbar-toggler sidebarToggle"
                    onClick={() =>
                      !showSidebar
                        ? setShowSidebar(true)
                        : setShowSidebar(false)
                    }
                    type="button"
                  >
                    <span className="line" />
                    <span className="line" />
                    <span className="line" />
                  </button>
                </li>
                <li className="rightBlock_item dropdown dropdown-custom dropdown-notification">
                  <Link
                    className="dropdown-toggle active"
                    href="javascript:void(0)"
                    id="notificationDropdown"
                    data-bs-toggle="dropdown"
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      getNotificationData();
                    }}
                  >
                    {notificationCount?.unreadCount > 0 && (
                      <span className="badge-count">
                        {notificationCount?.unreadCount}
                      </span>
                    )}

                    <em className="icon-notification" />
                  </Link>

                  <div
                    className="dropdown-menu dropdown-menu-lg dropdown-menu-end"
                    aria-labelledby="notificationDropdown"
                  >
                    <div className="dropdownNotify">
                      <h6>
                        ( {notificationCount?.unreadCount}{" "}
                        {t("text.sellerNotification.notification")} )
                      </h6>
                      <div className="dropdownNotify_list">
                        {notificationData?.length > 0 ? (
                          <>
                            {notificationData.map((notify, key) => (
                              <a
                                href="javascript:void(0)"
                                className="d-flex align-items-center dropdownNotify_item"
                                key={key}
                              >
                                <div className="flex-grow-1 overflow-hidden">
                                  <h5 className="mt-0 text-truncate">
                                    {notify?.title}
                                  </h5>
                                  <p className="mb-0">{notify?.message}</p>
                                </div>
                              </a>
                            ))}
                          </>
                        ) : (
                          <p
                            className="text-center"
                            style={{ color: "#555555" }}
                          >
                            {t("text.notification.noRecordFound")}
                          </p>
                        )}
                      </div>
                      <div className="text-end seeAll">
                        <Link to={routesMap.NOTIFICATION.path}>
                          {t("text.sellerNotification.seeAllNotifications")}
                          <em className="icon-chevron-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="rightBlock_item dropdown dropdown-custom">
                  <a
                    className="dropdown-toggle dropdown-toggle-user"
                    href="javascript:void(0)"
                    id="notificationDropdown"
                    data-bs-toggle="dropdown"
                  >
                    <img src={userData?.profilePictureUrl} alt="user-profile" />{" "}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-center"
                    aria-labelledby="notificationDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={routesMap.SELLER_PROFILE.path}
                      >
                        {t("text.sellerProfile.title")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={routesMap.CHANGE_PASSWORD.path}
                      >
                        {t("text.common.changePassword")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={(e) => {
                          e.preventDefault();
                          showSweetAlert();
                        }}
                        className="dropdown-item"
                      >
                        <em className="icon ni ni-signout" />
                        <span>{t("text.common.logout")}</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <ModalComponent
        show={isAlertVisible}
        onHandleCancel={() => {
          setIsAlertVisible(false);
        }}
        closeButton={false}
      >
        <CommonButton
          type="button"
          className="btn-close"
          onClick={() => {
            setIsAlertVisible(false);
          }}
        >
          {/* <span className="icon-close" /> */}
        </CommonButton>
        <h2 className="mt-0 text-white">{t("text.common.logoutMessage")}</h2>
        <p>{t("text.common.areYouSure")}</p>
        <div className="mt-4">
          <CommonButton
            type="submit"
            htmlType="submit"
            loading={loading}
            className="btn btn-primary-outline me-3 w150"
            data-bs-dismiss="modal"
            onClick={() => {
              setIsAlertVisible(false);
            }}
          >
            {t("text.common.no")}
          </CommonButton>
          <CommonButton
            type="submit"
            htmlType="submit"
            className="btn btn-gradiant w150"
            loading={loading}
            onClick={accountLogout}
          >
            {t("text.common.yes")}
          </CommonButton>
        </div>
      </ModalComponent>
    </>
  );
}

export default SellerHeader;
