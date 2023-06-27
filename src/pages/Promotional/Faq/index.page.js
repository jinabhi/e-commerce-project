import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AccordionComponent,
  CommonButton,
  GlobalLoader,
  MetaTags,
  PageHeading,
} from "../../../components";
import { UserServices } from "../../../services";
import { logger } from "../../../utils";

function Faq() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [sizePerPage] = useState(7);
  const [faqData, setFaqData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const GetFaqData = async () => {
    setLoading(true);
    try {
      let queryParams = {
        limit: sizePerPage,
        offset: (page - 1) * sizePerPage,
        type: "promotional",
      };
      const res = await UserServices.faqService({ queryParams });
      const { success, data } = res;
      if (success) {
        setFaqData([...faqData, ...data?.rows]);
        setTotalData(data?.count);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (totalData !== 0 && totalData <= page * sizePerPage) {
      setDisableButton(true);
    }
    GetFaqData();
  }, [page]);

  const updatePage = () => {
    if (totalData >= page * sizePerPage) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <MetaTags title={t("text.faqPromotional.metaTitle")} />
      <PageHeading heading={t("text.faqPromotional.heading")} />

      <section className="pt-80 pb-40">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="heading text-center">
                <div className="content">
                  <p>
                    Delighted to know that you want to learn something from us.
                    Here are few
                    <br className="d-lg-block d-none" />
                    things to know before you apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <GlobalLoader />
        ) : (
          <div className="container">
            <div className="row ">
              <div className="col-lg-10 col-sm-12 mx-auto customFaq">
                {faqData.length !== 0 ? (
                  <>
                    <AccordionComponent AccordionContent={faqData} />
                    <div className="text-center">
                      <CommonButton
                        className="btn btn-primary-outline ripple-effect flex-shrink-0 w190 mt-4"
                        onClick={updatePage}
                        loading={disableButton}
                      >
                        {t("text.common.seeMore")}
                      </CommonButton>
                    </div>
                  </>
                ) : (
                  <p className="text-center">{t("text.common.noData")}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Faq;
