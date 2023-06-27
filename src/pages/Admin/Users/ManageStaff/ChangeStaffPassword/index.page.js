import React, { useState } from "react";
import { ManageStaffPasswordForm } from "../../../../../components";
import { ManageStaffServices } from "../../../../../services";
import { logger, modalNotification } from "../../../../../utils";

function ChangeStaffPassword({ onClose, staffId, getStaffData, tableReset }) {
  const [loading, setLoading] = useState(false);
  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await ManageStaffServices.changeStaffPassword(
        values,
        staffId
      );

      const { message, success } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onClose();
        tableReset();
        setLoading(false);
        getStaffData();
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  }
  return (
    <div>
      <ManageStaffPasswordForm
        onSubmit={onSubmit}
        onClose={onClose}
        loading={loading}
      />
    </div>
  );
}

export default ChangeStaffPassword;
