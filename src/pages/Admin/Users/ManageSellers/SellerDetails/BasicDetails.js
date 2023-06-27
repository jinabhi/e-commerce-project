import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import {
  checkValidData,
  checkValidDateFormatter,
  GeneralText,
  ImageField,
  imageFormatter,
  mobileFormatter,
  ModalComponent,
  viewLicenseFormatter,
} from "../../../../../components";
import {
  classicDataTimeFormate,
  classicDateFormat,
} from "../../../../../helpers";
import { dateFormatter } from "../../../../../utils";

function BasicDetails({ basicData }) {
  const storeDetails = basicData?.sellerBrandDetail;
  const bankDetails = basicData?.sellerBankDetail;
  const brandDetails = basicData?.sellerBrandDetail;
  const addressDetails = basicData?.userAddressDetails[0];
  const [show, setShow] = useState(false);
  const [brandLogoShow, setBrandLogoShow] = useState(false);

  const { t } = useTranslation();
  const showDocument = () => {
    setShow(true);
  };
  const showLogo = () => {
    setBrandLogoShow(true);
  };

  return (
    <>
      <div className="card-inner">
        <div className="tab-content">
          <div className="tab-pane active" id="basicDetails">
            {basicData?.profilePictureUrl ? (
              <ImageField
                title={t("text.manageSellers.personalInfo")}
                imagePath={`${basicData?.profilePictureUrl}`}
                alt="user-img"
              />
            ) : (
              <LoadingOutlined />
            )}
            <div className="row mb-5">
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.firstName")}
                value={checkValidData(basicData?.firstName)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.lastName")}
                value={checkValidData(basicData?.lastName)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.mobileNumber")}
                value={mobileFormatter(
                  basicData?.phoneNumberCountryCode,
                  basicData?.phoneNumber
                )}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.emailAddress")}
                value={checkValidData(basicData?.email)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.registeredOn")}
                value={checkValidDateFormatter(
                  basicData?.createdAt,
                  dateFormatter(basicData?.createdAt, classicDateFormat)
                )}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.lastLogin")}
                value={checkValidDateFormatter(
                  basicData?.lastLoginDate,
                  dateFormatter(
                    basicData?.lastLoginDate,
                    classicDataTimeFormate
                  )
                )}
              />
              <div className="col-md-12 pt-4">
                <h5 className="title mb-0">
                  {t("text.manageSellers.storeDetails")}
                </h5>
              </div>
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.storeName")}
                value={checkValidData(storeDetails?.storeName)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.storeContact")}
                value={mobileFormatter(
                  storeDetails?.storeContactNumberCountryCode,
                  storeDetails?.storeContactNumber
                )}
              />
              {storeDetails && (
                <GeneralText
                  extraClassName="col-sm-4 col-xxl-3"
                  label={t("text.manageSellers.license")}
                  value={viewLicenseFormatter(
                    showDocument,
                    t("text.manageSellers.license")
                  )}
                />
              )}

              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.brandName")}
                value={checkValidData(brandDetails?.name)}
              />

              {brandDetails && (
                <GeneralText
                  extraClassName="col-sm-4 col-xxl-3"
                  label={t("text.manageSellers.brandLogo")}
                  value={viewLicenseFormatter(
                    showLogo,
                    t("text.manageSellers.logo")
                  )}
                />
              )}

              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.city")}
                value={checkValidData(addressDetails?.City?.city)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.state")}
                value={checkValidData(addressDetails?.State?.stateName)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.country")}
                value={checkValidData(addressDetails?.Country?.country)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.address")}
                value={checkValidData(storeDetails?.address)}
              />

              <div className="col-md-12 pt-4">
                <h5 className="title mb-0">
                  {t("text.manageSellers.bankDetails")}
                </h5>
              </div>
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.accountHolder")}
                value={checkValidData(bankDetails?.accountHolderName)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.accountNumber")}
                value={checkValidData(bankDetails?.accountNumber)}
              />
              <GeneralText
                extraClassName="col-sm-4 col-xxl-3"
                label={t("text.manageSellers.routingNumber")}
                value={checkValidData(bankDetails?.routingNumber)}
              />
            </div>

            <ModalComponent
              show={show}
              onHandleCancel={() => setShow(false)}
              title={t("text.manageSellers.license")}
              extraClassName="licenseModal"
            >
              {imageFormatter(storeDetails?.storeLicenseDocumentImageUrl)}
            </ModalComponent>
            <ModalComponent
              show={brandLogoShow}
              onHandleCancel={() => setBrandLogoShow(false)}
              title={t("text.manageSellers.brandLogo")}
            >
              {imageFormatter(brandDetails?.brandImageUrl)}
            </ModalComponent>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicDetails;
