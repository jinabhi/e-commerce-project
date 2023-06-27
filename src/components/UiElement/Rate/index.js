import React from "react";

function StarRate({ rate }) {
  return (
    <>
      <ul className="d-flex flex-wrap starRating mb-0">
        {[...new Array(5)].map((item, i) => {
          if (i + 1 <= rate) {
            return (
              <li className="preview-item text-warning">
                <em className="icon ni ni-star-fill" />
              </li>
            );
          }
          if (rate % 1 > 0 && i + 1 <= Math.ceil(rate)) {
            return (
              <li className="preview-item text-warning">
                <em className="icon ni ni-star-half-fill" />
              </li>
            );
          }
          return (
            <li className="preview-item text-warning">
              <em className="icon ni ni-star" />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default StarRate;
