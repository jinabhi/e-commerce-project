import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MetaTags, SellerForgotPasswordForm } from "../../../components";
import { SellerAuthServices } from "../../../services";
import { logger, modalNotification } from "../../../utils";

function SellerForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await SellerAuthServices.forgetPasswordService(values);
      const { success, message } = res;
      if (success) {
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
      <MetaTags title={t("text.adminForgetPassword.forgotPasswordTitle")} />
      <SellerForgotPasswordForm loading={loading} onSubmit={onSubmit} />
    </>
  );
}

export default SellerForgotPassword;
