import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  //   DataTable,
  //   FormContainer,
  //   GeneralText,
  //   ImageField,
  //   ImageMapField,
  MetaTags,
  PageHeader,
  Tabs,
} from "../../../../../components";
import routesMap from "../../../../../routeControl/adminRoutes";
// import { commonServices } from "../../../../../services";
import { ManageSellerServices } from "../../../../../services/Admin/Users/ManageSeller/index.service";
import { logger } from "../../../../../utils";
import BasicDetails from "./BasicDetails";
import RatingsReviews from "./RatingsReviews";
import ShippingLog from "./ShippingLog";

function SellerDetails() {
  const { t } = useTranslation();
  const params = useParams();
  const sellerId = params?.id;

  const [basicData, setBasicData] = useState();

  const getProductDetail = async (id) => {
    try {
      const res = await ManageSellerServices.getSellerDetailService(id);
      const { data, success } = res;
      if (success) {
        setBasicData(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (sellerId) {
      getProductDetail(parseInt(sellerId));
    }
  }, [sellerId]);

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },

    {
      path: routesMap.MANAGE_SELLERS.path,
      name: t("text.manageSellers.manageSellers"),
    },
    {
      path: "#",
      name: t("text.manageSellers.details"),
    },
  ];

  const tabContent = [
    {
      name: "Basic Details",
      key: "basic",
      content: <BasicDetails basicData={basicData} />,
    },
    {
      name: "Reviews & Ratings",
      key: "review",
      content: <RatingsReviews sellerId={sellerId} />,
    },
    {
      name: "Shipping Log",
      key: "shipping",
      content: <ShippingLog sellerId={sellerId} />,
    },
  ];
  return (
    <div>
      <MetaTags title={t("text.manageSellers.details")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageSellers.details")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <div className="border customerDetail card">
        <div className="card-aside-wrap ">
          <div className="card-content w-100">
            <Tabs tabContent={tabContent} tabsFor="details" border />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDetails;
