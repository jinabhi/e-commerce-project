import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import {
  checkCount,
  checkValidCount,
  checkValidData,
  checkValidDateFormatter,
  GlobalLoader,
  SellerBreadcrumb,
  SellerDataTable,
  sellerStatusFormatter,
  ViewMoreCard,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/sellerRoutes";
import { MorInventoryServices } from "../../../../services";
import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
} from "../../../../utils";

function ViewShippingLog() {
  const params = useParams();
  const productId = params?.id;
  const { t } = useTranslation();
  const location = useLocation();
  const { search } = location;
  const [shippingData, setShippingData] = useState([]);
  const [productImage, setProductImage] = useState();
  const [productName, setProductName] = useState();
  const [brandName, setBrandName] = useState();
  const [price, setPrice] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [param, setParam] = useState({});

  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "createdAt",
      order: "desc",
    },
  ]);

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name ?? "");
      if (data?.sortType) {
        const sortData = [
          {
            dataField: getSortType(data?.sortType),
            order: data?.sortBy,
          },
        ];
        setDefaultSort(sortData);
      } else {
        setDefaultSort([
          {
            dataField: "createdAt",
            order: "desc",
          },
        ]);
      }
    }
  }, [location]);

  const getInventoryData = async () => {
    setTableLoader(true);

    try {
      let queryParams = {
        productId,
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        type: "inventory",
      };
      const res = await MorInventoryServices.getShippingLogService({
        queryParams,
      });
      const { success } = res;
      if (success) {
        setShippingData(res?.data?.rows);
        setTotalCount(res?.data?.count);
        setProductImage(
          res?.data?.productDetails?.productImage[0]?.productImageUrl || ""
        );

        setProductName(res?.data?.productDetails?.productName || "");
        setBrandName(
          res?.data?.productDetails?.Brand?.name ||
            res?.data?.rows[0]?.Product?.Brand?.name ||
            ""
        );
        setNoOfPage(
          res.data.count > 0 ? Math.ceil(res.data.count / sizePerPage) : 1
        );
        setPrice(res?.data?.productDetails?.price || "");
        setTableLoader(false);
      }
    } catch (error) {
      logger(error);
      setTableLoader(false);
    }
  };

  useEffect(() => {
    getInventoryData();
  }, [param, sizePerPage]);

  const tableReset = () => {
    setTableLoader(true);
    setShippingData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const columns = [
    {
      dataField: "createdAt",
      text: t("text.morInventory.shippedOn"),
      headerClasses: "w_70",
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
        ),
    },
    {
      dataField: "shippedQty",
      text: t("text.morInventory.shippedQty"),
      headerClasses: "w_70",
      formatter: (cell, row) => checkValidCount(row?.shippingQuantity),
    },
    {
      dataField: "deliveryDate",
      text: t("text.morInventory.deliveredOn"),
      headerClasses: "w_70",
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
        ),
    },
    {
      dataField: "acceptedQty",
      text: t("text.morInventory.acceptedQty"),
      headerClasses: "w_70",
      formatter: (cell, row) => checkCount(row?.acceptedQuantity),
    },
    {
      dataField: "shippingStatus",
      text: t("text.common.status"),
      headerClasses: "w_70",
      formatter: (cell, row) => sellerStatusFormatter(row?.shippingStatus),
    },
    {
      dataField: "carrier",
      text: t("text.morInventory.carrier"),
      headerClasses: "w_70",
      formatter: (cell, row) => checkValidData(row?.shippingCarrier),
    },
    {
      dataField: "trackingId",
      text: t("text.morInventory.trackingId"),
      headerClasses: "w_70",
      formatter: (cell, row) => checkValidData(row?.trackingId),
    },
  ];
  const breadcrumb = [
    {
      path: routesMap.MOR_INVENTORY.path,
      name: t("text.morInventory.morInventory"),
    },

    {
      path: "#",
      name: t("text.morInventory.viewShippingLog"),
    },
  ];

  return (
    <div className="detailsPage viewShippinglog">
      <div className="container">
        <SellerBreadcrumb breadcrumb={breadcrumb} />
        <div className="bg-850 p-30 radius-20">
          {tableLoader ? (
            <GlobalLoader />
          ) : (
            <>
              <div className="col-sm-6 col-lg-5 col-xxl-4">
                <ViewMoreCard
                  extraClassName="orderItem orderItem-lg"
                  path={`${productImage}`}
                  name={`${productName}`}
                  brandName={`${brandName}`}
                  amount={`${price}`}
                />
              </div>
              <div className="table-responsive">
                <SellerDataTable
                  hasLimit
                  noOfPage={noOfPage}
                  sizePerPage={sizePerPage}
                  page={page}
                  count={totalCount}
                  tableData={shippingData}
                  tableColumns={columns}
                  param={param}
                  defaultSort={defaultSort}
                  setSizePerPage={setSizePerView}
                  tableLoader={tableLoader}
                  tableReset={tableReset}
                  header={false}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewShippingLog;
