import React from "react";

export function GeneralText({
  label,
  value,
  currency = "",
  extraClassName = "",
}) {
  return (
    <div className={`${extraClassName}`}>
      <div className="profile-ud wider">
        <span className="profile-ud-label">
          <span>{label}</span> :
        </span>
        <span className="profile-ud-value text-left text-break">
          {currency} {value}
        </span>
      </div>
    </div>
  );
}

export function ManageOrderDetailsText({
  label,
  value,
  extraClassName,
  currency,
  manageEarningClass,
}) {
  return (
    <div
      className={
        manageEarningClass
          ? "col-sm-6 col-xl-4"
          : `col-sm-4 col-xxl-4  ${extraClassName} `
      }
    >
      <div className="profile-ud wider">
        <span className="profile-ud-label w-auto">{label} : </span>
        <span className="profile-ud-value text-left pl-2">
          {currency}
          {value}
        </span>
      </div>
    </div>
  );
}

export function AdditionalInfo({ heading, content }) {
  return (
    <div className="col-sm-12 pt-5">
      <h5 className="title mb-3">{heading}</h5>
      <p>{content}</p>
    </div>
  );
}

export function VariantInfo({ extraClassName, label, value }) {
  return (
    <div className={`${extraClassName}`}>
      <div className="profile-ud">
        <span className="profile-ud-value text-left">
          <span className="text-muted">{label} : </span>
          {value}
        </span>
      </div>
    </div>
  );
}
