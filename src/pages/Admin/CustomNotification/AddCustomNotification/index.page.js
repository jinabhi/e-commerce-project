import React, { useState } from "react";
import { AddCustomNotificationForm } from "../../../../components";
import { CustomNotificationServices } from "../../../../services";
import { logger, modalNotification } from "../../../../utils";

function AddCustomNotification({
  onHandleHide,
  tableReset,
  getNotificationData,
  arrayOfData,
}) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      let bodyData = { ...value };
      const res = await CustomNotificationServices.addCustomNotificationService(
        bodyData
      );
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onHandleHide();
        tableReset();
        getNotificationData();
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <AddCustomNotificationForm
        onSubmit={onSubmit}
        loading={loading}
        arrayOfData={arrayOfData}
      />
    </div>
  );
}

export default AddCustomNotification;
