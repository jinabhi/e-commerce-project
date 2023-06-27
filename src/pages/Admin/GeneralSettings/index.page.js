import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  GeneralSettingForm,
  MetaTags,
  PageHeader,
} from "../../../components";
import routesMap from "../../../routeControl/adminRoutes";
import { GeneralSettingServices } from "../../../services";
import { logger, modalNotification } from "../../../utils";

function GeneralSettings() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [initialValues, setInitialValues] = useState({
    tax: "",
    credit_point: "",
    minimum_quantity_product: "",
    commission: "",
    promotion_video: false,
  });
  const [promotionVideoChecked, setPromotionVideoChecked] = useState(false);

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.generalSetting.title"),
    },
  ];

  const editGeneralSettings = () => {
    setShow(true);
  };

  const generalSettingDetails = async () => {
    try {
      const res = await GeneralSettingServices.getGeneralSettingService();
      const { success, data } = res;
      if (success) {
        let object = data.rows.reduce(
          (obj, item) => Object.assign(obj, { [item.key]: item.value }),
          {}
        );
        object.promotion_video = object.promotion_video.toString();
        const initial = {
          tax: object?.tax || "",
          credit_point: object?.credit_point || "",
          minimum_quantity_product: object?.minimum_quantity_product || "",
          commission: object?.commission || "",
          promotion_video: object.promotion_video === "1",
        };
        setInitialValues({ ...initial });
        setPromotionVideoChecked(object.promotion_video === "1");
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    generalSettingDetails();
  }, []);

  const cancelGeneralSettings = async () => {
    formRef.current.resetForm({ ...initialValues });
    setPromotionVideoChecked(initialValues.promotion_video);
    setShow(false);
    setLoading(false);
  };

  async function updateGeneralSetting(values) {
    setLoading(true);
    let payloadData = { ...values };
    payloadData.promotion_video = payloadData.promotion_video ? "1" : "0";
    try {
      const res = await GeneralSettingServices.updateGeneralSettingService(
        payloadData
      );
      const { message, success } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setShow(false);
      }
      generalSettingDetails();
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  }

  return (
    <>
      <MetaTags title={t("text.generalSetting.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.generalSetting.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-12">
          <div className="border settingForm card">
            <div className="card-aside-wrap ">
              <div className="card-content w-100">
                <div className="card-inner">
                  <GeneralSettingForm
                    onSubmit={updateGeneralSetting}
                    show={show}
                    editGeneral={editGeneralSettings}
                    formRef={formRef}
                    cancelEdit={cancelGeneralSettings}
                    loading={loading}
                    initialValues={initialValues}
                    promotionVideoChecked={promotionVideoChecked}
                    setPromotionVideoChecked={setPromotionVideoChecked}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralSettings;
