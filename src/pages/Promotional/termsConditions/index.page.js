import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { GlobalLoader, MetaTags, PageHeading } from "../../../components";
import { UserServices } from "../../../services";
import { logger } from "../../../utils";

function TermsConditions() {
  const { t } = useTranslation();
  const [termsData, setTermsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTermsData = async () => {
    setLoading(true);
    try {
      let queryParams = {
        type: "terms_conditions",
      };
      const res = await UserServices.cmsService({ queryParams });
      const { success, data } = res;
      if (success) {
        setTermsData(data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTermsData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.termsPromotional.metaTitle")} />
      <PageHeading heading={t("text.termsPromotional.heading")} />

      <section className="pt-80 privacy-policy">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="heading text-center">
                {loading ? (
                  <GlobalLoader />
                ) : (
                  <div className="content">
                    {termsData?.[0]?.description ? (
                      parse(termsData?.[0]?.description)
                    ) : (
                      <>
                        <p className="text-center">{t("text.common.noData")}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsConditions;
