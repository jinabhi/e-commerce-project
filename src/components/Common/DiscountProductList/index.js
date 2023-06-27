import React from "react";
import { useTranslation } from "react-i18next";
import { statusFormatter } from "../../Formatter";

export default function DiscountProductList({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <ul className="list-group list-group-flush">
        {data.length > 0 ? (
          data.map((item, i) => {
            return (
              <li key={i} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1">
                    {item?.Product?.productName || ""}
                  </div>
                  <span>{statusFormatter(item?.status || "")}</span>
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-center"> {t("text.discountOffers.noProduct")}</p>
        )}
      </ul>
    </>
  );
}
