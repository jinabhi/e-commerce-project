import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EmailForm, MetaTags, PageHeading } from "../../../components";
import { UserServices } from "../../../services";
import { logger } from "../../../utils";
import modalNotification from "../../../utils/notifications";

function ContactUs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [contactUsLoading, setContactUsLoading] = useState(false);

  const onSubmit = async (value, resetForm) => {
    setContactUsLoading(true);
    try {
      let bodyData = {
        ...value,
      };
      delete bodyData.to;
      const res = await UserServices.emailService(bodyData);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
        resetForm();
      }
    } catch (error) {
      logger(error);
    }
    setContactUsLoading(false);
  };

  return (
    <>
      <MetaTags title={t("text.contactPromotional.metaTitle")} />
      <PageHeading heading={t("text.contactPromotional.heading")} />

      <section className="pt-80 pb-50 privacy-policy">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <EmailForm onSubmit={onSubmit} loading={contactUsLoading} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
