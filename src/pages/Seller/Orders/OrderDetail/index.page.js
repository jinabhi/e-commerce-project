import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  MetaTags,
  SellerBreadcrumb,
  SellerOrderDetailsImage,
  SellerGeneralText,
  SellerDataTable,
  SellerGeneralCoverText,
  SellerPaymentSummary,
  GlobalLoader,
  checkValidData,
  checkValidDateFormatter,
  nameFormatter,
  textFormatter,
  mobileFormatter,
  checkValidCount,
  currencyFormatter,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/sellerRoutes";
import { OrdersServices } from "../../../../services";
import { dateFormatter, logger } from "../../../../utils";

export default function OrderDetails() {
  const { t } = useTranslation();
  const param = useParams();
  const orderId = param?.id;
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [ordersDetails, setOrdersDetails] = useState([]);

  const getOrdersDetails = async (id) => {
    setLoading(true);
    try {
      const res = await OrdersServices.getOrdersDetailsServices(id);
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
  const [totalCount] = useState(0);
  const breadcrumb = [
    {
      path: routesMap.ORDERS.path,
      name: t("text.sellerOrders.title"),
    },

    {
      path: "#",
      name: t("text.sellerOrders.orderDetails"),
    },
  ];

  const columns = [
    {
      dataField: "productName",
      text: t("text.sellerOrders.productName"),
      headerClasses: "w_70",
      formatter: (cell, row) => checkValidData(row?.Product.productName),
    },
    {
      dataField: "variant",
      text: t("text.sellerOrders.variant"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        // commasFormatter(
        //   row?.Product?.sellerProductVariantDetails?.map(
        //     (item) => item.attributeNames
        //   )
        // ),
        checkValidData(
          row?.Product?.sellerProductVariantDetails[0]?.ProductVariantAttribute
            ?.attributeNames
        ),
    },
    {
      dataField: "quantity",
      text: t("text.sellerOrders.quantity"),
      headerClasses: "w_70",
      formatter: checkValidCount,
    },
    {
      dataField: "amount",
      text: t("text.sellerOrders.price"),
      headerClasses: "w_70",
      formatter: (cell) => currencyFormatter(cell, "USD"),
    },
  ];

  return (
    <>
      <section className="detailsPage orderDetails pb">
        <div className="container">
          <MetaTags title={t("text.sellerProductDetails.productDetails")} />
          <SellerBreadcrumb
            breadcrumb={breadcrumb}
            style={{ marginTop: "100px" }}
          />
          {loading ? (
            <GlobalLoader />
          ) : (
            <div className="bg-850 p-30 radius-20 ">
              <div className="mb-30">
                <h3 className="subHeading mb-20 text-white">
                  {t("text.sellerOrders.orderDetails")}
                </h3>
                <div className="row g-3 g-xl-4 row-cols-1 row-cols-sm-2 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 detailsPage_info">
                  <SellerGeneralText
                    label={t("text.sellerOrders.orderID")}
                    value={checkValidData(ordersData?.orderId)}
                  />
                  <SellerGeneralText
                    label={t("text.sellerOrders.orderedOn")}
                    value={checkValidDateFormatter(
                      ordersData?.createdAt,
                      dateFormatter(
                        ordersData?.createdAt,
                        dateTimeFormatWithMonth
                      )
                    )}
                  />
                </div>
              </div>
              {ordersDetails && (
                <div className="mb-20">
                  <div className="row g-3 g-lg-4 flex-wrap orderDetails_items">
                    <SellerOrderDetailsImage
                      orderDetails={ordersDetails}
                      t={t}
                    />
                  </div>
                </div>
              )}
              <div className="mb-30">
                <h3 className="subHeading mb-20 text-white">
                  {t("text.sellerOrders.customerDetails")}
                </h3>
                <div className="row g-3 g-xl-4 row-cols-1 row-cols-sm-2 row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 detailsPage_info">
                  <SellerGeneralText
                    label={t("text.sellerOrders.name")}
                    value={nameFormatter(
                      textFormatter(ordersData?.customer?.firstName),
                      textFormatter(ordersData?.customer?.lastName)
                    )}
                  />
                  <SellerGeneralText
                    label={t("text.sellerOrders.mobileNumber")}
                    value={mobileFormatter(
                      ordersData?.customer?.phoneNumberCountryCode,
                      ordersData?.customer?.phoneNumber
                    )}
                  />
                  <SellerGeneralCoverText
                    label={t("text.sellerOrders.deliveryAddress")}
                    value={checkValidData(
                      `${ordersData?.Address?.address} ${ordersData?.Address?.landmark}`
                    )}
                  />
                </div>
              </div>

              <div className="commontable px-0 pt-0">
                <h3 className="subHeading mb-20 text-white">
                  {t("text.sellerOrders.orderDetails")}
                </h3>
                <SellerDataTable
                  hasLimit
                  tableData={ordersDetails}
                  tableColumns={columns}
                  pagination={false}
                  header={false}
                  totalCount={totalCount}
                />
              </div>
              <div>
                <h3 className="subHeading mb-20 text-white">
                  {t("text.sellerOrders.paymentSummary")}
                </h3>
                <div className="row">
                  <SellerPaymentSummary
                    paymentData={ordersDetails}
                    AmountWithTax={ordersData?.totalAmount}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
