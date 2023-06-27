import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  CollapseField,
  GlobalLoader,
  MetaTags,
  PageHeader,
} from "../../../../components";
import { SellerManageCmsService } from "../../../../services";
import { logger } from "../../../../utils";
import { selectUserData } from "../../../../redux/AuthSlice/index.slice";

export default function Faqs() {
  const { t } = useTranslation();
  const [faqsFirstData, setFaqsFirstData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(selectUserData);
  const getFaqData = async () => {
    setLoading(true);
    try {
      let type = "";
      if (userData?.userRole === "seller") {
        type = "seller";
      } else {
        type = "customer";
      }

      let queryParams = { scope: "activeFaq", type };
      const res = await SellerManageCmsService.getAllFaqsData({ queryParams });
      if (res?.success) {
        setFaqsFirstData(res?.data?.rows);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaqData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.sellerManageCms.faqs")} />
      <PageHeader heading={t("text.sellerManageCms.faq")} userType="seller" />
      <div className="faqpage p-30 bg-850 radius-20 ">
        {loading ? (
          <GlobalLoader />
        ) : faqsFirstData?.length > 0 ? (
          <div className="row d-flex justify-content-center ">
            <div className="col-xxl-10 col-xl-10">
              <div className="faqpage_item">
                <CollapseField text={faqsFirstData} />
              </div>
            </div>
          </div>
        ) : (
          <p className="noRecord m-0 text-center">
            {t("text.common.noRecordFound")}
          </p>
        )}
      </div>
    </>
  );
}
