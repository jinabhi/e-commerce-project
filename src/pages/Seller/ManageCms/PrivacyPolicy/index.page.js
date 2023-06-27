import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlobalLoader, MetaTags, PageHeader } from "../../../../components";
import { SellerManageCmsService } from "../../../../services/Seller/ManageCms/index.service";
import { logger, stringToHTML } from "../../../../utils";

export default function SellerPrivacyPolicy() {
  const [privacyPolicyData, setPrivacyPolicyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const getPrivacyPolicyData = async () => {
    setLoading(true);
    try {
      let queryParams = { type: "privacy_policy" };
      const res = await SellerManageCmsService.getAllManageCmsData({
        queryParams,
      });
      if (res?.success) {
        setPrivacyPolicyData(res?.data?.rows[0]);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrivacyPolicyData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.sellerManageCms.privacyPolicy")} />
      <PageHeader
        heading={t("text.sellerManageCms.privacyPolicy")}
        userType="seller"
      />
      <div className="static-page p-30 bg-850 radius-20">
        {loading ? (
          <GlobalLoader />
        ) : privacyPolicyData?.description?.length > 0 ? (
          <p>{stringToHTML(privacyPolicyData?.description)}</p>
        ) : (
          <p className="text-center noRecord mb-0">
            {t("text.sellerManageCms.noRecordFound")}
          </p>
        )}
      </div>
    </>
  );
}
