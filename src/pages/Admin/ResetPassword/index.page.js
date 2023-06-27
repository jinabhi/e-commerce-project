import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MetaTags, ResetPasswordForm } from "../../../components";
import { AdminAuthServices } from "../../../services";
import { logger, modalNotification } from "../../../utils";

function ResetPassword() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  let user = "";

  if (location.pathname.search("admin") >= 0) {
    user = "admin";
  } else {
    user = "staff";
  }

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      let bodyData = {
        token: param.token,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
        location:
          "Atlantis Tower 3rd Floor Plot No 13- A scheme No 78 Part 2 Indore",
      };
      const res = await AdminAuthServices.resetPassword(bodyData);
      const { success, message } = res;
      if (success) {
        setLoading(false);
        modalNotification({
          type: "success",
          message,
        });
        if (user === "admin") {
          navigate("/admin");
        } else {
          navigate("/staff");
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <MetaTags title={t("text.adminResetPassword.title")} />
      <div className="nk-block nk-block-middle nk-auth-body">
        <div className="nk-block-head mb-3">
          <div className="nk-block-head-content">
            <h5 className="nk-block-title">
              {t("text.adminResetPassword.title")}
            </h5>
          </div>
        </div>
        <ResetPasswordForm onSubmit={onSubmit} loading={loading} />
      </div>
    </>
  );
}

export default ResetPassword;
