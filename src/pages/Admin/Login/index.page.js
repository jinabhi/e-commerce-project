import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminLoginForm, MetaTags, textFormatter } from "../../../components";
import config from "../../../config";
import {
  getAdminAuthData,
  getStaffAuthData,
  login,
  updateAdminAuthData,
  updateStaffAuthData,
} from "../../../redux/AuthSlice/index.slice";
import moduleRoutesMap from "../../../routeControl";
import { AdminAuthServices } from "../../../services";
import {
  logger,
  modalNotification,
  setLocalStorageToken,
} from "../../../utils";

function AdminLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  let adminAuthData = useSelector(getAdminAuthData);
  let staffAuthData = useSelector(getStaffAuthData);
  const navigate = useNavigate();
  useEffect(() => {
    document.querySelector("body").classList.add("dark-mode");
  }, []);

  let user = "";

  if (location.pathname.search("admin") >= 0) {
    user = "admin";
  } else {
    user = "staff";
  }

  let authData;
  if (user === "admin") {
    authData = adminAuthData;
  } else {
    authData = staffAuthData;
  }

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      const bodyData = { ...value };
      delete bodyData.rememberMe;
      bodyData.userRole = user;
      const res = await AdminAuthServices.userLogin(bodyData);
      const { data, success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        let resData = { ...data };
        resData.rememberMe = value.rememberMe;
        dispatch(login(resData));
        setLocalStorageToken(res?.data?.token);
        if (user === "admin") {
          if (value.rememberMe) {
            bodyData.rememberMe = value.rememberMe;
            dispatch(updateAdminAuthData(bodyData));
          } else {
            dispatch(updateAdminAuthData({}));
          }
        }

        if (user === "staff") {
          if (value.rememberMe) {
            bodyData.rememberMe = value.rememberMe;
            dispatch(updateStaffAuthData(bodyData));
          } else {
            dispatch(updateStaffAuthData({}));
          }
        }
        if (user === "admin") {
          navigate(moduleRoutesMap[resData.userRole].DASHBOARD.path);
        } else {
          navigate(moduleRoutesMap[resData.userRole].PRODUCT_REQUEST.path);
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  return (
    <>
      <MetaTags title={t("text.adminLogin.loginTitle")} />
      <div className="nk-block nk-block-middle nk-auth-body">
        <div className="brand-logo pb-4 text-center">
          <Link to={moduleRoutesMap[user].LOGIN.path} className="logo-link">
            <img
              className="logo-light logo-img-xl"
              src={`${config.ADMIN_IMAGE_URL}/logo_white.svg`}
              alt="logo"
            />
          </Link>
        </div>
        <div className="nk-block-head text-center mb-4">
          <div className="nk-block-head-content">
            <h5 className="nk-block-title">
              {t("text.adminLogin.adminWelcome")}
              {` ${textFormatter(user)}`}
            </h5>
            <div className="nk-block-des">
              <p>{t("text.adminLogin.adminLoginDescription")}</p>
            </div>
          </div>
        </div>
        <AdminLoginForm
          user={user}
          loading={loading}
          onSubmit={onSubmit}
          authData={authData}
        />
      </div>
    </>
  );
}

export default AdminLogin;
