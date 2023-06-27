import React, { useState } from "react";
import { EditCommissionForm } from "../../../../../components";
import { BrandsServices } from "../../../../../services";
import { logger, modalNotification } from "../../../../../utils";

function EditCommission({ value, onCloseModal, getBrandsData }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(values) {
    setLoading(true);
    try {
      let bodyData = {
        commission: `${values.commission}`,
      };
      const res = await BrandsServices.updateCommissionServices(
        bodyData,
        value.id
      );

      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onCloseModal();
        setLoading(false);
        getBrandsData();
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  }
  return (
    <div>
      <EditCommissionForm onSubmit={onSubmit} loading={loading} value={value} />
    </div>
  );
}

export default EditCommission;
