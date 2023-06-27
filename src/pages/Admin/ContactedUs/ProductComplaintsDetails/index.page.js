import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  AdditionalInfo,
  Breadcrumb,
  checkValidCount,
  checkValidData,
  currencyFormatter,
  GeneralText,
  ImageMapField,
  MetaTags,
  ModalComponent,
  nameFormatter,
  PageHeader,
} from "../../../../components";
import FormContainer from "../../../../components/Common/FormContainer";
import AcceptRejectButton from "../../../../components/UiElement/Button/AcceptRejectButton/index.btn";
import routesMap from "../../../../routeControl/adminRoutes";
import { ContactedUsServices } from "../../../../services/Admin/ContactedUs/index.service";
import { logger, modalNotification } from "../../../../utils";

function ProductComplaintDetails() {
  const { t } = useTranslation();
  const [complainDetails, setComplainDetails] = useState();
  const [complainStatus, setComplainStatus] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [productImage, setProductImage] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState();

  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  async function onStatusConfirm(status) {
    try {
      let bodyData = { productComplaintStatus: status };
      const res = await ContactedUsServices.changeComplainStatusServices(
        bodyData,
        id
      );
      const { success, message } = res;
      if (success) {
        navigate(`${routesMap.PRODUCT_COMPLAINTS.path}`);
        modalNotification({
          type: "success",
          message,
        });
      }
    } catch (error) {
      logger(error);
    }
  }

  const getProductComplaintsDetail = async () => {
    try {
      const res = await ContactedUsServices.getProductComplaintsDetailService(
        id
      );
      const { success, data } = res;
      if (success) {
        setComplainDetails(data);
        setComplainStatus(data?.productComplaintStatus);
        setUserDetails(data?.userDetails);
        setProductImage(data?.damageProductImage ?? []);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductComplaintsDetail();
    }
  }, [id]);

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },

    {
      path: routesMap.PRODUCT_COMPLAINTS.path,
      name: t("text.productComplaints.title"),
    },
    {
      path: "#",
      name: t("text.productComplaintsDetails.title"),
    },
  ];

  const imagePreviewer = (imageUrl) => {
    setImage(imageUrl);
    setShowImage(true);
  };

  return (
    <>
      <MetaTags title={t("text.productComplaintsDetails.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.productComplaintsDetails.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <FormContainer>
        <div className="row mb-5">
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.customerName")}
            value={nameFormatter(userDetails?.firstName, userDetails?.lastName)}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.brandName")}
            value={checkValidData(complainDetails?.productDetails?.Brand?.name)}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.productName")}
            value={checkValidData(complainDetails?.productDetails?.productName)}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.price")}
            value={currencyFormatter(
              complainDetails?.productDetails?.price,
              "USD"
            )}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.quantity")}
            value={checkValidCount(complainDetails?.orderQuantity)}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.category")}
            value={checkValidData(
              complainDetails?.productDetails?.categoryDetails?.name
            )}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.deliveredDate")}
            value={checkValidData(
              complainDetails?.productDetails?.categoryDetails?.deliveryDate
            )}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.deliveredTime")}
            value={checkValidData(
              complainDetails?.productDetails?.categoryDetails?.deliveryTime
            )}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.carrierName")}
            value={checkValidData(
              complainDetails?.productDetails?.categoryDetails?.CarrerName
            )}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.productComplaintsDetails.trackingId")}
            value={checkValidData(
              complainDetails?.productDetails?.categoryDetails?.trackingId
            )}
          />
          {complainDetails?.CreditPoint && (
            <GeneralText
              extraClassName="col-sm-4 col-xxl-3"
              label={t("text.productComplaintsDetails.creditPoint")}
              value={checkValidData(complainDetails?.CreditPoint?.point)}
            />
          )}

          {complainDetails?.productDetails?.sellerProductVariantDetails
            ?.length >= 1 &&
            complainDetails?.productDetails?.sellerProductVariantDetails.map(
              (item, key) => {
                return (
                  <GeneralText
                    extraClassName="col-sm-4 col-xxl-3"
                    label={item?.ProductVariant?.name || ""}
                    value={item?.ProductVariantAttribute?.attributeNames}
                    key={key}
                  />
                );
              }
            )}

          {complainStatus === "pending" && (
            <div className="col-sm-12 ">
              <div className="profile-ud wider">
                <span className="profile-ud-value text-left">
                  <AcceptRejectButton
                    extraClassName="btn btn-success mr-2"
                    imageClassName="icon ni ni-check-circle mr-1"
                    onClick={(e) => {
                      e.preventDefault();
                      onStatusConfirm("accepted");
                    }}
                    text={t("text.common.accept")}
                  />
                  <AcceptRejectButton
                    extraClassName="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      onStatusConfirm("rejected");
                    }}
                    imageClassName="icon ni ni-cross-circle mr-1"
                    text={t("text.common.reject")}
                  />
                </span>
              </div>
            </div>
          )}
          <AdditionalInfo
            heading={t("text.productComplaintsDetails.additionalInformation")}
            content={complainDetails?.description}
          />
        </div>

        <div className="row categoryRow mb-5">
          <ImageMapField
            data={productImage}
            heading={t("text.productComplaintsDetails.damagedImages")}
            imagePreviewer={imagePreviewer}
          />
        </div>

        <ModalComponent
          onHandleCancel={() => setShowImage(false)}
          show={showImage}
        >
          <img src={image} alt="product" className="w-100" />
        </ModalComponent>
      </FormContainer>
    </>
  );
}

export default ProductComplaintDetails;
