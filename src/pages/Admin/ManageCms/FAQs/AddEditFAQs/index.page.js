import React, { useEffect, useState } from "react";
import { AddEditFaqsForm } from "../../../../../components";
import { FAQsServices } from "../../../../../services";
import { logger, modalNotification } from "../../../../../utils";

function AddEditFAQs({ rowData, getFAQsData, onHandleCancel }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState();

  const getSingleFaqsData = async () => {
    try {
      const res = await FAQsServices.getSingleFAQsService(rowData.id);
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
      getSingleFaqsData();
    }
  }, []);

  const onSubmit = async (value) => {
    setLoading(true);
    try {
      let bodyData = {
        answer: value.answer,
        question: value.question,
        type: value.typeOfFaqs,
      };
      const response = rowData?.id
        ? await FAQsServices.updateFAQsService(bodyData, rowData.id)
        : await FAQsServices.addFAQsService({ bodyData });
      const { message, success } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onHandleCancel();
        getFAQsData();
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <AddEditFaqsForm
        onSubmit={onSubmit}
        loading={loading}
        initialData={initialData}
        rowData={rowData}
      />
    </div>
  );
}

export default AddEditFAQs;
