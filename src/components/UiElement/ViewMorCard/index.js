import React from "react";
// import { useTranslation } from "react-i18next";

function ViewMoreCard({
  path,
  name,
  brandName,
  amount,
  extraClassName = "",
  content,
}) {
  // const { t } = useTranslation();
  return (
    <div className={`${extraClassName}`}>
      {content && (
        <div className="mb-30">
          <h2 className="mt-0 text-white">Ship to Mor</h2>
        </div>
      )}
      <div className="d-flex">
        {amount && (
          <>
            <div className="orderItem_img flex-shrink-0">
              {path ? <img src={path} alt="order" /> : "No Product Image Found"}
            </div>
            <div className="flex-grow-1 orderItem_info">
              <h3 className="text-truncate text-white mb-0">{name}</h3>
              <p>{brandName}</p>
              <h3 className="text-primary price">
                <span>$ </span>
                {amount}
              </h3>
            </div>
          </>
        )}
        {content && (
          <>
            <div className="orderItem_img flex-shrink-0">
              <img src={path} alt="order" />
            </div>
            <div className="flex-grow-1 orderItem_info">
              <h3 className="text-truncate text-white">{name}</h3>
              <h5 className="">{brandName}</h5>
              <h6 className="">
                {/* {t("text.morInventory.yourStock")} {content} */}
                {/* {content <= 1
                  ? t("text.morInventory.piece")
                  : t("text.morInventory.pieces")}{" "}
                {t("text.morInventory.left")} */}
              </h6>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewMoreCard;
