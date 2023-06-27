import React from "react";
import { useTranslation } from "react-i18next";

export default function FormSteps({ step }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="authHeader mb-0">
        <h1>{t("text.register.title")}</h1>
        <h5
          className={
            step === "one"
              ? "mb-0 d-block text-white"
              : "mb-0 d-none text-white"
          }
        >
          {t("text.register.personalDetails")}
        </h5>
        <h5
          className={
            step === "two"
              ? "mb-0 d-block text-white"
              : "mb-0 d-none text-white"
          }
        >
          {t("text.register.storeDetails")}
        </h5>
        <h5
          className={
            step === "three"
              ? "mb-0 d-block text-white"
              : "mb-0 d-none text-white"
          }
        >
          {t("text.register.bankDetails")}
        </h5>
      </div>
      <div className="authPage_step">
        <ul id="progressbar" className="progressStep list-unstyled">
          <li className={step === "one" ? "active" : ""}>
            <span>1</span>
          </li>
          <li className={step === "two" ? "active" : ""}>
            <span>2</span>
          </li>
          <li className={step === "three" ? "active" : ""}>
            <span>3</span>
          </li>
        </ul>
      </div>
    </>
  );
}
