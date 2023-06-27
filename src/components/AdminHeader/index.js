import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
import { logout, selectUserData } from "../../redux/AuthSlice/index.slice";
import { SweetAlert } from "../UiElement";
import {
  AdminAuthServices,
  commonServices,
  ManageSellerServices,
} from "../../services";
import { filterDateFormatter, logger, modalNotification } from "../../utils";
import moduleRoutesMap from "../../routeControl";
import { classicDataTimeFormate } from "../../helpers";

function AdminHeader() {
  const { t } = useTranslation();
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profilePictureUrl, firstName, email } = userData;
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [notificationCount, setNotificationCount] = useState();
  const [sellerData, setSellerRequestData] = useState([]);

  const showSweetAlert = () => {
    setIsAlertVisible(true);
  };

  const accountLogout = async () => {
    try {
      const response = await AdminAuthServices.logoutService();
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        dispatch(logout(navigate, userData?.userRole));
        setLoading(false);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const onConfirmAlert = () => {
    setLoading(true);
    accountLogout();
    setIsAlertVisible(false);
    return true;
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

  const getAdminNotificationCount = async () => {
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

  const getsellerRequestData = async () => {
    try {
      let queryParams = {};
      const res = await ManageSellerServices.manageSeller({ queryParams });
      const { success, data } = res;
      if (success) {
        setSellerRequestData(data.rows);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getAdminNotificationCount();
  }, []);

  const getAdminNotificationMark = async () => {
    try {
      const res = await commonServices.NotificationMarkService();
      const { success, data } = res;
      if (success) {
        setNotificationCount(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAdminNotificationCount();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  /**
   * Work on show time in commented code
   */
  // const totalTimeCount = (createdAt, updatedAt) => {
  //   let startTime = moment(createdAt);
  //   let endTime = moment(updatedAt);
  //   let difference = startTime.from(endTime);
  //   return difference;
  // };

  return (
    <div className="nk-header nk-header-fixed is-light">
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ml-n1">
            <Link
              to="#"
              className="nk-nav-toggle nk-quick-nav-icon"
              data-target="sidebarMenu"
              onClick={(e) => {
                e.preventDefault();
                window.showSideBar("show");
              }}
            >
              <em className="icon ni ni-menu" />
            </Link>
          </div>
          <div className="nk-header-brand d-xl-none">
            <Link
              to={
                userData?.userRole === "staff"
                  ? moduleRoutesMap[userData?.userRole].PRODUCT_REQUEST.path
                  : moduleRoutesMap[userData?.userRole].DASHBOARD.path
              }
              className="logo-link"
            >
              <img
                className="logo-img d-none d-sm-block"
                src="/assets/images/logo_white_header.svg"
                alt="logo"
              />
              <img
                className="logo-img d-block d-sm-none"
                src="/assets/images/logo-icon.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="">
                <Link
                  to={moduleRoutesMap[userData?.userRole].PRODUCT_REQUEST.path}
                  className="nk-quick-nav-icon btn-icon btn-icon-break"
                  data-toggle="tooltip"
                  title={t("text.adminHeader.productRequests")}
                >
                  {notificationCount?.productRequestCount > 0 && (
                    <div className="badge badge-circle badge-primary">
                      {notificationCount?.productRequestCount}
                    </div>
                  )}
                  <em className="ni ni-package-fill" />
                </Link>
              </li>
              {userData?.userRole === "admin" && (
                <li className="">
                  <Link
                    to="#"
                    className="dropdown-toggle nk-quick-nav-icon btn-icon btn-icon-break"
                    data-bs-toggle="dropdown"
                    onClick={(e) => {
                      e.preventDefault();
                      getsellerRequestData();
                    }}
                  >
                    {notificationCount?.sellerRequestCount > 0 && (
                      <div className="badge badge-circle badge-primary">
                        {notificationCount?.sellerRequestCount}
                      </div>
                    )}
                    <em className="ni ni-users" />
                  </Link>
                  <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1">
                    <div className="dropdown-head">
                      <span className="sub-title nk-dropdown-title">
                        {t("text.adminHeader.sellerRequest")}
                      </span>
                    </div>
                    {sellerData.length > 0 ? (
                      <div className="dropdown-body">
                        <div className="nk-notification">
                          {sellerData.map((item, key) => {
                            return (
                              <div
                                className="nk-notification-item dropdown-inner"
                                key={key}
                              >
                                <div className="user-avatar">
                                  <img
                                    src={item?.profilePictureUrl}
                                    alt="user-img"
                                  />
                                </div>
                                <div className="user-info nk-notification-content">
                                  <div className="nk-notification-text">
                                    {` ${item?.firstName} ${item?.lastName} 
                                  ${t("text.adminHeader.message")}`}
                                  </div>
                                  <div className="nk-notification-time">
                                    {filterDateFormatter(
                                      item?.createdAt,
                                      classicDataTimeFormate
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <p className="text-center">
                        {t("text.notification.noRecordFound")}
                      </p>
                    )}

                    <div className="dropdown-foot center">
                      <Link
                        to={
                          moduleRoutesMap[userData?.userRole].MANAGE_SELLERS
                            .path
                        }
                      >
                        {t("text.common.viewAll")}
                      </Link>
                    </div>
                  </div>
                </li>
              )}
              <li className="dropdown notification-dropdown">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    getNotificationData();
                  }}
                  className="dropdown-toggle nk-quick-nav-icon btn-icon btn-icon-break"
                  data-bs-toggle="dropdown"
                >
                  {notificationCount?.unreadCount > 0 && (
                    <div className="badge badge-circle badge-primary">
                      {notificationCount?.unreadCount}
                    </div>
                  )}
                  <em className="ni ni-bell" />
                </Link>
                <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1">
                  <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">
                      {t("text.notification.name")}
                    </span>
                    {notificationCount?.unreadCount > 0 ? (
                      <Link to="#" onClick={getAdminNotificationMark}>
                        {t("text.notification.markAllRead")}
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  {notificationData.length > 0 ? (
                    <>
                      <div className="dropdown-body">
                        <div className="nk-notification">
                          {notificationData.map((item, key) => (
                            <div
                              className="nk-notification-item dropdown-inner"
                              key={key}
                            >
                              <div className="nk-notification-icon">
                                <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                              </div>
                              <div className="nk-notification-content">
                                <div className="nk-notification-text">
                                  {item?.message}
                                </div>
                                {item?.id && (
                                  <div className="nk-notification-time">
                                    {/* {totalTimeCount(
                                  item?.createdAt,
                                  item?.updatedAt
                                )} */}
                                    {filterDateFormatter(
                                      item?.createdAt,
                                      classicDataTimeFormate
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="dropdown-foot center">
                        <Link
                          to={
                            moduleRoutesMap[userData?.userRole].NOTIFICATION
                              .path
                          }
                          onClick={
                            notificationCount?.unreadCount > 0 &&
                            getAdminNotificationMark
                          }
                        >
                          {t("text.common.viewAll")}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="text-center">
                      {t("text.notification.noRecordFound")}
                    </p>
                  )}
                </div>
              </li>
              <li className="dropdown user-dropdown">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <div className="user-toggle">
                    <div className="user-avatar bg-primary sm">
                      <img src={profilePictureUrl} alt="user-img" />
                    </div>
                    <div className="user-info d-none d-md-block">
                      <div className="user-name dropdown-indicator">
                        {firstName}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                  <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card">
                      <div className="user-avatar">
                        <img src={profilePictureUrl} alt="user-img" />
                      </div>
                      <div className="user-info">
                        <span className="lead-text">{firstName}</span>
                        <span className="sub-text">{email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <Link
                          to={moduleRoutesMap[userData?.userRole].PROFILE.path}
                        >
                          <em className="icon ni ni-user-alt" />
                          <span>{t("text.common.myAccount")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={
                            moduleRoutesMap[userData?.userRole].CHANGE_PASSWORD
                              .path
                          }
                        >
                          <em className="icon ni ni-lock-alt-fill" />
                          <span>{t("text.common.changePassword")}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-inner">
                    <ul className="link-list">
                      <li>
                        <Link
                          to="/"
                          onClick={(e) => {
                            e.preventDefault();
                            showSweetAlert();
                          }}
                        >
                          <em className="icon ni ni-signout" />
                          <span>{t("text.common.logout")}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <SweetAlert
                  reverseButtons
                  title={t("text.common.wantToLogout")}
                  text={t("text.common.areYouSure")}
                  show={isAlertVisible}
                  icon="warning"
                  showCancelButton
                  cancelButtonText={t("text.common.no")}
                  confirmButtonText={t("text.common.yes")}
                  setIsAlertVisible={setIsAlertVisible}
                  showLoaderOnConfirm
                  loading={loading}
                  onConfirmAlert={onConfirmAlert}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
