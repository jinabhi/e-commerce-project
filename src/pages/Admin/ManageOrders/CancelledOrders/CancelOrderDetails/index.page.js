import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  FormContainer,
  MetaTags,
  OrderStatusTracker,
  PageHeader,
  PaymentSummary,
  ProductDetails,
  ManageOrderDetailsText,
  GlobalLoader,
  checkValidData,
  mobileFormatter,
  nameFormatter,
  textFormatter,
  checkValidDateFormatter,
  currencyFormatter,
} from "../../../../../components";
import { dateTimeFormatWithMonth } from "../../../../../helpers";
import routesMap from "../../../../../routeControl/adminRoutes";
import { OrdersServices } from "../../../../../services";
import { dateFormatter, logger } from "../../../../../utils";

export default function CancelOrderDetails() {
  const { t } = useTranslation();
  const param = useParams();
  const orderId = param?.id;
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [ordersDetails, setOrdersDetails] = useState([]);

  const getOrdersDetails = async (id) => {
    setLoading(true);
    try {
      const res = await OrdersServices.getadminOrdersDetailsServices(id);
      const { data, success } = res;
      if (success) {
        setOrdersData(data[0]);
        setOrdersDetails(data[0]?.orderDetails);
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
      getOrdersDetails(parseInt(orderId));
    }
  }, [orderId]);

  const statusData = [
    {
      orderStatus: ordersData?.status === "canceled" && "Cancelled",
      data: [
        {
          status: ordersData?.status,
          data: [
            {
              name: "Order Received",
              value: checkValidDateFormatter(
                ordersData?.createdAt,
                dateFormatter(ordersData?.createdAt, dateTimeFormatWithMonth)
              ),
            },
            {
              name: "Cancelled On",
              value: checkValidDateFormatter(
                ordersData?.canceledOn,
                dateFormatter(ordersData?.canceledOn, dateTimeFormatWithMonth)
              ),
            },
          ],
        },
      ],
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },

    {
      path: routesMap.CANCELLED_ORDER.path,
      name: t("text.manageOrders.cancelledOrders"),
    },
    {
      path: "#",
      name: t("text.manageOrders.cancelledOrdersDetails"),
    },
  ];
  return (
    <>
      <MetaTags title={t("text.manageOrders.cancelledOrdersDetails")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageOrders.cancelledOrdersDetails")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      {loading ? (
        <GlobalLoader />
      ) : (
        <FormContainer extraClassName="d-flex flex-wrap">
          <div className="col-md-8">
            <div className="row mb-5">
              <div className="col-md-12">
                <h5 className="title mb-1">
                  {t("text.manageOrders.orderDetails")}
                </h5>
              </div>
              <ManageOrderDetailsText
                label={t("text.manageOrders.orderID")}
                value={checkValidData(ordersData?.orderId)}
              />
              <ManageOrderDetailsText
                label={t("text.manageOrders.orderedOn")}
                value={checkValidDateFormatter(
                  ordersData?.createdAt,
                  dateFormatter(ordersData?.createdAt, dateTimeFormatWithMonth)
                )}
              />
              <ManageOrderDetailsText
                label={t("text.manageOrders.orderTotal")}
                value={currencyFormatter(ordersData?.totalAmount, "USD")}
              />

              {ordersDetails && (
                <ProductDetails
                  heading={t("text.manageOrders.productDetails")}
                  productDetailsData={ordersDetails}
                />
              )}

              <div className="col-md-12 pt-4">
                <h5 className="title mb-1">
                  {t("text.manageOrders.customerDetails")}
                </h5>
              </div>
              <ManageOrderDetailsText
                label={t("text.manageOrders.name")}
                value={nameFormatter(
                  textFormatter(ordersData?.customer?.firstName),
                  textFormatter(ordersData?.customer?.lastName)
                )}
              />
              <ManageOrderDetailsText
                label={t("text.manageOrders.mobileNumber")}
                value={mobileFormatter(
                  ordersData?.customer?.phoneNumberCountryCode,
                  ordersData?.customer?.phoneNumber
                )}
              />
              <ManageOrderDetailsText
                extraClassName="col-xxl-12 mb-3"
                label={t("text.manageOrders.deliveryAddress")}
                value={checkValidData(
                  `${ordersData?.Address?.address}${" "}${
                    ordersData?.Address?.landmark
                  }`
                )}
              />
              <PaymentSummary
                heading={t("text.manageOrders.paymentSummary")}
                paymentData={ordersDetails}
                ordersData={ordersData}
              />
            </div>
          </div>
          <OrderStatusTracker orderStatusData={statusData} />
        </FormContainer>
      )}
    </>
  );
}
