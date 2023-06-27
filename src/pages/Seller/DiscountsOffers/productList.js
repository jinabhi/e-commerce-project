import { t } from "i18next";
import React, { useEffect } from "react";
import { ToggleButton } from "../../../components";

export default function ProductList({
  productListData,
  changeProductDiscountStatus,
  selectedDiscountStatus,
}) {
  useEffect(() => {}, [productListData]);
  return productListData.length > 0 ? (
    <>
      <h2 className="mt-0 text-white">
        {t("text.sellerProductDetails.product")}
      </h2>
      <ul className="list-unstyled p-0 catList mt-2 mt-md-4 ">
        {productListData.map((list) => {
          return (
            <li key={list.id} className="d-flex align-items-center">
              <div className="flex-grow-1 text-capitalize">
                {list?.Product?.productName || ""}
              </div>
              <div>
                <label className="customSwitchBtn">
                  <ToggleButton
                    checkedText={t("text.common.active")}
                    unCheckedText={t("text.common.inactive")}
                    defaultChecked={list.status === "active"}
                    disabled={
                      selectedDiscountStatus === "inactive" ||
                      selectedDiscountStatus === "expired"
                    }
                    onChange={(e) =>
                      changeProductDiscountStatus(
                        e,
                        list.discountId,
                        list.productId
                      )
                    }
                  />
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <h2 className="mt-0 text-white">
      {t("text.sellerDiscountOffer.noProductsFound")}
    </h2>
  );
}
