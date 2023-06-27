import React from "react";
import { useTranslation } from "react-i18next";
import { StarRate } from "../../../UiElement";
import { UserReviewBox } from "../UserReviewBox/index.component";

export default function RatingReview({
  avgRating,
  total,
  reviewRatingData,
  showLessButton,
  showMoreButton,
  showMoreDocuments,
  showLessDocument,
  loading,
}) {
  const { t } = useTranslation();
  return (
    <>
      <div className="col-12">
        <h6 className="mb-3">{t("text.ratingReview.avgRating")}</h6>
        <h4 className="mb-0">
          {avgRating} {t("text.ratingReview.outOf")}
        </h4>
        <StarRate rate={avgRating} />
        <h6 className="mb-4 text-muted">
          {t("text.ratingReview.totalRating")} {total}
        </h6>
      </div>
      <div className="col-12">
        <h6 className="mb-3">{t("text.ratingReview.review")}</h6>
        <UserReviewBox
          reviewRatingData={reviewRatingData}
          loading={loading}
          showMoreDocuments={showMoreDocuments}
          showMoreButton={showMoreButton}
          showLessButton={showLessButton}
          showLessDocument={showLessDocument}
        />
      </div>
    </>
  );
}
