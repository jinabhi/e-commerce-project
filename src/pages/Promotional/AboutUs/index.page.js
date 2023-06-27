import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import {
  GlobalLoader,
  ImageElement,
  MetaTags,
  PageHeading,
} from "../../../components";
import config from "../../../config";
import { UserServices } from "../../../services";
import { logger } from "../../../utils";

function AboutUs() {
  const { t } = useTranslation();
  const [aboutUsData, setAboutusData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAboutUsData = async () => {
    setLoading(true);
    try {
      let queryParams = {
        type: "about_us",
      };
      const res = await UserServices.cmsService({ queryParams });
      const { success, data } = res;
      if (success) {
        setAboutusData(data?.rows);
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
      <MetaTags title={t("text.aboutUsPromotional.metaTitle")} />
      <PageHeading heading={t("text.aboutUsPromotional.heading")} />
      <section className="pt-80 aboutContent">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="heading text-center">
                {loading ? (
                  <GlobalLoader />
                ) : (
                  <>
                    <div className="overflow-hidden position-relative">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${config.IMAGE_URL}/thinkapps-brings-ideas-to-life.webp`}
                          alt="thinkapps-brings-ideas-to-life"
                        />
                        {/* <source
                          srcSet={`${config.IMAGE_URL}/thinkapps-brings-ideas-to-life.png`}
                          alt="thinkapps-brings-ideas-to-life"
                        /> */}
                        <ImageElement
                          className="img-fluid"
                          source="thinkapps-brings-ideas-to-life.jpg"
                          alt="thinkapps-brings-ideas-to-life"
                          // loading={loading}
                        />
                      </picture>
                    </div>
                    <div className="content">
                      {aboutUsData?.[0]?.description ? (
                        parse(aboutUsData?.[0]?.description)
                      ) : (
                        <>
                          <p className="text-center">
                            {t("text.common.noData")}
                          </p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
