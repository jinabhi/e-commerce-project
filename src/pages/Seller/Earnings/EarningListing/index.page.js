import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  checkValidDateFormatter,
  currencyFormatter,
  linkFormatter,
  nameFormatter,
  SellerDataTable,
  sellerStatusFormatter,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/sellerRoutes";
import { EarningsServices } from "../../../../services";
import { dateFormatter, decodeQueryData, logger } from "../../../../utils";

function EarningList(mainProps) {
  const { registeredFrom, registeredTo, Year, setCsvData } = mainProps;
  const { t } = useTranslation();

  const location = useLocation();
  const { search } = location;
  const [EarningData, setEarningData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name ?? "");
    }
  }, [location]);

  const tableReset = () => {
    setTableLoader(true);
    setEarningData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const getCsvData = (data) => {
    const dataCsv = data.map((item) => {
      return {
        OrderId: item?.orderId,
        Date: item?.createdAt,
        Name: `${
          item?.customer?.firstName
            ? `${item?.customer?.firstName} ${item?.customer?.lastName}`
            : "-"
        }`,
        DeliveredOn: item?.deliveredOn,
        TotalOrder: item?.totalAmount,
        MyEarning: item?.sellerCommission,
        AdminCommission: item?.adminCommission,
        status: item?.earningStatus,
      };
    });
    setCsvData(dataCsv);
  };

  const getEarningData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        name: searchName,
        year: Year,
        fromDate: registeredFrom,
        toDate: registeredTo,
      };
      const res = await EarningsServices.getAllEarningServices({ queryParams });
      const { success, data } = res;
      if (success) {
        setEarningData(data?.rows);
        getCsvData(data?.rows);
        setNoOfPage(data?.count > 0 ? Math.ceil(data?.count / sizePerPage) : 1);
        setTotalCount(data?.count);
        setTableLoader(false);
      }
    } catch (error) {
      logger(error);
      setTableLoader(false);
    }
  };

  useEffect(() => {
    getEarningData();
  }, [param]);

  useEffect(() => {
    getEarningData();
  }, [registeredTo, registeredFrom, Year]);

  const columns = [
    {
      dataField: "orderId",
      text: t("text.earnings.orderId"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        linkFormatter(
          row?.orderId,
          `${routesMap.ORDER_DETAILS.path}/${row?.id}`,
          "text-primary"
        ),
    },
    {
      dataField: "createdAt",
      text: t("text.earnings.dateTime"),
      headerClasses: "w_70",
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
        ),
    },
    {
      dataField: "customerName",
      text: t("text.earnings.customerName"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        nameFormatter(row?.customer?.firstName, row?.customer?.lastName),
    },

    {
      dataField: "deliveredOn",
      text: t("text.earnings.deliveryOn"),
      headerClasses: "w_70",
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
        ),
    },
    {
      dataField: "totalAmount",
      text: t("text.earnings.orderTotal"),
      headerClasses: "w_70",
      formatter: (cell) => currencyFormatter(cell, "USD"),
    },
    {
      dataField: "sellerCommission",
      text: t("text.earnings.myEarnings"),
      headerClasses: "w_70",
      formatter: (cell) => currencyFormatter(cell, "USD"),
    },
    {
      dataField: "earningStatus",
      text: t("text.common.status"),
      headerClasses: "w_70",
      formatter: (cell, row) => sellerStatusFormatter(cell, row),
    },
  ];

  return (
    <>
      <SellerDataTable
        noPad
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={EarningData}
        tableColumns={columns}
        param={param}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.earnings.searchPlaceholder")}
      />
    </>
  );
}

export default EarningList;
