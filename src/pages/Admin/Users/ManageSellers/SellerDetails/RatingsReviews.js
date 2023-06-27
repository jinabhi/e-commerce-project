import React, { useEffect, useState } from "react";
import { RatingReview } from "../../../../../components";
import { commonServices } from "../../../../../services";
import { logger } from "../../../../../utils";

function ReviewsRatings({ sellerId }) {
  const [loading, setLoading] = useState(false);
  const [reviewRatingData, setReviewRatingData] = useState([]);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [showLessButton, setShowLessButton] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [ratingCount, setRatingCount] = useState();
  const initialLimit = 3;
  const [limit] = useState(initialLimit);
  const [concatArray, setConcatArray] = useState([]);
  const [manageArray, setManageArray] = useState(true);

  const getReviewRatingDetail = async (sellerUnId) => {
    setLoading(true);
    try {
      let queryParams = {
        sellerId: sellerUnId,
        offset: (pageCount - 1) * limit,
        limit: initialLimit,
      };
      const res = await commonServices.getReviewRatingService({ queryParams });
      if (res?.success) {
        setReviewRatingData(res?.data);
        setRatingCount(Math.ceil(res?.data?.count / initialLimit));
        if (manageArray) {
          setConcatArray(concatArray?.concat(res?.data?.rows));
        } else {
          let modulesOfArray = concatArray.length % initialLimit;
          if (modulesOfArray === 0) {
            let sliceArray = concatArray.slice(
              0,
              concatArray?.length - res?.data?.rows?.length
            );
            setConcatArray(sliceArray);
          } else {
            let sliceArray = concatArray.slice(
              0,
              concatArray?.length - modulesOfArray
            );
            setConcatArray(sliceArray);
          }
        }
        if (res?.data?.count > initialLimit) {
          if (pageCount === ratingCount) {
            setShowMoreButton(false);
          } else {
            setShowMoreButton(true);
          }
        }
        if (pageCount === 1) {
          setShowLessButton(false);
        }
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sellerId) {
      getReviewRatingDetail(parseInt(sellerId));
    }
  }, [sellerId, pageCount]);

  const showMoreDocuments = () => {
    if (pageCount < ratingCount) {
      setPageCount((previous) => previous + 1);
      setShowLessButton(true);

      setManageArray(true);
    }
  };
  const showLessDocument = () => {
    if (pageCount > 1) {
      setPageCount((previous) => previous - 1);

      setManageArray(false);
    }
  };
  return (
    <>
      <div className="card-inner">
        <div className="tab-pane" id="ratings">
          <div className="row">
            <RatingReview
              reviewRatingData={concatArray}
              avgRating={reviewRatingData?.avgRating}
              total={reviewRatingData?.count}
              showMoreDocuments={showMoreDocuments}
              showLessDocument={showLessDocument}
              showMoreButton={showMoreButton}
              showLessButton={showLessButton}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewsRatings;
