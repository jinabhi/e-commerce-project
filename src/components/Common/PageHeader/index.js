import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/AuthSlice/index.slice";

function PageHeader({ children, heading }) {
  const userData = useSelector(selectUserData);
  const roleType = userData.userRole;
  return (
    <>
      {roleType === "admin" || roleType === "staff" ? (
        <div className="nk-block-head-content">
          <div className="nk-block-des text-soft">
            <nav>{children}</nav>
          </div>
          <h3 className="nk-block-title page-title">{heading}</h3>
        </div>
      ) : (
        <div className="common-heading">
          <h1 className="common-heading_title text-white">{heading}</h1>
          {children}
        </div>
      )}
    </>
  );
}

export default PageHeader;
