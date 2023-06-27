import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { logger, modalNotification } from "../../../../utils";
import { MetaTags, SellerChangePasswordForm } from "../../../../components";
import { SellerAuthServices } from "../../../../services";
import routesMap from "../../../../routeControl/sellerRoutes";

function ChangePassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      const response = await SellerAuthServices.changePasswordService(value);
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setLoading(false);
        navigate(routesMap.DASHBOARD.path);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <>
      <MetaTags title={t("text.changePassword.title")} />
      <SellerChangePasswordForm loading={loading} onSubmit={onSubmit} />
    </>
  );
}

export default ChangePassword;
