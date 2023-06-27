import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GlobalLoader, MetaTags, PageHeader } from "../../../../components";
import { SellerManageCmsService } from "../../../../services";
import { logger, stringToHTML } from "../../../../utils";

export default function HowItWorks() {
  const [howItWorksData, setHowItWorkData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [howItWorkIconList, setHowItWorkIconList] = useState([]);
  const { t } = useTranslation();

  const getHowItWorksList = async () => {
    setLoading(true);
    try {
      const res = await SellerManageCmsService.getAllHowItWorksData();
      if (res?.success) {
        setHowItWorkIconList(res?.data?.rows);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const getHowItWorksCmsData = async () => {
    setLoading(true);
    try {
      let queryParams = { type: "how_it_works" };
      const res = await SellerManageCmsService.getAllManageCmsData({
        queryParams,
      });
      if (res?.success) {
        setHowItWorkData(res?.data?.rows[0]);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getHowItWorksList();
    getHowItWorksCmsData();
  }, []);

  return (
    <div>
      <MetaTags title={t("text.sellerManageCms.howItWorks")} />
      <PageHeader
        heading={t("text.sellerManageCms.howItWorks")}
        userRol="seller"
      />
      <div className="howitWorks static-page p-30 bg-850 radius-20">
        <div className="row">
          <div className="col-xxl-4 col-xl-4 text-center mb-30">
            <img
              className="img-fluid left-img"
              src="http://ui.codiantdev.com/morluxury/www//assets/images/how-it-works.png"
              alt="how-to-works"
            />
          </div>
          <div className={`col-xxl-6 col-xl-8 offset-xxl-1 ${(loading || howItWorksData?.description?.length === 0)  ? 'align-self-center': ''}`}>
            {loading ? (
                <GlobalLoader />
            ) : howItWorksData?.description?.length > 0 ? (
              <>
                {stringToHTML(howItWorksData?.description)}
              </>
            ) : (
              <p className="text-center noRecord mb-0">
                {t("text.sellerManageCms.noRecordFound")}
              </p>
            )}
          </div>
        </div>

        <div className="row workprocess text-center">
          <>
            {loading ? (
              <GlobalLoader />
            ) : howItWorkIconList?.length > 0 ? (
              <>
                {howItWorkIconList?.map((List, i) => {
                  return (
                    <>
                      <div className="col-md-4" key={i}>
                        <div className="workprocess_img">
                          <img
                            src="http://ui.codiantdev.com/morluxury/www//assets/images/international-shipping.svg"
                            alt="international-shipping"
                          />
                        </div>
                        <div className="workprocess_cont">
                          <h4>{stringToHTML(List?.title)}</h4>

                          <p className="text-break">
                            {stringToHTML(List?.description)}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <p className="text-center noRecord mb-0">
                {t("text.sellerManageCms.noRecordFound")}
              </p>
            )}
          </>
        </div>
      </div>{" "}
    </div>
  );
}
