import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ContactUsForm, MetaTags, PageHeader } from "../../../../components";
import { SellerManageCmsService } from "../../../../services";

import { logger, modalNotification } from "../../../../utils";

export default function SellerContactUs() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onSubmitForm = async (val, resetForm) => {
    setLoading(true);
    try {
      let bodyData = {
        reason: val.reason,
        description: val.description,
        userType: "seller",
      };
      let res = await SellerManageCmsService.postContactUsDetail(bodyData);
      if (res.success) {
        modalNotification({
          type: "success",
          message: res?.message,
        });
        setLoading(false);
        resetForm();
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  return (
    <div className="mb-30">
      <MetaTags title={t("text.sellerManageCms.title")} />
      <PageHeader heading={t("text.sellerManageCms.title")} userType="seller" />
      <div className="contactus p-30 bg-850 radius-20">
        <div className="row">
          <div className="col-lg-7 contactus_img text-center">
            <img
              className="img-fluid"
              src="http://ui.codiantdev.com/morluxury/www//assets/images/contact-us-left.png"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <div className="contactus_form">
              <h5 className="text-white">{t("text.sellerManageCms.title")}</h5>
              <ContactUsForm onSubmit={onSubmitForm} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
