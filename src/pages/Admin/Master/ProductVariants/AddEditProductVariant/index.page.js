import React, { useState } from "react";
import { ProductVariantsForm } from "../../../../../components";
import { ProductVariantsServices } from "../../../../../services/Admin/Master/ProductVariants/index.service";
import { logger, modalNotification } from "../../../../../utils";

function AddEditProductVariants({
  rowData,
  onHandleCancel,
  getProductVariantData,
  tableReset,
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [data, setData] = useState(
    rowData?.productVariantAttributeDetail?.map((i) => i.attributeNames) ||
      undefined
  );

  async function onSubmit(values) {
    setLoading(true);
    setData(values.attributeName || undefined);
    try {
      let bodyData = {
        name: values.variantName,
        attributeNames: values.attributeName,
      };
      const cond = values.attributeName.map((item) => {
        if (item.length > 24) {
          return true;
        } else {
          return false;
        }
      });
      if (cond.includes(true) && cond.includes(true)) {
        setErr(true);
        setLoading(false);
      } else {
        const res = rowData?.id
          ? await ProductVariantsServices.updateProductVariantService(
              bodyData,
              rowData?.id
            )
          : await ProductVariantsServices.addProductVariant(bodyData);
        const { success, message } = res;
        if (success) {
          modalNotification({
            type: "success",
            message,
          });
          onHandleCancel();
          tableReset();
          setLoading(false);
          getProductVariantData();
        }
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  }
  return (
    <div>
      <ProductVariantsForm
        onSubmit={onSubmit}
        loading={loading}
        rowData={rowData}
        err={err}
        setData={setData}
        data={data}
      />
    </div>
  );
}

export default AddEditProductVariants;
