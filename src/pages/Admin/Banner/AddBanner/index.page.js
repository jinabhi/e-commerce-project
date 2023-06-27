import React, { useState } from "react";
import { Media } from "../../../../apiEndPoints";
import { AddBannerForm } from "../../../../components";
import { BannerServices } from "../../../../services";
import { logger, modalNotification } from "../../../../utils";

function AddEditChildCategory({ onHandleHide, tableReset, getBannerData }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(values) {
    try {
      setLoading(true);
      let bodyData = {
        bannerImage: values.bannerImage,
        description: values.description,
        title: values.title,
      };
      const response = await BannerServices.addBannerService({ bodyData });
      const { message, success } = response;

      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setLoading(false);
        onHandleHide();
        getBannerData();
        tableReset();
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  }

  return (
    <div>
      <AddBannerForm
        onSubmit={onSubmit}
        loading={loading}
        apiEndPoints={Media.bannerImage}
      />
    </div>
  );
}

export default AddEditChildCategory;
