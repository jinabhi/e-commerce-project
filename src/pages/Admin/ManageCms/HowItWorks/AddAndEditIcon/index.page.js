import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddAndEditIconForm } from "../../../../../components";
import { HowItWorksServices } from "../../../../../services";

import { logger, modalNotification } from "../../../../../utils";

function AddAndEditIcon({ onHandleHide, rowData, getHowItWorksData }) {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [initialData, setInitialData] = useState();

  const getSingleHowItWorksData = async () => {
    try {
      const res = await HowItWorksServices.getSingleHowItWorksService(
        rowData.id
      );
      const { success, data } = res;
      if (success) {
        setInitialData(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (rowData?.id) {
      getSingleHowItWorksData();
    }
  }, []);

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      let bodyData = {
        title: value.title,
        description: value.description,
        cmsId: param.id,
      };
      const response = rowData?.id
        ? await HowItWorksServices.updateHowItWorksService(bodyData, rowData.id)
        : await HowItWorksServices.addHowItWorksService({
            bodyData,
          });
      const { message, success } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onHandleHide();
        getHowItWorksData();
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <AddAndEditIconForm
        onSubmit={onSubmit}
        loading={loading}
        initialData={initialData}
      />
    </div>
  );
}

export default AddAndEditIcon;
