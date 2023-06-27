import React from "react";
import { useTranslation } from "react-i18next";
import { SellerStarRate } from "../../../../components";
import SellerReviewBox from "../../../../components/Common/SellerGeneralInfo/UserRevieBox";

export default function SellerRatingReview({ reviewRating, heading }) {
  const { t } = useTranslation();
  return (
    <div className="productDetail">
      <h3 className="subHeading mb-20 text-white">{heading}</h3>
      <div className="productDetails_reviews ">
        <div className="rateBox">
          <h3>{reviewRating?.avgRating}</h3>
          <p>
            {t("text.sellerProductDetails.based")} {reviewRating?.count}{" "}
            {t("text.sellerProductDetails.ratings")}
          </p>
          <SellerStarRate rate={reviewRating?.avgRating} />
        </div>
        {reviewRating?.count > 0 && (
          <SellerReviewBox reviewRating={reviewRating} />
        )}
      </div>
    </div>
  );
}
