import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  ManageCmsForm,
  Breadcrumb,
  MetaTags,
  PageHeader,
} from "../../../../components";

import routesMap from "../../../../routeControl/adminRoutes";
import { commonServices } from "../../../../services";
import { logger, modalNotification } from "../../../../utils";

function EditTermsAndCondition() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const param = useParams();
  const [initialData, setInitialData] = useState();

  const getTermsAndConditionData = async (id) => {
    try {
      const res = await commonServices.getManageCmsModuleService(id);
      const { success, data } = res;
      if (success) {
        setInitialData(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getTermsAndConditionData(param.id);
  }, []);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let bodyData = {
        description: values.description,
      };
      const res = await commonServices.updateManageCmsService(
        bodyData,
        param.id
      );
      const { success } = res;
      if (success) {
        modalNotification({
          type: "success",
          message: t("text.aboutUs.updateMessage"),
        });
        navigate(routesMap.MANAGE_CMS.path);
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  const onCancel = () => {
    navigate(routesMap.MANAGE_CMS.path);
  };

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: routesMap.MANAGE_CMS.path,
      name: t("text.manageCms.pageTitle"),
    },
    {
      path: "#",
      name: t("text.aboutUs.pageName"),
    },
  ];

  return (
    <>
      <MetaTags title={t("text.aboutUs.pageName")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.aboutUs.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <ManageCmsForm
        onSubmit={onSubmit}
        loading={loading}
        onCancel={onCancel}
        initialData={initialData}
      />
    </>
  );
}

export default EditTermsAndCondition;
