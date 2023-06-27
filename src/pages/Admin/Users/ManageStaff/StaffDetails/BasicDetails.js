import React from "react";
import { useTranslation } from "react-i18next";
import {
  checkValidDateFormatter,
  GeneralText,
  ImageField,
  textFormatter,
} from "../../../../../components";
import {
  classicDataTimeFormate,
  classicDateFormat,
} from "../../../../../helpers";
import { dateFormatter } from "../../../../../utils";

function BasicDetails({ staffDetails }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="card-inner">
        <div className="tab-content">
          <div className="tab-pane active" id="basicDetails">
            <ImageField
              title={t("text.manageSellers.personalInfo")}
              imagePath={staffDetails?.profilePictureUrl || ""}
              alt="user-img"
            />
            <div className="row mb-5">
              <GeneralText
                label={t("text.manageSellers.fullName")}
                extraClassName="col-sm-4 col-xxl-3"
                value={`${textFormatter(
                  staffDetails?.firstName
                )} ${textFormatter(staffDetails?.lastName)}`}
              />
              <GeneralText
                label={t("text.manageSellers.mobileNumber")}
                extraClassName="col-sm-4 col-xxl-3"
                value={`${staffDetails?.phoneNumberCountryCode || ""} ${
                  staffDetails?.phoneNumber || ""
                }`}
              />
              <GeneralText
                label={t("text.manageSellers.emailAddress")}
                extraClassName="col-sm-4 col-xxl-3"
                value={staffDetails?.email || "-"}
              />
              <GeneralText
                label={t("text.manageSellers.registeredOn")}
                extraClassName="col-sm-4 col-xxl-3"
                value={checkValidDateFormatter(
                  staffDetails.createdAt,
                  dateFormatter(staffDetails.createdAt, classicDateFormat)
                )}
              />
              <GeneralText
                label={t("text.manageSellers.lastLogin")}
                extraClassName="col-sm-4 col-xxl-3"
                value={checkValidDateFormatter(
                  staffDetails?.lastLoginDate,
                  dateFormatter(
                    staffDetails.lastLoginDate,
                    classicDataTimeFormate
                  )
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicDetails;
