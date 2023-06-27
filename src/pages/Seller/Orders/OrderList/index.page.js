import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  checkValidData,
  checkValidDateFormatter,
  linkFormatter,
  MetaTags,
  nameFormatter,
  SellerOrdersFilter,
  PageHeader,
  SellerDataTable,
  SellerFilterButton,
  sellerStatusFormatter,
  textFormatter,
  currencyFormatter,
  ModalComponent,

  // statusFormatter,
  // addressFormatter,
  // linkFormatter,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/sellerRoutes";
// import { dateTimeFormatWithMonth } from "../../../../helpers";
// import routesMap from "../../../../routeControl/sellerRoutes";
import { OrdersServices } from "../../../../services";
import {
  dateFormatter,
  // dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../utils";

export default function Orders() {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search, pathname } = location;
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState({});
  const [ordersData, setOrdersData] = useState([]);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);

  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "createdAt",
      order: "desc",
    },
  ]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();

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

  const getOrdersData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        name: searchName,
        ...filterData,
      };
      const res = await OrdersServices.getOrdersServices({ queryParams });
      if (res?.success) {
        setOrdersData(res.data.rows);
        setNoOfPage(
          res.data.count > 0 ? Math.ceil(res.data.count / sizePerPage) : 1
        );
        setTotalCount(res.data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getOrdersData();
  }, [param, sizePerPage]);

  const statusFormatter = (cell) => {
    const successArr = ["completed"];
    const statusArr = {
      completed: "Delivered",
    };
    let data;
    if (successArr.includes(cell)) {
      data = <span className="badge badge-success">{statusArr?.[cell]}</span>;
    }
    return data;
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
      text: t("text.sellerOrders.orderID"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        linkFormatter(
          cell,
          `${routesMap.ORDER_DETAILS.path}/${row?.id}`,
          "text-primary"
        ),
    },
    {
      dataField: "createdAt",
      text: t("text.sellerOrders.dateTime"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(row?.createdAt, dateTimeFormatWithMonth)
        ),
    },
    {
      dataField: "customerName",
      text: t("text.sellerOrders.customerName"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        nameFormatter(
          textFormatter(row?.customer?.firstName),
          textFormatter(row?.customer?.lastName)
        ),
    },
    {
      dataField: "orderTotal",
      text: t("text.sellerOrders.orderTotal"),
      headerClasses: "w_70",
      formatter: (cell, row) => currencyFormatter(row?.totalAmount, "USD"),
    },
    {
      dataField: "deliveryAddress",
      text: t("text.sellerOrders.deliveryAddress"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        readMoreTextShow(
          checkValidData(`${row?.Address?.address} ${row?.Address?.landmark}`),
          showMoreText
        ),
    },
    {
      dataField: "status",
      text: t("text.sellerOrders.orderStatus"),
      headerClasses: "w_70",
      formatter: (cell, row) => {
        return (
          <>
            {row?.status === "completed"
              ? statusFormatter(row?.status)
              : sellerStatusFormatter(cell, row)}
          </>
        );
      },
    },
  ];

  const tableReset = () => {
    setTableLoader(true);
    setOrdersData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

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

  const arrayOfData = [
    {
      id: "received",
      name: "Received",
    },
    {
      id: "completed",
      name: "Delivered",
    },
    {
      id: "canceled",
      name: "Cancelled",
    },
    {
      id: "pickedUp",
      name: "Picked Up",
    },
    {
      id: "packed",
      name: "Packed",
    },
  ];

  return (
    <>
      <MetaTags title={t("text.sellerOrders.title")} />
      <PageHeader heading={t("text.sellerOrders.title")} />
      <SellerDataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={ordersData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerPage}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.sellerOrders.searchBy")}
      >
        <div className="dropdown filter">
          <SellerFilterButton
            extraClassName="dropdown-toggle d-flex align-items-center justify-content-center ms-auto"
            setVisible={setFilterVisible}
            visible={filterVisible}
            popover={
              <SellerOrdersFilter
                onSubmit={onSubmitData}
                // loading={loading}
                arrayOfData={arrayOfData}
                onReset={onReset}
                filterData={filterData}
                t={t}
              />
            }
          />
        </div>
        <ModalComponent
          show={showReadMore}
          onHandleCancel={onCloseModal}
          title=""
        >
          <h2 className="mt-0 text-white">
            {t("text.sellerOrders.deliveryAddress")}
          </h2>
          <p className="text-break">{readData}</p>
        </ModalComponent>
      </SellerDataTable>
    </>
  );
}
