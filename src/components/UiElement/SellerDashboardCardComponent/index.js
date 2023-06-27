import React from "react";
import { Link } from "react-router-dom";
import config from "../../../config";

function SellerDashboardCardComponent({ linkPath, title, count, image }) {
  return (
    <>
      <div className="col-sm-6 col-md-4 col-xl-3">
        <Link
          to={linkPath}
          className="setBox bg-850 radius-20 d-flex flex-column justify-content-between"
        >
          <div className="setBox_info">
            <p>{title}</p>
            <h2>{count}</h2>
          </div>
          <div className="setBox_icon">
            <img
              src={`${config.IMAGE_URL}/dashboard/${image}`}
              className="img-fluid"
              alt="total-buyers"
            />
          </div>
        </Link>
      </div>
    </>
  );
}

export default SellerDashboardCardComponent;
