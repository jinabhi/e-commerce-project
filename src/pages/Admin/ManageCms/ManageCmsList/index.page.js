import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  actionFormatter,
  Breadcrumb,
  DataTable,
  MetaTags,
  PageHeader,
} from "../../../../components";
import routesMap from "../../../../routeControl/adminRoutes";
import { commonServices } from "../../../../services";
import { logger } from "../../../../utils";

function ManageCms() {
  const { t } = useTranslation();
  const [manageCmsList, setManageCmsList] = useState([]);
  const [tableLoader, setTableLoader] = useState(false);

  const getManageCmsData = async () => {
    setTableLoader(true);
    try {
      const res = await commonServices.getManageCmsService();
      const { success, data } = res;
      if (success) {
        setManageCmsList(data?.rows);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getManageCmsData();
  }, []);

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.edit"),
        icon: "icon ni ni-edit",
        action: "redirect",
        path:
          row?.cmsKey === "accessibility"
            ? `${routesMap.ACCESSIBILITY.path}/${row?.id}`
            : row?.cmsKey === "terms_conditions"
            ? `${routesMap.EDIT_TERMS_CONDITION.path}/${row?.id}`
            : row?.cmsKey === "privacy_policy"
            ? `${routesMap.PRIVACY_POLICY.path}/${row?.id}`
            : row?.cmsKey === "about_us"
            ? `${routesMap.ABOUT_US.path}/${row?.id}`
            : row?.cmsKey === "cancellation_policy"
            ? `${routesMap.CANCELLATION_POLICY.path}/${row?.id}`
            : row?.cmsKey === "returns_refund_policy"
            ? `${routesMap.RETURN_AND_REFUND_POLICY.path}/${row?.id}`
            : row?.cmsKey === "how_it_works"
            ? `${routesMap.HOW_IT_WORKS.path}/${row?.id}`
            : row?.cmsKey === "faq" && routesMap.FAQs.path,
      },
    ];

    return optionsArr;
  };

  const columns = [
    {
      dataField: "pageName",
      text: t("text.manageCms.pageName"),
    },
    {
      dataField: "action",
      text: t("text.manageCms.action"),
      headerClasses: "text-right no-sort",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.child.dashboard"),
    },
    {
      path: "#",
      name: t("text.manageCms.pageTitle"),
    },
  ];

  return (
    <>
      <MetaTags title={t("text.manageCms.pageTitle")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageCms.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>

      <DataTable
        tableData={manageCmsList}
        tableColumns={columns}
        header={false}
        pagination={false}
        bordered
        tableLoader={tableLoader}
      />
    </>
  );
}

export default ManageCms;
