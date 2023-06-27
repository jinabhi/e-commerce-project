import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Breadcrumb, MetaTags, PageHeader } from "../../../../../components";
import routesMap from "../../../../../routeControl/adminRoutes";
import { ManageStaffServices } from "../../../../../services";
import { logger } from "../../../../../utils";
import BasicDetails from "./BasicDetails";

function StaffDetails() {
  const { t } = useTranslation();
  const params = useParams();
  const staffId = params.id;

  const [staffDetails, setStaffDetails] = useState({});

  const getStaffDetails = async (id) => {
    try {
      const response = await ManageStaffServices.getStaffById(id);
      if (response.success) {
        setStaffDetails(response.data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (staffId) {
      getStaffDetails(staffId);
    }
  }, []);

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: routesMap.MANAGE_STAFF.path,
      name: t("text.staff.manageStaff"),
    },
    {
      path: "#",
      name: t("text.staff.details"),
    },
  ];

  // const tabContent = [
  //   {
  //     name: "Basic Details",
  //     key: "basic",
  //     content: <BasicDetails staffDetails={staffDetails} />,
  //   },
  //   // Need details and Discussion
  //   // {
  //   //   name: "Reviews & Ratings",
  //   //   key: "review",
  //   //   content: <RatingsReviews ratingData={ratingData} />,
  //   // },
  //   // {
  //   //   name: "Shipping Log",
  //   //   key: "shipping",
  //   //   content: <ShippingLog data={state} col={columns} />,
  //   // },
  // ];
  return (
    <div>
      <MetaTags title={t("text.staff.details")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.staff.details")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <div className="border customerDetail card">
        <div className="card-aside-wrap ">
          <div className="card-content w-100">
            <BasicDetails staffDetails={staffDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDetails;
