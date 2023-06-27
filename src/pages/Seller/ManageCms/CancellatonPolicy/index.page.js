import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { GlobalLoader, MetaTags, PageHeader } from "../../../../components";
import { dateFormatWithMonth } from "../../../../helpers";
import { SellerManageCmsService } from "../../../../services/Seller/ManageCms/index.service";
import { dateFormatter, logger, stringToHTML } from "../../../../utils";

export default function SellerCancellationPolicy() {
  const [cancellationPolicyData, setCancellationPolicyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const getCancellationPolicyData = async () => {
    setLoading(true);
    try {
      let queryParams = { type: "cancellation_policy" };
      const res = await SellerManageCmsService.getAllManageCmsData({
        queryParams,
      });
      if (res?.success) {
        setCancellationPolicyData(res?.data?.rows[0]);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCancellationPolicyData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.sellerManageCms.cancellationPolicy")} />
      <PageHeader
        heading={t("text.sellerManageCms.cancellationPolicy")}
        userType="seller"
      />
      <div className="static-page p-30 bg-850 radius-20">
        {loading ? (
          <GlobalLoader />
        ) : cancellationPolicyData?.description?.length > 0 ? (
          <>
            <h4>
              {`${t("text.sellerManageCms.lastUpdate")}  ${dateFormatter(
                cancellationPolicyData.updatedAt,
                dateFormatWithMonth
              )}`}
            </h4>
            <p>{stringToHTML(cancellationPolicyData?.description)}</p>
          </>
        ) : (
          <p className="text-center noRecord mb-0">
            {t("text.sellerManageCms.noRecordFound")}
          </p>
        )}
      </div>
    </>
  );
}
