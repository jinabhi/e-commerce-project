import { t } from "i18next";
import React from "react";
import { currencyFormatter } from "../../../Formatter";

export function PaymentSummary({ heading, paymentData, ordersData }) {
  return (
    <>
      <div className="col-md-6">
        <h5 className="title mb-3">{heading}</h5>
        <div className="">
          <table className="table table-bordered">
            <tbody>
              {paymentData?.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      {item?.Product?.productName || "-"}
                      <br />
                    </td>
                    <td className="text-right">
                      {currencyFormatter(item?.amount, "USD") || "-"}
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td>{t("text.manageOrders.shipping")}</td>
                <td className="text-right">
                  {currencyFormatter(ordersData?.shippingCharges, "USD")}
                </td>
              </tr>
              <tr>
                <td>{t("text.manageOrders.tax")}</td>
                <td className="text-right">
                  {currencyFormatter(ordersData?.totalTax, "USD")}
                </td>
              </tr>
            </tbody>
            <tfoot className="border-0">
              <tr>
                <td>{t("text.manageOrders.totalAmount")} </td>
                <td className="text-right">
                  {currencyFormatter(ordersData?.AmountWithTax, "USD")}
                  <span className="text-success"> Paid</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
