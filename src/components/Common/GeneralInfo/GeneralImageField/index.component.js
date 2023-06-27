import { t } from "i18next";
import React from "react";
import { checkValidData, currencyFormatter } from "../../../Formatter";

export function ImageField({ imagePath, title }) {
  return (
    <div className="nk-block-head mb-1">
      <h5 className="title mb-3">{title}</h5>
      <div className="user-card">
        <div className="col-md-2 col-xxl-1">
          <div className="rounded-pill overflow-hidden">
            <img src={imagePath} alt="UserImage" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageMapField({ heading, data, imagePreviewer }) {
  return (
    <>
      <div className="col-12">
        <h5 className="title mb-3">{heading}</h5>
      </div>
      <div className="productGallery d-flex flex-wrap">
        {data.map((item, key) => {
          if (item.fileType === "image") {
            return (
              <div className="productGallery_item" key={key}>
                <div className="productGallery_item_img">
                  <img
                    src={item?.productImageUrl || item?.damageImageUrl}
                    alt="product"
                  />
                </div>
              </div>
            );
          } else if (item.fileType === "video") {
            return (
              <div
                className="productGallery_item productGallery_item-video"
                key={key}
              >
                <div className="productGallery_item_img">
                  <video controls>
                    <source src={item.productImageUrl} type="video/mp4" />
                    <track
                      kind="captions"
                      srcLang="en"
                      label="english_captions"
                    />
                  </video>
                </div>
              </div>
            );
          } else {
            return (
              <div className="productGallery_item" key={key}>
                <div className="productGallery_item_img">
                  <img
                    src={item?.productImageUrl || item?.damageImageUrl}
                    alt="product"
                    id="dsd"
                    onClick={() => imagePreviewer(item?.damageImageUrl)}
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export function ProductDetails({
  heading,
  productDetailsData,
  manageEarningClass,
}) {
  return (
    <>
      <div className="col-md-12 pt-4">
        <h5 className="title mb-3">{heading}</h5>
      </div>
      {productDetailsData?.map((product) => {
        return (
          <>
            <div className={manageEarningClass ? "col-sm-4" : "col-sm-6"}>
              <div className="media border border-5 p-2">
                <div className="productImage mr-3">
                  <img
                    src={product.Product?.productImage[0]?.productImageUrl}
                    className="img-fluid round-lg"
                    alt="eyeshadow"
                  />
                </div>
                <div className="media-body">
                  <h6 className="mb-2 prTitle">
                    {checkValidData(product.Product?.productName)}
                  </h6>
                  <h6 className="mb-2 textsmall text-muted">
                    {currencyFormatter(product?.amount, "USD")}
                  </h6>
                  <h6 className="textsmall text-muted">
                    {t("text.manageOrders.qty")} :{" "}
                    {checkValidData(product.quantity)}
                  </h6>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
