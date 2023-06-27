import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { SellerStarRate } from "../../../UiElement";
import { dateFormatter } from "../../../../utils";
import { textFormatter } from "../../../Formatter";
import { dateFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/sellerRoutes";

export default function SellerReviewBox({ reviewRating }) {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <div className="reviewBox">
      {reviewRating?.rows?.map((item, i) => {
        if (i === 0) {
          return (
            <>
              <div className="d-flex flex-wrap flex-sm-nowrap">
                <div className="flex-shrink-0 mb-2 mb-sm-0">
                  <img src={item?.User?.profilePictureUrl} alt="reviews" />
                </div>
                <div className="flex-grow-1 ms-0 ms-sm-3 reviewBox_info">
                  <h2 className="text-white">
                    {`${textFormatter(item?.User?.firstName)} ${textFormatter(
                      item?.User?.lastName
                    )}`}
                  </h2>
                  <SellerStarRate rate={item?.rating} />
                  <h4 className="reviewBox_title text-white">{item?.review}</h4>
                  <span className="reviewBox_postedOn text-white">
                    {dateFormatter(item?.createdAt, dateFormatWithMonth)}
                  </span>
                  {/* It is pending */}
                  {/* <p>
                    Lorem Ipsum is simply dummy text of the printing and{" "}
                    <br className="d-none d-md-block" /> typesetting industry.
                  </p> */}
                  <div className="allReview">
                    {reviewRating?.count > 1 ? (
                      <Link
                        to={`${routesMap.RATINGS_REVIEWS.path}/${id}`}
                        className="link"
                      >
                        {t("text.sellerProductDetails.viewAllReviews")}
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        }
      })}
    </div>
  );
}
