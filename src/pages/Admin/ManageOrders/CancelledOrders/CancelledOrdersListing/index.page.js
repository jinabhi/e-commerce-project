import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DataTable,
  linkFormatter,
  ListingHeader,
  MetaTags,
  PageHeader,
  Breadcrumb,
  checkValidDateFormatter,
  nameFormatter,
  textFormatter,
  checkValidData,
  OrdersFilter,
  ModalComponent,
  // percentageFormatter,
  currencyFormatter,
} from "../../../../../components";
import { dateTimeFormatWithMonth } from "../../../../../helpers";
import routesMap from "../../../../../routeControl/adminRoutes";
import { OrdersServices } from "../../../../../services";
import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../../utils";

function CancelledOrders() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;

  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [canceledOrdersList, setCancelledOrdersList] = useState([]);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [filterData, setFilterData] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();

  const getCancelledOrdersList = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
        status: "canceled",
        ...filterData,
      };
      const res = await OrdersServices.getOrdersServices({ queryParams });
      const { success, data } = res;
      if (success) {
        setCancelledOrdersList(data?.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
        setTableLoader(false);
      }
    } catch (error) {
      logger(error);
      setTableLoader(false);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getCancelledOrdersList();
  }, [param]);

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      if (data?.sortType) {
        const sortData = [
          {
            order: getSortType(data?.sortType),
            dataField: data?.sortBy,
          },
        ];
        setDefaultSort(sortData);
      } else {
        setDefaultSort({
          dataField: "",
          order: "",
        });
      }
    }
  }, [location]);

  const tableReset = () => {
    setTableLoader(true);
    setCancelledOrdersList([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

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

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };

  const onCloseModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  const columns = [
    {
      dataField: "orderId",
      text: t("text.manageOrders.orderId"),
      headerClasses: "w_70 sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        linkFormatter(
          cell,
          `${routesMap.CANCELLED_ORDER_DETAILS.path}/${row?.id}`
        ),
    },
    {
      dataField: "createdAt",
      text: t("text.manageOrders.receivedOn"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
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
        nameFormatter(
          textFormatter(row?.customer?.firstName),
          textFormatter(row?.customer?.lastName)
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
          checkValidData(`${row?.Address?.landmark} ${row?.Address?.address}`),
          showMoreText
        ),
    },
    {
      dataField: "canceledOn",
      text: t("text.manageOrders.cancelledOn"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
        ),
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.brands.dashboard"),
    },
    {
      path: "#",
      name: t("text.manageOrders.cancelledOrders"),
    },
  ];

  function onSubmitData(val) {
    setFilterData(val);
    tableReset();
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
    setFilterVisible(false);
  }

  const onReset = () => {
    setFilterData({});
    tableReset();
    setFilterVisible(false);
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  };

  return (
    <>
      <MetaTags title={t("text.manageOrders.cancelledOrders")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageOrders.cancelledOrders")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["filter"]}
            popover={
              <OrdersFilter
                onSubmit={onSubmitData}
                onReset={onReset}
                filterData={filterData}
              />
            }
            setVisible={setFilterVisible}
            visible={filterVisible}
          />
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={canceledOrdersList}
        setSizePerPage={setSizePerPage}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        getSearchValue={getSearchValue}
        tableReset={tableReset}
        tableLoader={tableLoader}
        searchPlaceholder={t("text.search.order")}
      />
      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseModal}
        title={t("text.manageOrders.deliveryAddress")}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </>
  );
}

export default CancelledOrders;
