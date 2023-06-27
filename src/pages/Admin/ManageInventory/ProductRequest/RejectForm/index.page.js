import React, { useState } from "react";
import { RejectionForm } from "../../../../../components";
import { ProductRequestServices } from "../../../../../services";
import { logger, modalNotification } from "../../../../../utils";

function RejectForm(mainProps) {
  const { requestId, getProductRequestData, onHandleHide, tableReset } =
    mainProps;
  const [loading, setLoading] = useState(false);

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await ProductRequestServices.rejectRequestServices(
        values,
        requestId
      );

      const { message, success } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onHandleHide();
        tableReset();
        getProductRequestData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  }
  return (
    <>
      <RejectionForm onSubmit={onSubmit} loading={loading} />
    </>
  );
}

export default RejectForm;
