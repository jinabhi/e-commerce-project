import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MetaTags,
  SellerLoginForm,
  ModalComponent,
  CommonButton,
} from "../../../components";
import {
  login,
  getSellerAuthData,
  updateSellerAuthData,
  updateSellerRegisterData,
} from "../../../redux/AuthSlice/index.slice";
import { SellerAuthServices } from "../../../services";
import {
  logger,
  modalNotification,
  setLocalStorageToken,
} from "../../../utils";
import routesControl from "../../../routeControl/sellerRoutes";

function SellerLogin() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState({ type: "", msg: "" });
  const [checked, setChecked] = useState(false);
  const sellerAuthData = useSelector(getSellerAuthData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setChecked(sellerAuthData?.rememberMe);
  }, []);
  const onSubmit = async (value) => {
    setLoading(true);
    try {
      const bodyData = { ...value };
      delete bodyData.rememberMe;
      const res = await SellerAuthServices.sellerLogin(bodyData);
      const { data, success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        let resData = { ...data };
        resData.rememberMe = checked;
        resData.userRole = "seller";
        dispatch(updateSellerRegisterData(data));
        if (data.status === "pendingApproval") {
          setShow(true);
          setErrMsg({ type: "pending", msg: message });
        } else if (data.status === "rejected") {
          navigate(routesControl.REGISTER.path, {
            state: { defaultStep: "two" },
          });
        } else if (data.verificationStatus === null) {
          navigate(routesControl.OTP_VERIFICATION.path);
        } else if (data.verificationStatus === "otpVerified") {
          navigate(routesControl.REGISTER.path, {
            state: { defaultStep: "two" },
          });
        } else if (data.verificationStatus === "userDetail") {
          navigate(routesControl.REGISTER.path, {
            state: { defaultStep: "three" },
          });
        } else if (data.status === "inactive") {
          setShow(true);
          setErrMsg({ type: "inactive", msg: message });
        } else {
          dispatch(login(resData));
          setLocalStorageToken(res?.data?.token);
          if (checked) {
            bodyData.rememberMe = checked;
            dispatch(updateSellerAuthData(bodyData));
          } else {
            dispatch(updateSellerAuthData({}));
          }
          navigate(routesControl.DASHBOARD.path);
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const onChangeSelect = () => {
    setChecked(!checked);
  };

  return (
    <>
      <MetaTags title={t("text.sellerLogin.loginTitle")} />
      <SellerLoginForm
        loading={loading}
        onSubmit={onSubmit}
        onChangeSelect={onChangeSelect}
        checked={checked}
        authData={sellerAuthData}
      />
      <ModalComponent
        show={show}
        onHandleCancel={() => {
          setShow(false);
        }}
        closeButton={false}
      >
        <img src="assets/images/emailicon.svg" height="100" alt="morluxury" />
        <h2 className="text-white">
          {errMsg.type === "pending" &&
            t("text.sellerLogin.verificationPending")}
        </h2>
        <p>{errMsg.msg}</p>
        <CommonButton
          className="btn mt-lg-4 mt-3  btn-primary flex-shrink-0 w190 btn-gradiant"
          onClick={() => setShow(false)}
        >
          {t("text.sellerLogin.okay")}
        </CommonButton>
      </ModalComponent>
    </>
  );
}

export default SellerLogin;
