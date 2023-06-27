import React from "react";
import { useTranslation } from "react-i18next";
import { currencyFormatter } from "../../../Formatter";

export function SellerGeneralText({ label, value, unit }) {
  return (
    <div className="col text-white">
      <div className="infoBox">
        <label>{label}</label>
        <h5 className=" text-white ">
          {value} {unit}
        </h5>
      </div>
    </div>
  );
}

export function SellerGeneralCoverText({ label, value }) {
  return (
    <>
      {" "}
      <div className="col col-12" style={{ width: "100%" }}>
        <div className="infoBox">
          <label>{label}</label>
          <h5 className="text-white">{value}</h5>
        </div>
      </div>
    </>
  );
}

export function SellerPaymentSummary({ paymentData, AmountWithTax }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="col-lg-5">
        <ul className="list-unstyled m-0 orderDetails_summary">
          {paymentData?.map((product) => {
            return (
              <>
                <li className="d-flex align-items-center  ">
                  {product?.Product?.productName}{" "}
                  <span>{currencyFormatter(product?.amount, "USD")}</span>
                </li>
              </>
            );
          })}
        </ul>
        <div className="orderDetails_total d-flex justify-content-between align-items-center">
          <h3 className="subHeading text-white">
            {t("text.sellerOrders.orderTotal")}
          </h3>
          <h3 className="subHeading amount">
            {currencyFormatter(AmountWithTax, "USD")}
          </h3>
        </div>
      </div>
    </>
  );
}
