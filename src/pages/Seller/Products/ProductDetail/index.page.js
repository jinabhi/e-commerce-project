import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  checkValidData,
  currencyFormatter,
  GlobalLoader,
  MetaTags,
  SellerBreadcrumb,
  SellerGeneralText,
  SellerProductDetailImages,
  Tabs,
} from "../../../../components";
import routesMap from "../../../../routeControl/sellerRoutes";
import { commonServices } from "../../../../services";
import { SellerProductServices } from "../../../../services/Seller/Product/index.service";
import { logger } from "../../../../utils";
import { ProductOverView } from "./productOverview";
import { ProductSpecification } from "./productSpecification";
import SellerRatingReview from "./RatingReview";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewRatingData, setReviewRatingData] = useState([]);
  const { t } = useTranslation();
  let { id } = useParams();
  const breadcrumb = [
    {
      path: routesMap.PRODUCTS.path,
      name: t("text.sellerProductDetails.product"),
    },

    {
      path: "#",
      name: t("text.sellerProductDetails.productDetails"),
    },
  ];

  const tabContent = [
    {
      name: t("text.sellerProductDetails.productOverview"),
      key: "Product Overview",
      content: <ProductOverView overViewData={product.overview} />,
    },
    {
      name: t("text.sellerProductDetails.productSpecification"),
      key: "Product Specification",
      content: (
        <ProductSpecification specificationData={product.specification} />
      ),
    },
  ];

  async function getSingleProductDetail(Id) {
    setLoading(true);
    try {
      const res = await SellerProductServices.getProductDetail(Id);
      const { success, data } = res;
      if (success) {
        setProduct(data);
        setProductImages(data?.productImage);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  }

  const getReviewRatingDetail = async (productId) => {
    setLoading(true);
    try {
      let queryParams = { productId };
      const res = await commonServices.getReviewRatingService({ queryParams });
      if (res?.success) {
        setReviewRatingData(res?.data);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProductDetail(id);
      getReviewRatingDetail(id);
    }
  }, []);

  return (
    <>
      <MetaTags title={t("text.sellerProductDetails.productDetails")} />
      <SellerBreadcrumb breadcrumb={breadcrumb} />

      <div className="bg-850 p-30 radius-20">
        {loading ? (
          <GlobalLoader />
        ) : (
          <>
            <div className="mb-30">
              <h3 className="subHeading mb-20 text-white">
                {t("text.sellerProductDetails.productDetails")}
              </h3>

              <div className="row g-3 g-xl-4 row-cols-1 row-cols-sm-2 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 detailsPage_info text-white text-capitalize">
                <SellerGeneralText
                  label={t("text.sellerProductDetails.productID")}
                  value={checkValidData(product?.productId)}
                />
                <SellerGeneralText
                  label={t("text.sellerProductDetails.productName")}
                  value={checkValidData(product?.productName)}
                />
                <SellerGeneralText
                  label={t("text.sellerProductDetails.brand")}
                  value={checkValidData(product?.Brand?.name)}
                />
                <SellerGeneralText
                  label={t("text.sellerProductDetails.category")}
                  value={checkValidData(product?.categoryDetails?.name)}
                />
                <SellerGeneralText
                  label={t("text.sellerProductDetails.subCategory")}
                  value={checkValidData(product?.subCategoryDetails?.name)}
                />
                <SellerGeneralText
                  label={t("text.sellerProductDetails.childCategory")}
                  value={checkValidData(product?.childCategoryDetails?.name)}
                />

                <SellerGeneralText
                  label={t("text.sellerProductDetails.weight")}
                  value={
                    <div className="text-lowercase">
                      {checkValidData(
                        product?.weight > 0 || product?.unit
                          ? `${product?.weight} ${
                              product?.unit === "gm" ? "grams" : product?.unit
                            }`
                          : ""
                      )}
                    </div>
                  }
                />

                <SellerGeneralText
                  label={t("text.sellerProductDetails.price")}
                  value={currencyFormatter(product?.price, "USD")}
                />
                {product?.sellerProductVariantDetails &&
                  product?.sellerProductVariantDetails.map((item) => {
                    return item?.ProductVariant?.name ? (
                      <SellerGeneralText
                        label={item?.ProductVariant?.name || ""}
                        value={checkValidData(
                          item?.ProductVariantAttribute?.attributeNames
                        )}
                      />
                    ) : (
                      ""
                    );
                  })}
              </div>
            </div>
            <SellerProductDetailImages
              productImages={productImages}
              heading={t("text.sellerProductDetails.productImagesAndVideo")}
            />
            <div className="mb-30">
              <div className="commonTabs productDetails_info">
                <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
                  <li className="nav-item text-white" role="presentation">
                    <Tabs tabContent={tabContent} border={false} />
                  </li>
                </ul>
              </div>
            </div>
            <SellerRatingReview
              reviewRating={reviewRatingData}
              heading={t("text.sellerProductDetails.ratingsAndReviews")}
            />
          </>
        )}
      </div>
    </>
  );
}
