import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  DataTable,
  linkFormatter,
  checkValidCount,
  nameFormatter,
  checkValidDateFormatter,
  ModalComponent,
  currencyFormatter,
  checkValidData,
} from "../../../../../components";
import { dateTimeFormatWithMonth } from "../../../../../helpers";
import routesMap from "../../../../../routeControl/adminRoutes";
import {
  dateFormatter,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../../utils";

function PickedUpOrdersList({
  pickedUpList,
  tableLoader,
  totalCount,
  noOfPage,
  sizePerPage,
  page,
  param,
  tableReset,
  setSizePerPage,
  defaultSort,
  pathname,
  setSearchName,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
    tableReset();
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };

  const onCloseModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  const pickedUpColumns = [
    {
      dataField: "orderId",
      text: t("text.manageOrders.orderId"),
      formatter: (cell, row) =>
        checkValidCount(
          linkFormatter(
            cell,
            `${routesMap.ACTIVE_ORDER_Details.path}/${row?.id}`
          )
        ),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "pickedUpOn",
      text: t("text.manageOrders.pickedOn"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(row?.pickedUpOn, dateTimeFormatWithMonth)
        ),
    },
    {
      dataField: "customerName",
      text: t("text.manageOrders.customerName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        nameFormatter(row?.customer?.firstName, row?.customer?.lastName),
    },
    {
      dataField: "deliveryAddress",
      text: t("text.manageOrders.deliveryAddress"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        readMoreTextShow(
          checkValidData(`${row?.Address?.address} ${row?.Address?.landmark} `),
          showMoreText
        ),
    },
    {
      dataField: "totalShippingCharges",
      text: t("text.manageOrders.shippingCharges"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        currencyFormatter(row?.totalShippingCharges, "USD"),
    },
    {
      dataField: "totalTax",
      text: t("text.manageOrders.totalTax"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => currencyFormatter(row?.totalTax, "USD"),
    },
    {
      dataField: "totalAmount",
      text: t("text.manageOrders.orderTotal"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => currencyFormatter(row?.totalAmount, "USD"),
    },
    {
      dataField: "AmountWithTax",
      text: t("text.manageOrders.totalAmount"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => currencyFormatter(row?.AmountWithTax, "USD"),
    },
    {
      dataField: "trackingLink",
      text: t("text.manageOrders.pickedUpTrackingId"),
      formatter: (cell, row) => {
        return row?.trackingLink ? (
          <a href={row?.trackingLink}>
            {row?.trackingLink?.substring(0, 30)}...
          </a>
        ) : (
          "-"
        );
      },
    },
  ];

  return (
    <>
      <div>
        <DataTable
          hasLimit
          noOfPage={noOfPage}
          sizePerPage={sizePerPage}
          page={page}
          count={totalCount}
          tableData={pickedUpList}
          tableColumns={pickedUpColumns}
          param={param}
          defaultSort={defaultSort}
          setSizePerPage={setSizePerPage}
          tableLoader={tableLoader}
          tableReset={tableReset}
          getSearchValue={getSearchValue}
          searchPlaceholder={t("text.search.order")}
        />
        <ModalComponent
          show={showReadMore}
          onHandleCancel={onCloseModal}
          title={t("text.manageOrders.deliveryAddress")}
        >
          <p className="text-break">{readData}</p>
        </ModalComponent>
      </div>
    </>
  );
}

export default PickedUpOrdersList;
