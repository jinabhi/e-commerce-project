import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  CommonButton,
  MetaTags,
  RatingReviewComponent,
  SellerStarRate,
  textFormatter,
} from "../../../components";
import { commonServices } from "../../../services";
import { logger } from "../../../utils";

function RatingReviews() {
  const { t } = useTranslation();
  const initialLimit = 3;
  const [limit] = useState(initialLimit);
  const [page, setPage] = useState(1);
  const [ratingCount, setRatingCount] = useState();
  const [loading, setLoading] = useState(false);
  const [ratingReviewData, setReviewRatingData] = useState([]);
  const { id } = useParams();
  const [showMoreData, setShowMoreData] = useState(false);
  const [showLessData, setShowLessData] = useState(false);
  const [concatArray, setConcatArray] = useState([]);
  const [state, setState] = useState(true);
  // const [setState1] = useState([]);

  const getReviewRatingDetail = async (productId) => {
    setLoading(true);
    try {
      let queryParams = {
        productId,
        offset: (page - 1) * limit,
        limit: initialLimit,
      };
      const res = await commonServices.getReviewRatingService({ queryParams });
      if (res?.success) {
        setReviewRatingData(res?.data);
        setRatingCount(Math.ceil(res?.data?.count / initialLimit));
        if (state) {
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
          if (page === ratingCount) {
            setShowMoreData(false);
          } else {
            setShowMoreData(true);
          }
        }
        if (page === 1) {
          setShowLessData(false);
        }
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getReviewRatingDetail(id);
    }
  }, [page]);

  const showMoreDocuments = () => {
    if (page < ratingCount) {
      setPage((previous) => previous + 1);
      setShowLessData(true);
      setState(true);
    }
  };
  const showLessDocument = () => {
    if (page > 1) {
      setPage((previous) => previous - 1);
      setState(false);
    }
  };
  return (
    <>
      <MetaTags title={t("text.sellerRatingReviews.metaTitle")} />
      <div className="common-heading">
        <h1 className="common-heading_title text-white">
          {t("text.sellerRatingReviews.title")}
        </h1>
      </div>
      <div className="bg-850 p-30 radius-20">
        <div className="mb-30">
          <h3 className="subHeading mb-20 d-none d-lg-block text-white">
            {t("text.sellerRatingReviews.title")}
          </h3>
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="rateBox text-center">
                <h3>{ratingReviewData?.avgRating}</h3>
                <div className="d-flex rateBox_rating justify-content-center">
                  <SellerStarRate rate={ratingReviewData.avgRating} />
                </div>
                <p>
                  {" "}
                  {t("text.sellerProductDetails.based")}{" "}
                  {ratingReviewData?.count}{" "}
                  {t("text.sellerProductDetails.ratings")}
                </p>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="reviewPage_listing">
                {concatArray?.map((item, key) => {
                  return (
                    <RatingReviewComponent
                      image={item?.User?.profilePictureUrl}
                      name={`${textFormatter(
                        item?.User?.firstName
                      )} ${textFormatter(item?.User?.lastName)}`}
                      rating={item.rating}
                      date={item.date}
                      title={item.review}
                      // description={item.description}
                      key={key}
                      loading={loading}
                    />
                  );
                })}

                <div className="text-center">
                  {showMoreData && (
                    <>
                      {" "}
                      <CommonButton
                        type="button"
                        extraClassName="btn btn-gradiant"
                        onClick={showMoreDocuments}
                        loading={loading}
                      >
                        {t("text.common.viewMore")}
                      </CommonButton>
                    </>
                  )}
                  {showLessData && (
                    <CommonButton
                      type="button"
                      extraClassName="btn btn-primary-outline flex-shrink-0 me-2 mx-3"
                      onClick={showLessDocument}
                      loading={loading}
                    >
                      {t("text.common.showLess")}
                    </CommonButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingReviews;
