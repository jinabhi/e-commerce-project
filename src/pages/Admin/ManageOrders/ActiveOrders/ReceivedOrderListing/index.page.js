import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { PackedOrdersList, PickedUpOrdersList } from "../../..";
import {
  DataTable,
  ListingHeader,
  PageHeader,
  Breadcrumb,
  MetaTags,
  Tabs,
  linkFormatter,
  checkValidCount,
  nameFormatter,
  checkValidDateFormatter,
  CommonButton,
  OrdersFilter,
  ModalComponent,
  checkValidData,
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
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../../utils";

function ActiveOrders() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [defaultKey, setDefaultKey] = useState("received");
  const [filterData, setFilterData] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();

  const getOrdersList = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
        status: defaultKey,
        ...filterData,
      };
      const res = await OrdersServices.getOrdersServices({ queryParams });
      const { success, data } = res;
      if (success) {
        setOrderList(data?.rows);
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

  const tableReset = () => {
    setTableLoader(true);
    setOrderList([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  useEffect(() => {
    getOrdersList();
    tableReset();
  }, [param, defaultKey]);

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);

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

  const onHandleClick = async (status, id) => {
    setLoading(true);
    try {
      let bodyData = { status };
      const res = await OrdersServices.UpdateStatusServices(bodyData, id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        getOrdersList();
        setDefaultKey("packed");
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

  const receivedColumns = [
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
      dataField: "createdAt",
      text: t("text.manageOrders.receivedOn"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(row?.createdAt, dateTimeFormatWithMonth)
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
      text: t("text.manageOrders.actions"),
      formatter: (cell, row) => (
        <CommonButton
          extraClassName="btn btn-sm btn-primary"
          loading={loading}
          onClick={(e) => {
            e.preventDefault();
            onHandleClick("packed", row?.id);
          }}
        >
          {t("text.manageOrders.packed")}
        </CommonButton>
      ),
    },
  ];

  const breadcrumb = [
    {
      path: "/admin/dashboard",
      name: t("text.brands.dashboard"),
    },
    {
      path: "#",
      name: t("text.manageOrders.activeOrders"),
    },
  ];

  const tabContent = [
    {
      name: t("text.manageOrders.received"),
      key: "received",
      content: (
        <DataTable
          hasLimit
          noOfPage={noOfPage}
          sizePerPage={sizePerPage}
          page={page}
          count={totalCount}
          tableData={orderList}
          tableColumns={receivedColumns}
          param={param}
          defaultSort={defaultSort}
          setSizePerPage={setSizePerPage}
          tableLoader={tableLoader}
          tableReset={tableReset}
          getSearchValue={getSearchValue}
          searchPlaceholder={t("text.search.order")}
        />
      ),
    },
    {
      name: t("text.manageOrders.packed"),
      key: "packed",
      content: (
        <PackedOrdersList
          packedList={orderList}
          tableLoader={tableLoader}
          tableReset={tableReset}
          setSizePerPage={setSizePerPage}
          totalCount={totalCount}
          noOfPage={noOfPage}
          sizePerPage={sizePerPage}
          page={page}
          param={param}
          defaultSort={defaultSort}
          pathname={pathname}
          setSearchName={setSearchName}
          setDefaultKey={setDefaultKey}
          getOrdersList={getOrdersList}
        />
      ),
    },
    {
      name: t("text.manageOrders.pickedUp"),
      key: "pickedUp",
      content: (
        <PickedUpOrdersList
          pickedUpList={orderList}
          tableLoader={tableLoader}
          tableReset={tableReset}
          setSizePerPage={setSizePerPage}
          totalCount={totalCount}
          noOfPage={noOfPage}
          sizePerPage={sizePerPage}
          page={page}
          param={param}
          defaultSort={defaultSort}
          pathname={pathname}
          setSearchName={setSearchName}
        />
      ),
    },
  ];
  function onSubmitData(val) {
    setFilterData(val);
    if (val) {
      tableReset();
    }
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

  const onTabChange = (key) => {
    if (defaultKey !== key) {
      setPage(1);
      setSearchName("");
      setFilterData({});
      setSizePerPage(10);
      navigate(routesMap.ACTIVE_ORDER.path);
    }
  };

  return (
    <>
      <div>
        <MetaTags title={t("text.manageOrders.activeOrders")} />
        <div className="nk-block-head nk-block-head-sm">
          <div className="nk-block-between">
            <PageHeader heading={t("text.manageOrders.activeOrders")}>
              <Breadcrumb breadcrumb={breadcrumb} />
            </PageHeader>
            <ListingHeader
              btnArray={["filter"]}
              popover={
                <OrdersFilter
                  onSubmit={onSubmitData}
                  onReset={onReset}
                  filterData={filterData}
                  defaultKey={defaultKey}
                />
              }
              setVisible={setFilterVisible}
              visible={filterVisible}
            />
          </div>
        </div>
        <Tabs
          tabContent={tabContent}
          tabsFor="table"
          border
          activeKey={defaultKey}
          setActiveKey={setDefaultKey}
          onTabChange={onTabChange}
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

export default ActiveOrders;
