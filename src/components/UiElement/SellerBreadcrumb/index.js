import React from "react";
import { Link } from "react-router-dom";

export default function SellerBreadcrumb({ breadcrumb }) {
  return (
    <>
      {breadcrumb && (
        <nav
          aria-label="breadcrumb"
          className="breadCrumbNav"
        >
          <ol className="breadcrumb breadcrumb-arrow">
            {breadcrumb.map((item, key) => {
              return item.path !== "#" ? (
                <li className="breadcrumb-item" key={key}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ) : (
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                  key={key}
                >
                  {item.name}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
