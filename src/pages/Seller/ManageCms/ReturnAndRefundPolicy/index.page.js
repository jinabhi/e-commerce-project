import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { GlobalLoader, MetaTags, PageHeader } from "../../../../components";
import { dateFormatWithMonth } from "../../../../helpers";
import { SellerManageCmsService } from "../../../../services/Seller/ManageCms/index.service";
import { dateFormatter, logger, stringToHTML } from "../../../../utils";

export default function SellerReturnAndRefundPolicy() {
  const [returnAndRefundPolicyData, setReturnAndRefundPolicyData] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const getReturnsRefundPolicyData = async () => {
    setLoading(true);
    try {
      let queryParams = { type: "returns_refund_policy" };
      const res = await SellerManageCmsService.getAllManageCmsData({
        queryParams,
      });
      if (res?.success) {
        setReturnAndRefundPolicyData(res?.data?.rows[0]);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReturnsRefundPolicyData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.sellerManageCms.returnsRefundPolicy")} />
      <PageHeader
        heading={t("text.sellerManageCms.returnsRefundPolicy")}
        userType="seller"
      />
      <div className="static-page p-30 bg-850 radius-20">
        {loading ? (
          <GlobalLoader />
        ) : returnAndRefundPolicyData?.description?.length > 0 ? (
          <>
            <h4>
              {`${t("text.sellerManageCms.lastUpdate")}  ${dateFormatter(
                returnAndRefundPolicyData?.updatedAt,
                dateFormatWithMonth
              )}`}
            </h4>
            <p>{stringToHTML(returnAndRefundPolicyData?.description)}</p>
          </>
        ) : (
          <p className="text-center">
            {t("text.sellerManageCms.noRecordFound")}
          </p>
        )}
      </div>
    </>
  );
}
