import React from "react";
import { SellerStarRate } from "..";
import { dateFormatWithMonth } from "../../../helpers";
import { dateFormatter } from "../../../utils";
// import config from "../../../config";

function RatingReviewComponent({
  image,
  name,
  rating,
  date,
  title,
  // description,
  key,
}) {
  return (
    <>
      <div className="reviewBox" key={key}>
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="flex-shrink-0 mb-2 mb-sm-0">
            <img src={`${image}`} alt="reviews" />
          </div>
          <div className="flex-grow-1 ms-0 ms-sm-3 reviewBox_info">
            <div className="d-flex justify-content-between flex-wrap flex-sm-nowrap align-items-center">
              <h2 className="mb-sm-0 w-100 text-white">{name}</h2>
              <SellerStarRate rate={rating} />
            </div>
            <span className="reviewBox_postedOn">
              {dateFormatter(date, dateFormatWithMonth)}
            </span>
            <h4 className="reviewBox_title text-white">{title}</h4>
            {/* <p>{description}</p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingReviewComponent;
