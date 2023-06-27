import React, { useState } from "react";
import { ShipToMorForm, ViewMoreCard } from "../../../../components";
import { MorInventoryServices } from "../../../../services";
import { logger } from "../../../../utils";

function ShipToMor(mainProps) {
  const { productDetails, onHandleCancel, tableReset, getInventoryData } =
    mainProps;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const productId = productDetails?.id;

  const onChange = (checked) => {
    setShow(checked);
  };

  async function onSubmit(values) {
    values.isShippingType = show;
    if (show) {
      delete values.shippingCarrier;
      delete values.trackingId;
    }
    try {
      setLoading(true);
      // values.shipManually = show;
      let bodyData = { ...values };
      bodyData.shippingQuantity = `${values.shippingQuantity}`;
      bodyData.productId = `${productId}`;
      const res = await MorInventoryServices.addToMorService(bodyData);
      const { success } = res;
      if (success) {
        // modalNotification({
        //   type: "success",
        //   message,
        // });
        onHandleCancel();
        tableReset();
        getInventoryData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  }

  return (
    <>
      <ViewMoreCard
        extraClassName="orderItem bg-transparent"
        path={`${productDetails?.productImage[0]?.productImageUrl}`}
        name={`${productDetails?.productName}`}
        brandName={`${productDetails?.Brand?.name}`}
        content={`${productDetails?.quantity}`}
      />
      <ShipToMorForm
        onSubmit={onSubmit}
        loading={loading}
        show={show}
        onChange={onChange}
      />
    </>
  );
}

export default ShipToMor;
