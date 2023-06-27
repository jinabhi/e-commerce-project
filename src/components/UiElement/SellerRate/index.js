import React from "react";

export default function SellerStarRate({ rate }) {
  return (
    <>
      <div className="d-flex rateBox_rating">
        {[...new Array(5)].map((item, i) => {
          if (i + 1 <= rate) {
            return <em className="icon-star active" />;
          }
          if (rate % 1 > 0 && i + 1 <= Math.ceil(rate)) {
            return <em className="icon-star-half active" />;
          }
          return <em className="icon-star" />;
        })}
      </div>
    </>
  );
}
