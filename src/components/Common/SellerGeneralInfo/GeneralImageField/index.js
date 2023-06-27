/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { currencyFormatter } from "../../..";

export function SellerProductDetailImages({ productImages, heading }) {
  return (
    <>
      <div className="mb-30">
        <h3 className="subHeading mb-20 text-white ">{heading}</h3>
        <div className="row g-3 g-lg-4 flex-wrap productDetails_images">
          {productImages.map((image) => {
            if (image.fileType === "image") {
              return (
                <div className="col-auto">
                  <div className="addProduct_trash position-relative m-0">
                    <img src={image?.productImageUrl} alt="product-image" />
                  </div>
                </div>
              );
            } else if (image.fileType === "video") {
              return (
                <div className="col-auto">
                  <div className="addProduct_trash position-relative m-0">
                    <video height="140" width="250" controls>
                      <source src={image.productImageUrl} type="video/mp4" />
                      <track
                        kind="captions"
                        srcLang="en"
                        label="english_captions"
                      />
                    </video>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export function SellerOrderDetailsImage({ orderDetails, t }) {
  return (
    <>
      {orderDetails.map((details) => {
        return (
          <>
            <div className="col-12 col-sm-auto">
              <div className="orderItem">
                <div className="d-flex">
                  <div className="orderItem_img flex-shrink-0">
                    <img
                      src={details?.Product?.productImage[0]?.productImageUrl}
                      alt="order"
                    />
                  </div>
                  <div className="flex-grow-1 orderItem_info">
                    <h3 className="mb-0 text-truncate text-white">
                      {details.Product?.productName}
                    </h3>
                    <p> {details.Product?.Brand?.name}</p>
                    <h3 className="text-primary price">
                      {currencyFormatter(details?.amount, "USD")}
                    </h3>
                    <p>
                      {t("text.manageOrders.qty")} :{" "}
                      <span>{details?.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
