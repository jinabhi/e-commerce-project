import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminForgotPasswordForm, MetaTags } from "../../../components";
import moduleRoutesMap from "../../../routeControl";
import { AdminAuthServices } from "../../../services";
import { logger, modalNotification } from "../../../utils";

function AdminForgotPassword() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let user = "";

  if (location.pathname.search("admin") >= 0) {
    user = "admin";
  } else {
    user = "staff";
  }

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await AdminAuthServices.forgetPasswordService(values);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        navigate(moduleRoutesMap[user].LOGIN.path);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  return (
    <>
      <MetaTags title={t("text.adminForgetPassword.forgotPasswordTitle")} />
      <div className="nk-block nk-block-middle nk-auth-body">
        <div className="nk-block-head mb-3">
          <div className="nk-block-head-content">
            <div className="mb-4">
              <Link
                to={moduleRoutesMap[user].LOGIN.path}
                className="nk-block-back"
              >
                <em className="icon ni ni-arrow-left" />
              </Link>
            </div>
            <h5 className="nk-block-title">
              {t("text.adminForgetPassword.forgotPasswordHeading")}
            </h5>
            <div className="nk-block-des">
              <p>{t("text.adminForgetPassword.forgotPasswordDescription")}</p>
            </div>
          </div>
        </div>
        <AdminForgotPasswordForm loading={loading} onSubmit={onSubmit} />
      </div>
    </>
  );
}

export default AdminForgotPassword;
