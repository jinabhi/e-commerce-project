import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import routesMap from "../../../../routeControl/sellerRoutes";
import { GlobalLoader } from "../../../../components";
import config from "../../../../config";
import { numberFormatter } from "../../../../utils";

function ProductList({ productData, loading }) {
  const { t } = useTranslation();

  return (
    <div className="categorySect mt-30">
      {loading ? (
        <GlobalLoader />
      ) : productData.length > 0 ? (
        <div className="row g-2 g-sm-4">
          {productData.map((item, key) => (
            <div
              className="col-xl-auto col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
              key={key}
            >
              <Link
                to={`${routesMap.PRODUCT_DETAIL.path}/${item.id}`}
                className="categorybox w-100 bg-850"
              >
                {item?.productImage.length === 0 ? (
                  <>
                    <div className="categorybox_img position-relative ">
                      <img
                        className="w-100"
                        src={`${config.ADMIN_IMAGE_URL}/noImage.png`}
                        alt={t("text.myStore.noImage")}
                      />
                      <p className="product-view position-absolute mb-0">
                        <span className="icon-eye" />
                        {numberFormatter(item?.totalViewCount)}
                      </p>
                    </div>
                    <div className="categorybox_info">
                      <h4 className="text-truncate">{item?.productName}</h4>
                      <div className="rating d-flex align-items-center justify-content-between">
                        {item?.ratingCount || item?.overAllRating > 0 ? (
                          <p className="mb-0">
                            <span className="icon-star-outline" />{" "}
                            {item?.ratingCount}({`${item?.overAllRating}`})
                          </p>
                        ) : (
                          <span className="rating_no">No Rating</span>
                        )}
                      </div>
                      <div className="categorybox_price">
                        <p className="mb-0">
                          ${" "}
                          {item?.ProductDiscount === null
                            ? item?.price
                            : item?.discountPrice}
                          {item?.ProductDiscount?.Discount ? (
                            <span>
                              <s>$ {item?.price}</s>{" "}
                              {item?.ProductDiscount?.Discount?.discountPercent}
                              % off
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  item?.productImage.map((value, index) => {
                    if (value.fileType === "image" && index === 0) {
                      return (
                        <>
                          <div className="categorybox_img position-relative ">
                            <img
                              className="w-100"
                              src={value?.productImageUrl}
                              alt={t("text.myStore.noImage")}
                            />
                            <p className="product-view position-absolute mb-0">
                              <span className="icon-eye" />{" "}
                              {numberFormatter(item?.totalViewCount)}
                            </p>
                          </div>
                          <div className="categorybox_info">
                            <h4 className="text-truncate">
                              {item?.productName}
                            </h4>
                            <div className="rating d-flex align-items-center justify-content-between">
                              {item?.ratingCount || item?.overAllRating > 0 ? (
                                <p className="mb-0">
                                  <span className="icon-star-outline" />{" "}
                                  {item?.ratingCount}({`${item?.overAllRating}`}
                                  )
                                </p>
                              ) : (
                                <span className="rating_no">No Rating</span>
                              )}
                            </div>
                            <div className="categorybox_price">
                              <p className="mb-0">
                                ${" "}
                                {item?.ProductDiscount === null
                                  ? item?.price
                                  : item?.discountPrice}
                                {item?.ProductDiscount?.Discount ? (
                                  <span>
                                    <s>$ {item?.price}</s>{" "}
                                    {
                                      item?.ProductDiscount?.Discount
                                        ?.discountPercent
                                    }
                                    % off
                                  </span>
                                ) : (
                                  ""
                                )}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="mt-4 subHeading mb-20 text-white text-center">
          {t("text.myStore.noRecordFound")}
        </h3>
      )}
    </div>
  );
}

export default ProductList;
