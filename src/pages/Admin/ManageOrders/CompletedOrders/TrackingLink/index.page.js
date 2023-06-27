import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TrackingLinkForm } from "../../../../../components";
import routesMap from "../../../../../routeControl/adminRoutes";
import { OrdersServices } from "../../../../../services";
import { logger, modalNotification } from "../../../../../utils";

function TrackingLink({ orderId }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const id = orderId;
  const onSubmit = async (values) => {
    setLoading(true);

    try {
      let bodyData = { status: "canceled", trackingLink: values.text };
      const res = await OrdersServices.UpdateStatusServices(bodyData, id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        navigate(routesMap.COMPLETE_ORDER.path);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <TrackingLinkForm
        onSubmit={onSubmit}
        loading={loading}
        name={t("text.common.update")}
      />
    </div>
  );
}

export default TrackingLink;
