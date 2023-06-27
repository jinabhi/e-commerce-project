import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { GlobalLoader, MetaTags, PageHeading } from "../../../components";
import { UserServices } from "../../../services";
import { logger } from "../../../utils";

function PrivacyPolicy() {
  const { t } = useTranslation();
  const [privacyData, setPrivacyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAboutUsData = async () => {
    setLoading(true);
    try {
      let queryParams = {
        type: "privacy_policy",
      };
      const res = await UserServices.cmsService({ queryParams });
      const { success, data } = res;
      if (success) {
        setPrivacyData(data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAboutUsData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.privacyPolicyPromotional.metaTitle")} />
      <PageHeading heading={t("text.privacyPolicyPromotional.heading")} />

      <section className="pt-80 privacy-policy">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="heading text-center">
                {loading ? (
                  <GlobalLoader />
                ) : (
                  <div className="content">
                    {privacyData?.[0]?.description ? (
                      parse(privacyData?.[0]?.description)
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

export default PrivacyPolicy;
