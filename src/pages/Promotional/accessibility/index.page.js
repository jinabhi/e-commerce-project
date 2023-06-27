import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { GlobalLoader, MetaTags, PageHeading } from "../../../components";
import { UserServices } from "../../../services";
import { logger } from "../../../utils";

function Accessibility() {
  const { t } = useTranslation();
  const [accessibilityData, setAccessibilityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAboutUsData = async () => {
    setLoading(true);
    try {
      let queryParams = {
        type: "accessibility",
      };
      const res = await UserServices.cmsService({ queryParams });
      const { success, data } = res;
      if (success) {
        setAccessibilityData(data?.rows);
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
      <MetaTags title={t("text.accessibilityPromotional.metaTitle")} />
      <PageHeading heading={t("text.accessibilityPromotional.heading")} />

      <section className="pt-80 privacy-policy">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="heading text-center">
                {loading ? (
                  <GlobalLoader />
                ) : (
                  <div className="content">
                    {accessibilityData?.[0]?.description ? (
                      parse(accessibilityData?.[0]?.description)
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

export default Accessibility;
