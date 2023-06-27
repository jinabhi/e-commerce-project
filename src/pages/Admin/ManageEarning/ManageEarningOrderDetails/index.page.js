import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  checkValidCount,
  checkValidData,
  checkValidDateFormatter,
  currencyFormatter,
  FormContainer,
  GlobalLoader,
  ManageOrderDetailsText,
  MetaTags,
  mobileFormatter,
  ModalComponent,
  nameFormatter,
  PageHeader,
  ProductDetails,
  textFormatter,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/adminRoutes";
import { EarningsServices } from "../../../../services";
import { dateFormatter, logger, readMoreTextShow } from "../../../../utils";

export default function ManageEarningOrdersDetails() {
  const { t } = useTranslation();
  const { orderId } = useParams();
  const [loading, setLoading] = useState();
  const [orderDetails, setOrdersDetails] = useState([]);
  const [brandDetails, setBrandDetails] = useState([]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [modalTitle, setModalTitle] = useState("");

  const getOrderEarningDetails = async (id) => {
    setLoading(true);
    try {
      const res = await EarningsServices.getEarningDetailsById(id);
      const { data, success } = res;
      if (success) {
        setOrdersDetails(data?.result);
        setBrandDetails(data?.brandArray);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (orderId) {
      getOrderEarningDetails(orderId);
    }
  }, [orderId]);

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: routesMap.MANAGE_EARNING.path,
      name: t("text.manageEarning.manageEarnings"),
    },
    {
      path: "#",
      name: t("text.manageEarning.orderDetails"),
    },
  ];

  const showMoreText = (data, text) => {
    setShowReadMore(true);
    setReadData(data);
    setModalTitle(text);
  };

  const onCloseVariantModal = () => {
    setShowReadMore(false);
    setReadData("");
    setModalTitle("");
  };
  return (
    <>
      <MetaTags title={t("text.manageEarning.activeOrdersDetails")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageEarning.activeOrdersDetails")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      {loading ? (
        <GlobalLoader />
      ) : (
        <FormContainer extraClassName="d-flex flex-wrap">
          <div className="col-md-12">
            <div className="row mb-5">
              <div className="col-md-12">
                <h5 className="title mb-1">
                  {t("text.manageEarning.orderDetails")}
                </h5>
              </div>
              <ManageOrderDetailsText
                manageEarningClass
                label={t("text.manageEarning.orderID")}
                value={checkValidData(orderDetails?.orderId)}
              />
              <ManageOrderDetailsText
                manageEarningClass
                label={t("text.manageEarning.customerName")}
                value={nameFormatter(
                  textFormatter(orderDetails?.customer?.firstName),
                  textFormatter(orderDetails?.customer?.lastName)
                )}
              />
              <ManageOrderDetailsText
                manageEarningClass
                label={t("text.manageEarning.orderedOn")}
                value={checkValidDateFormatter(
                  orderDetails?.createdAt,
                  dateFormatter(
                    orderDetails?.createdAt,
                    dateTimeFormatWithMonth
                  )
                )}
              />

              <ManageOrderDetailsText
                manageEarningClass
                label={t("text.manageEarning.deliveredOn")}
                value={checkValidDateFormatter(
                  orderDetails?.deliveredOn,
                  dateFormatter(
                    orderDetails?.deliveredOn,
                    dateTimeFormatWithMonth
                  )
                )}
              />

              <ManageOrderDetailsText
                manageEarningClass
                label={t("text.manageEarning.orderTotal")}
                value={currencyFormatter(orderDetails?.totalAmount, "USD")}
              />
              <ProductDetails
                manageEarningClass
                heading={t("text.manageEarning.productDetails")}
                productDetailsData={orderDetails?.orderDetails}
              />

              <div className="col-md-12 pt-4">
                <h5 className="title mb-1">
                  {t("text.manageEarning.customerDetails")}
                </h5>
              </div>
              <ManageOrderDetailsText
                label={t("text.manageEarning.name")}
                value={nameFormatter(
                  textFormatter(orderDetails?.customer?.firstName),
                  textFormatter(orderDetails?.customer?.lastName)
                )}
              />
              <ManageOrderDetailsText
                label={t("text.manageEarning.mobileNumber")}
                value={mobileFormatter(
                  orderDetails?.customer?.phoneNumberCountryCode,
                  orderDetails?.customer?.phoneNumber
                )}
              />
              <ManageOrderDetailsText
                extraClassName="col-xxl-12 mb-3"
                label={t("text.manageEarning.deliveryAddress")}
                value={checkValidData(
                  `${orderDetails?.Address?.address}${" "}${
                    orderDetails?.Address?.landmark
                  }`
                )}
              />
              <div className="col-md-12">
                <h5 className="title mb-3">
                  {t("text.manageEarning.productInfo")}
                </h5>
                {brandDetails?.map((orderItems, i) => {
                  return (
                    <>
                      {" "}
                      <div className="mb-md-4 mb-3" key={i}>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="bg-light">
                                {" "}
                                {t("text.manageEarning.brandName")}
                              </th>
                              <th className="bg-light">
                                {" "}
                                {t("text.manageEarning.productName")}
                              </th>
                              <th className="bg-light">
                                {" "}
                                {t("text.manageEarning.variant")}
                              </th>
                              <th className="bg-light">
                                {" "}
                                {t("text.manageEarning.quantityAre")}
                              </th>
                              <th className="bg-light">
                                {" "}
                                {t("text.manageEarning.price")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderItems?.map((item) => {
                              return (
                                <tr>
                                  <td>{item?.Brand?.name}</td>
                                  <td>
                                    {readMoreTextShow(
                                      item?.Product?.productName,
                                      () =>
                                        showMoreText(
                                          item?.Product?.productName,
                                          t("text.manageEarning.productName")
                                        )
                                    )}
                                  </td>
                                  <td>
                                    {readMoreTextShow(
                                      item?.Product?.sellerProductVariantDetails?.map(
                                        (variants, index) => {
                                          return (
                                            (index ? ", " : "") +
                                            variants?.ProductVariantAttribute
                                              ?.attributeNames
                                          );
                                        }
                                      ),
                                      () =>
                                        showMoreText(
                                          item?.Product?.sellerProductVariantDetails?.map(
                                            (variants, index) => {
                                              return (
                                                (index ? ", " : "") +
                                                variants
                                                  ?.ProductVariantAttribute
                                                  ?.attributeNames
                                              );
                                            }
                                          ),
                                          t("text.manageEarning.variant")
                                        )
                                    )}
                                  </td>
                                  <td>{item?.quantity}</td>
                                  <td>
                                    {currencyFormatter(item?.amount, "USD")}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th className="bg-light"> </th>
                              <th className="bg-light">
                                {t("text.manageEarning.adminsCommission")} -{" "}
                                {checkValidCount(
                                  orderItems[0]?.Brand?.commission
                                )}
                                %
                              </th>
                              <th className="bg-light">
                                {t("text.manageEarning.sellersShare")} -{" "}
                                {currencyFormatter(
                                  orderItems[0]?.Brand?.sellerCommission,
                                  "USD"
                                )}
                              </th>
                              <th className="bg-light">
                                {t("text.manageEarning.myEarnings")} -
                                {currencyFormatter(
                                  orderItems[0]?.Brand?.adminCommission,
                                  "USD"
                                )}{" "}
                                {}
                              </th>
                              <th className="bg-light">
                                {t("text.manageEarning.orderTotal")} -
                                {currencyFormatter(
                                  orderItems[0]?.Brand?.totalAmount,
                                  "USD"
                                )}
                              </th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </>
                  );
                })}{" "}
              </div>
            </div>
          </div>
          <ModalComponent
            show={showReadMore}
            onHandleCancel={onCloseVariantModal}
            title={modalTitle}
          >
            <p className="text-break">{readData}</p>
          </ModalComponent>
        </FormContainer>
      )}
    </>
  );
}
