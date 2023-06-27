import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { MetaTags, SellerResetPasswordForm } from "../../../components";
import { SellerAuthServices } from "../../../services";
import { logger, modalNotification } from "../../../utils";

function ResetPassword() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      let bodyData = {
        token: param.token,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
        location: "USA",
      };
      const res = await SellerAuthServices.sellerResetPasswordService(bodyData);
      const { success, message } = res;
      if (success) {
        setLoading(false);
        modalNotification({
          type: "success",
          message,
        });
        navigate("/brand");
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <MetaTags title={t("text.sellerResetPassword.resetPassword")} />
      <div className="nk-block nk-block-middle nk-auth-body">
        <div className="nk-block-head mb-3">
          <div className="nk-block-head-content">
            <h5 className="nk-block-title">
              {t("text.sellerResetPassword.resetPassword")}
            </h5>
          </div>
        </div>
        <SellerResetPasswordForm onSubmit={onSubmit} loading={loading} />
      </div>
    </>
  );
}

export default ResetPassword;
