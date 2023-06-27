import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  DataTable,
  linkFormatter,
  checkValidCount,
  nameFormatter,
  checkValidDateFormatter,
  CommonButton,
  ModalComponent,
  checkValidData,
  currencyFormatter,
  TrackingIdForm,
} from "../../../../../components";
import { dateTimeFormatWithMonth } from "../../../../../helpers";
import routesMap from "../../../../../routeControl/adminRoutes";
import { OrdersServices } from "../../../../../services";
import {
  dateFormatter,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../../utils";

function PackedOrdersList({
  packedList,
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
  setDefaultKey,
  getOrdersList,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [show, setShow] = useState(false);
  const [rowId, setRowId] = useState();

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

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

  const onHandleClick = async (status, id, val) => {
    setLoading(true);
    try {
      let bodyData = { status, trackingLink: val.trackingId };
      const res = await OrdersServices.UpdateStatusServices(bodyData, id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        getOrdersList();
        setDefaultKey("pickedUp");
        tableReset();
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };

  const onCloseModal = () => {
    setShowReadMore(false);
    setReadData("");
  };
  const onHandelClose = () => {
    setShow(false);
  };
  const ChangeStatus = async (val) => {
    onHandleClick("pickedUp", rowId, val);
    onHandelClose();
  };

  const onHandleShow = (row) => {
    setShow(!show);
    setRowId(row?.id);
  };

  const packedColumns = [
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
      dataField: "packedOn",
      text: t("text.manageOrders.packedOn"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(row?.packedOn, dateTimeFormatWithMonth)
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
      dataField: "actions",
      text: t("text.manageOrders.actions"),
      formatter: (cell, row) => (
        <CommonButton
          extraClassName="btn btn-sm btn-primary"
          onClick={(e) => {
            e.preventDefault();
            onHandleShow(row);
          }}
        >
          {t("text.manageOrders.markAsPickedUp")}
        </CommonButton>
      ),
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
          tableData={packedList}
          tableColumns={packedColumns}
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
        <ModalComponent
          extraClassName="modal-md"
          show={show}
          onHandleCancel={() => {
            onHandelClose();
          }}
          title={t("text.manageOrders.trackingId")}
        >
          <TrackingIdForm onSubmit={ChangeStatus} formLoader={loading} />
        </ModalComponent>
      </div>
    </>
  );
}

export default PackedOrdersList;
