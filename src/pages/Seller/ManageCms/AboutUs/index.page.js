import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { GlobalLoader, MetaTags, PageHeader } from "../../../../components";
import { SellerManageCmsService } from "../../../../services/Seller/ManageCms/index.service";
import { logger, stringToHTML } from "../../../../utils";

export default function SellerAboutUs() {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const getAboutUsData = async () => {
    setLoading(true);
    try {
      let queryParams = { type: "about_us" };
      const res = await SellerManageCmsService.getAllManageCmsData({
        queryParams,
      });
      if (res?.success) {
        setAboutUsData(res?.data?.rows[0]);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAboutUsData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.sellerManageCms.aboutUs")} />
      <PageHeader
        heading={t("text.sellerManageCms.aboutUs")}
        userType="seller"
      />
      <div className="static-page p-30 bg-850 radius-20">
          {loading ? (
            <GlobalLoader />
          ) : aboutUsData?.description?.length > 0 ? (
            <p>{stringToHTML(aboutUsData?.description)}</p>
          ) : (
            <p className="text-center noRecord mb-0">
              {t("text.sellerManageCms.noRecordFound")}
            </p>
          )}
      </div>
    </>
  );
}
