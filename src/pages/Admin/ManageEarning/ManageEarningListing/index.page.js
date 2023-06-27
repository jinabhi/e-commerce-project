import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AdminEarningFilter,
  Breadcrumb,
  Charts,
  checkValidCount,
  checkValidDateFormatter,
  ToggleButton,
  DataTable,
  linkFormatter,
  ListingHeader,
  MetaTags,
  nameFormatter,
  PageHeader,
  statusFormatter,
  Tabs,
  textFormatter,
  currencyFormatter,
  ModalComponent,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/adminRoutes";
import { EarningsServices } from "../../../../services";
import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../utils";

function ManageEarning() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;
  const [searchName, setSearchName] = useState("");
  const [EarningData, setEarningData] = useState([]);
  const [param, setParam] = useState({});
  const [tableLoader, setTableLoader] = useState(false);
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [earningYear, setEarningYear] = useState("");
  const [adminData, setAdminData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [defaultKey, setDefaultKey] = useState("dataTable");
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Buyers",
        fill: false,
        backgroundColor: "#c8a452",
        borderColor: "#c8a452",
        pointBackgroundColor: "#212529",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        data: adminData,
      },
    ],
  };
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();

  const getCsvData = (data) => {
    const dataCsv = data.map((item) => {
      return {
        OrderId: item?.orderId,
        Date: dateFormatter(item?.createdAt, dateTimeFormatWithMonth),
        Name: `${
          item?.customer?.firstName
            ? `${item?.customer?.firstName} ${item?.customer?.lastName}`
            : "-"
        }`,
        DeliveredOn: dateFormatter(item?.deliveredOn, dateTimeFormatWithMonth),
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
        ...filterData,
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
    if (defaultKey === "dataTable") {
      getEarningData();
    }
  }, [param, defaultKey]);

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name)
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
  };

  const onHandleAction = async (status, id) => {
    try {
      let bodyData = { status };
      const res = await EarningsServices.UpdateStatusServices(bodyData, id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        getEarningData();
      }
    } catch (error) {
      logger(error);
    }
  };

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data?.data);
  };

  const onCloseProductNameModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  const columns = [
    {
      dataField: "orderId",
      text: t("text.manageEarning.orderId"),
      headerClasses: "sorting",
      sort: true,
      formatter: (cell, row) =>
        checkValidCount(
          linkFormatter(
            cell,
            `${routesMap.MANAGE_EARNING_ORDER_DETAILS.path}/${row?.id}`
          )
        ),
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "createdAt",
      text: t("text.manageEarning.dateAndTime"),
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
      text: t("text.manageEarning.customerName"),
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
      dataField: "productName",
      text: t("text.manageEarning.productsName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        row?.orderDetails[0]?.Product?.productName
          ? readMoreTextShow(
              row?.orderDetails[0]?.Product?.productName,
              showMoreText
            )
          : "-",
    },
    {
      dataField: "quantity",
      text: t("text.manageEarning.quantity"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidCount(row?.quantity),
    },
    {
      dataField: "deliveredOn",
      text: t("text.manageEarning.deliveredOn"),
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
      dataField: "adminCommission",
      text: t("text.manageEarning.myEarning"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => currencyFormatter(cell, "USD"),
    },
    {
      dataField: "sellerCommission",
      text: t("text.manageEarning.sellerShare"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => currencyFormatter(cell, "USD"),
    },
    {
      dataField: "totalAmount",
      text: t("text.manageEarning.orderTotal"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => currencyFormatter(row?.totalAmount, "USD"),
    },
    {
      dataField: "totalShippingCharges",
      text: t("text.manageEarning.shippingCharges"),
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
      text: t("text.manageEarning.totalTax"),
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
      text: t("text.manageEarning.totalAmount"),
      headerClasses: "sorting",
      sort: true,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => currencyFormatter(row?.AmountWithTax, "USD"),
    },

    {
      dataField: "earningStatus",
      text: t("text.manageEarning.status"),
      headerClasses: "sorting",
      formatter: statusFormatter,
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "action",
      text: t("text.manageEarning.action"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => (
        <>
          {row?.earningStatus === "refund" ? (
            ""
          ) : (
            <ToggleButton
              defaultChecked={row?.earningStatus === "paid"}
              onChange={() => {
                let status = "";
                if (row?.earningStatus === "pending") {
                  status = "paid";
                } else {
                  status = "pending";
                }
                onHandleAction(status, row?.orderDetails[0]?.orderId);
              }}
            >
              {t("text.manageEarning.mark")}
            </ToggleButton>
          )}

          {/* ) : (
            ""
          )} */}
        </>
      ),
      // actionButtonFormatter(
      //   t("text.manageEarning.mark"),
      //   row.earningStatus,
      //   onHandleAction("paid", row?.orderDetails[0]?.orderId)
      // ),
    },
  ];

  const breadcrumb = [
    {
      path: "/admin/dashboard",
      name: t("text.brands.dashboard"),
    },
    {
      path: "#",
      name: t("text.manageEarning.manageEarning"),
    },
  ];

  const getEarningGraphData = async () => {
    try {
      let queryParams = {
        status: "all",
        year: earningYear,
        ...filterData,
      };
      const response = await EarningsServices.getEarningGraphServices({
        queryParams,
      });
      const { success, data } = response;
      if (success) {
        let adminCommissionData = data.map((item) => {
          return item?.adminCommission;
        });
        // let graphData = chartData;
        // let datasetsArray = graphData.datasets;
        // let earnings = datasetsArray[0];
        // earnings.data = adminCommissionData;
        // datasetsArray.splice(0, 1, earnings);
        // graphData.datasets = datasetsArray;
        // setChartData();
        setAdminData(adminCommissionData);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (defaultKey === "dataGraph") {
      getEarningGraphData();
    }
  }, [param, defaultKey]);

  // useEffect(() => {}, [chartData]);

  // useEffect(() => {
  //   getEarningGraphData(earningYear);
  // });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label(tooltipItems) {
            return `Amount : ${tooltipItems.formattedValue}`;
          },
        },
      },
      title: {
        display: true,
      },
      legend: {
        display: false,
        align: "end",
        labels: {
          color: "white",
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
        borderWidth: 2,
        fill: false,
        borderJoinStyle: "round",
      },
      point: {
        radius: 8,
        hoverRadius: 8,
        pointStyle: "circle",
        color: "white",
      },
    },
    scales: {
      xAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "white",
        },
        grid: {
          display: false,
          tickBorderDash: [5, 5],
          drawBorder: true,
          borderColor: "#262626",
        },
        title: {
          display: true,
          text: `Year - ${new Date().getFullYear()}`,
          padding: {
            top: 20,
          },
          color: "#8094ae",
          font: {
            size: 14,
          },
        },
      },
      yAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "white",
          padding: 20,
          stepSize: 500,
          precision: 0,
          callback(tickValue) {
            let ranges = [
              {
                divider: 1e5,
                suffix: "M",
              },
              {
                divider: 1e3,
                suffix: "k",
              },
            ];

            function formatNumber(n) {
              for (let i = 0; i < ranges.length; i += 1) {
                if (n >= ranges[i].divider) {
                  return (n / ranges[i].divider).toString() + ranges[i].suffix;
                }
              }
              return n;
            }
            return formatNumber(tickValue);
          },
        },
        grid: {
          display: true,
          borderColor: "#262626",
          color: "#0d0d0d",
          borderDash: [5, 5],
          tickBorderDash: [5, 5],
          drawTicks: false,
          drawBorder: true,
        },
        title: {
          display: true,
          text: "Earning Amount",
          color: "#8094ae",
          font: {
            size: 14,
          },
        },
      },
    },
  };

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

  const tabContent = [
    {
      name: (
        <span>
          <em className="icon ni ni-view-list-wd" />
        </span>
      ),
      key: "dataTable",
      content: (
        <DataTable
          hasLimit
          noOfPage={noOfPage}
          sizePerPage={sizePerPage}
          page={page}
          count={totalCount}
          tableData={EarningData}
          tableColumns={columns}
          param={param}
          defaultSort={defaultSort}
          tableLoader={tableLoader}
          getSearchValue={getSearchValue}
          setSizePerPage={setSizePerView}
          tableReset={tableReset}
          searchPlaceholder={t("text.manageEarning.earning")}
        />
      ),
    },
    {
      name: (
        <span>
          <em className="icon ni ni-growth" />
        </span>
      ),
      key: "dataGraph",
      content: (
        <div className="card-inner">
          <div className="nk-ecwg8-ck">
            <div style={{ height: "500px" }}>
              <Charts
                type="line"
                data={chartData}
                options={chartOptions}
                year={earningYear}
                setYear={setEarningYear}
              />
            </div>
          </div>
        </div>
      ),
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
  const arrayOfData = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "2021",
      name: "2021",
    },
    {
      id: "2022",
      name: "2022",
    },
  ];

  const statusArray = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "pending",
      name: "Pending",
    },
    {
      id: "paid",
      name: "Paid",
    },
    {
      id: "refund",
      name: "Refund",
    },
  ];
  return (
    <div>
      <MetaTags title={t("text.manageEarning.manageEarning")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageEarning.manageEarning")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>

          <ListingHeader
            btnArray={["csvExport", "filter"]}
            csvData={csvData}
            fileName="Earning List"
            popover={
              <AdminEarningFilter
                onSubmit={onSubmitData}
                onReset={onReset}
                arrayOfData={arrayOfData}
                statusArray={statusArray}
                filterData={filterData}
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
      />
      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseProductNameModal}
        title={t("text.manageCustomers.product")}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </div>
  );
}

export default React.memo(ManageEarning);
