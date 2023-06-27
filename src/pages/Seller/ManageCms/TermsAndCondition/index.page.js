import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GlobalLoader, MetaTags, PageHeader } from "../../../../components";
import { SellerManageCmsService } from "../../../../services";
import { logger, stringToHTML } from "../../../../utils";

export default function TermsAndCondition() {
  const [termsAndConditionData, setTermsAndConditionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const getTermAndConditionData = async () => {
    setLoading(true);
    try {
      let queryParams = { type: "terms_conditions" };
      const res = await SellerManageCmsService.getAllManageCmsData({
        queryParams,
      });
      if (res?.success) {
        setTermsAndConditionData(res?.data?.rows[0]);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTermAndConditionData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.sellerManageCms.termsAndConditionTitle")} />
      <PageHeader
        heading={t("text.sellerManageCms.termsAndConditionTitle")}
        userType="seller"
      />
      <div className="static-page p-30 bg-850 radius-20">
        {loading ? (
          <GlobalLoader />
        ) : termsAndConditionData?.description?.length > 0 ? (
          <p className="text-break">
            {stringToHTML(termsAndConditionData?.description)}{" "}
          </p>
        ) : (
          <p className="text-center noRecord mb-0">
            {t("text.common.noDescriptionFound")}
          </p>
        )}
      </div>
    </>
  );
}
