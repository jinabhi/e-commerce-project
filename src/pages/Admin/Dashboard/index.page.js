import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ChartComponent,
  checkValidCount,
  DashboardCardComponent,
  MetaTags,
} from "../../../components";
import routesMap from "../../../routeControl/adminRoutes";
import { DashboardServices } from "../../../services";
import { logger } from "../../../utils";

function Dashboard() {
  const { t } = useTranslation();

  const [dashboardCardValues, setDashboardCardValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [registeredUserYear, setRegisteredUserYear] = useState("");
  const [visitorBuyerUserYear, setVisitorBuyerUserYear] = useState("");
  const [earningYear, setEarningYear] = useState("");
  const [categoryProductYear, setCategoryProductYear] = useState("");

  const [registeredUserData, setRegisteredUserData] = useState({
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
        label: "Buyer",
        backgroundColor: "#c8a452",
        borderColor: "#c8a452",
        pointBackgroundColor: "#212529",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
      },
      {
        label: "Seller",
        fill: false,
        backgroundColor: "#3aff00",
        borderColor: "#3aff00",
        pointBackgroundColor: "#212529",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  const [visitorBuyerGraphData, setVisitorBuyerGraphData] = useState({
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
        label: "Visitors",
        backgroundColor: "#0088ff",
        borderColor: "#0088ff",
        pointBackgroundColor: "#212529",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
      },
      {
        label: "Buyers",
        fill: false,
        backgroundColor: "#c8a452",
        borderColor: "#c8a452",
        pointBackgroundColor: "#212529",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  const [earningData, setEarningData] = useState({
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
        label: "Buyer",
        backgroundColor: "rgba(200, 164, 82, 0.15)",
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#c8a452",
        pointBackgroundColor: "#212529",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        barPercentage: 0.3,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
      },
    ],
  });

  const [categoriesData, setCategoriesData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#c8a452",
          "#84FF63",
          "#8463FF",
          "#6384FF",
        ],
      },
    ],
  });

  const [productData, setProductData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#FF6384",
          "#c8a452",
          "#84FF63",
          "#8463FF",
          "#6384FF",
        ],
      },
    ],
  });

  const getRegisteredUserGraphData = async () => {
    try {
      let queryParams = {
        year: registeredUserYear,
      };
      const response = await DashboardServices.adminRegisteredUserGraphData({
        queryParams,
      });
      const { data, success } = response;
      if (success) {
        let sellerData = [];
        let buyerData = [];
        if (data.length > 0) {
          data.map((item) => {
            if (item.name === "buyers") {
              sellerData = item.data;
            } else if (item.name === "sellers") {
              buyerData = item.data;
            }
          });
        }
        let graphData = registeredUserData;
        let datasetsArray = graphData.datasets;
        let sData = datasetsArray[0];
        let bData = datasetsArray[1];
        sData.data = sellerData;
        bData.data = buyerData;
        datasetsArray.splice(0, 1, sData);
        datasetsArray.splice(1, 1, bData);
        graphData.datasets = datasetsArray;
        setRegisteredUserData({ ...graphData });
      }
    } catch (error) {
      logger(error);
    }
  };

  const getVisitorBuyerGraphData = async () => {
    try {
      let queryParams = {
        year: visitorBuyerUserYear,
      };
      const response = await DashboardServices.adminVisitorBuyerGraphData({
        queryParams,
      });
      const { data, success } = response;
      if (success) {
        let visitorData = [];
        let buyerData = [];
        if (data.length > 0) {
          buyerData = data[0].buyer.map((item) => {
            return item?.count || 0;
          });
          visitorData = data[0].visitor.map((item) => {
            return item?.count || 0;
          });
        }
        let graphData = visitorBuyerGraphData;
        graphData.datasets[0].data = visitorData;
        graphData.datasets[1].data = buyerData;
        setVisitorBuyerGraphData({ ...graphData });
      }
    } catch (error) {
      logger(error);
    }
  };

  const getSellerGraphData = async () => {
    try {
      let queryParams = {
        status: "all",
        year: earningYear,
      };
      const response = await DashboardServices.sellerGraphData({ queryParams });
      const { success, data } = response;
      if (success) {
        let adminCommissionData = data.map((item) => {
          return item?.adminCommission || 0;
        });
        let graphData = earningData;
        let datasetsArray = graphData.datasets;
        let earnings = datasetsArray[0];
        earnings.data = adminCommissionData;
        datasetsArray.splice(0, 1, earnings);
        graphData.datasets = datasetsArray;
        setEarningData({ ...graphData });
      }
    } catch (error) {
      logger(error);
    }
  };

  const getCategoryProductData = async () => {
    try {
      let queryParams = {
        year: categoryProductYear,
      };
      const response = await DashboardServices.productCategoryGraphData({
        queryParams,
      });
      const { success, data } = response;
      if (success) {
        let resProductData = [];
        let productLabels = [];
        let categoryData = [];
        let categoryLabels = [];
        let tempData = data[0];
        if (tempData.category.length > 0) {
          tempData.category.map((item) => {
            categoryData.push(item?.categoryCount || 0);
            categoryLabels.push(item?.categoryName || "");
          });
        }
        if (tempData.product.length > 0) {
          tempData.product.map((item) => {
            resProductData.push(item?.productCount || 0);
            productLabels.push(item?.productName || "");
          });
        }
        let categoryGraphData = categoriesData;
        categoryGraphData.labels = categoryLabels;
        let categoryDatasetsArray = categoryGraphData.datasets;
        let categoryDataObject = categoryDatasetsArray[0];
        categoryDataObject.data = categoryData;
        categoryDatasetsArray.splice(0, 1, categoryDataObject);
        categoryGraphData.datasets = categoryDatasetsArray;
        setCategoriesData({ ...categoryGraphData });
        let productGraphData = productData;
        productGraphData.labels = productLabels;
        let productDatasetsArray = productGraphData.datasets;
        let productDataObject = productDatasetsArray[0];
        productDataObject.data = resProductData;
        productDatasetsArray.splice(0, 1, productDataObject);
        productGraphData.datasets = productDatasetsArray;
        setProductData({ ...productGraphData });
      }
    } catch (error) {
      logger(error);
    }
  };

  const getDashboardCardValues = async () => {
    setLoading(true);
    try {
      const response = await DashboardServices.adminDashboardData();
      if (response.success) {
        setDashboardCardValues(response?.data || {});
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardCardValues();
    getRegisteredUserGraphData();
    getVisitorBuyerGraphData();
    getSellerGraphData();
    getCategoryProductData();
  }, []);

  useEffect(() => {}, [
    registeredUserData,
    visitorBuyerGraphData,
    earningData,
    categoriesData,
    productData,
  ]);

  useEffect(() => {
    getRegisteredUserGraphData();
  }, [registeredUserYear]);
  useEffect(() => {
    getVisitorBuyerGraphData();
  }, [visitorBuyerUserYear]);
  useEffect(() => {
    getSellerGraphData();
  }, [earningYear]);
  useEffect(() => {
    getCategoryProductData();
  }, [categoryProductYear]);

  const visitOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label(tooltipItems) {
            return `Count : ${tooltipItems.formattedValue}`;
          },
        },
      },
      title: {
        display: true,
      },
      legend: {
        align: "end",
        labels: {
          color: "white",
          boxWidth: 10,
          boxHeight: 7,
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
        // pointBorderColor: 'white',
        color: "white",
      },
    },
    scales: {
      xAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "white",
          // padding: 10
        },
        grid: {
          display: false,
          tickBorderDash: [5, 5],
          drawBorder: true,
          borderColor: "#262626",
        },
        title: {
          display: true,
          // text: "Year - 2022",
          // padding: {
          //   top: 20,
          // },
          color: "#8094ae",
          font: {
            size: 14,
          },
        },
      },
      yAxes: {
        display: true,
        beginAtZero: true,
        // min: 0,
        // max: 50000,
        ticks: {
          color: "white",
          padding: 15,
          stepSize: 10000,
          precision: 0,
          callback(tickValue) {
            let ranges = [
              {
                divider: 1e6,
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
          text: "Count of Visits & Orders",
          // padding: 20,
          color: "#8094ae",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const registeredUserOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label(tooltipItems) {
            return `Count : ${tooltipItems.formattedValue}`;
          },
        },
      },
      title: {
        display: true,
      },
      legend: {
        align: "end",
        labels: {
          color: "white",
          boxWidth: 10,
          boxHeight: 7,
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
        // pointBorderColor: 'white',
        color: "white",
      },
    },
    scales: {
      xAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "white",
          // padding: 10
        },
        grid: {
          display: false,
          tickBorderDash: [5, 5],
          drawBorder: true,
          borderColor: "#262626",
        },
        title: {
          display: true,
          // text: "Year - 2022",
          // padding: {
          //   top: 20,
          // },
          color: "#8094ae",
          font: {
            size: 14,
          },
        },
      },
      yAxes: {
        display: true,
        beginAtZero: true,
        // min: 0,
        // max: 50000,
        ticks: {
          color: "white",
          padding: 15,
          stepSize: 10000,
          precision: 0,
          callback(tickValue) {
            let ranges = [
              {
                divider: 1e6,
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
          text: "Count of Buyer and Seller",
          // padding: 20,
          color: "#8094ae",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const earningOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label(tooltipItems) {
            return `Count : ${tooltipItems.formattedValue}`;
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
          boxHeight: 7,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
    },
    elements: {
      point: {
        radius: 8,
        hoverRadius: 8,
        pointStyle: "circle",
        // pointBorderColor: 'white',
        color: "white",
      },
    },
    scales: {
      xAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "white",
          // padding: 10
        },
        grid: {
          display: false,
          tickBorderDash: [5, 5],
          drawBorder: true,
          borderColor: "#262626",
        },
        title: {
          display: true,
          // text: "Year - 2022",
          // padding: {
          //   top: 20,
          // },
          color: "#8094ae",
          font: {
            size: 14,
          },
        },
      },
      yAxes: {
        display: true,
        beginAtZero: true,
        // min: 0,
        // max: 50000,
        ticks: {
          color: "white",
          padding: 15,
          stepSize: 10000,
          precision: 0,
          callback(tickValue) {
            let ranges = [
              {
                divider: 1e6,
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
          // padding: 20,
          color: "#8094ae",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const categoriesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          color: "white",
          boxWidth: 10,
          boxHeight: 7,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const productOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left",
        align: "center",
        rtl: true,
        labels: {
          color: "white",
          boxWidth: 10,
          boxHeight: 7,
          usePointStyle: true,
          textAlign: "right",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <>
      <MetaTags title={t("text.common.dashboard")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <div className="nk-block-head-content">
            <h3 className="nk-block-title page-title">
              {t("text.common.dashboard")}
            </h3>
          </div>
        </div>
      </div>
      <div className="nk-block">
        <div className="row g-gs dashboardSets">
          <DashboardCardComponent
            linkPath={routesMap.MANAGE_CUSTOMERS.path}
            title={t("text.dashboard.totalCustomer")}
            // count={1250}
            count={checkValidCount(dashboardCardValues?.totalBuyer)}
            image="ic_buyer.svg"
          />
          <DashboardCardComponent
            linkPath={routesMap.MANAGE_SELLERS.path}
            title={t("text.dashboard.totalSellers")}
            // count={1000}
            count={checkValidCount(dashboardCardValues?.totalSeller)}
            image="ic_sellers.svg"
          />
          <DashboardCardComponent
            linkPath={routesMap.PRODUCT.path}
            title={t("text.dashboard.totalProducts")}
            // count={100}
            count={checkValidCount(dashboardCardValues?.totalProduct)}
            image="ic_products.svg"
          />
          <DashboardCardComponent
            linkPath={routesMap.MANAGE_EARNING.path}
            title={t("text.dashboard.totalEarnings")}
            // count={50}
            count={
              loading
                ? 0
                : checkValidCount(
                    dashboardCardValues?.totalEarning === null
                      ? dashboardCardValues?.totalEarning
                      : parseFloat(dashboardCardValues?.totalEarning).toFixed(2)
                  )
            }
            image="ic_earnings.svg"
          />
          <DashboardCardComponent
            linkPath={routesMap.ACTIVE_ORDER.path}
            title={t("text.dashboard.activeOrders")}
            // count={3420}
            count={checkValidCount(dashboardCardValues?.activeOrder)}
            image="ic_active_order.svg"
          />
          <DashboardCardComponent
            linkPath={routesMap.COMPLETE_ORDER.path}
            title={t("text.dashboard.completedOrders")}
            // count={2450}
            count={checkValidCount(dashboardCardValues?.completeOrder)}
            image="ic_completed_order.svg"
          />
          <DashboardCardComponent
            linkPath={routesMap.CANCELLED_ORDER.path}
            title={t("text.dashboard.cancelledOrders")}
            // count={100}
            count={checkValidCount(dashboardCardValues?.cancelOrder)}
            image="ic_cancelled_order.svg"
          />
        </div>
        <div className="row g-gs dashboardCharts">
          <ChartComponent
            type="line"
            options={visitOptions}
            data={visitorBuyerGraphData}
            title={t("text.dashboard.visitOrderTitle")}
            year={visitorBuyerUserYear}
            setYear={setVisitorBuyerUserYear}
          />
          <ChartComponent
            type="bar"
            options={earningOptions}
            data={earningData}
            title={t("text.dashboard.earningsTitle")}
            year={earningYear}
            setYear={setEarningYear}
          />
          <ChartComponent
            type="line"
            options={registeredUserOptions}
            data={registeredUserData}
            title={t("text.dashboard.registeredUsersTitle")}
            year={registeredUserYear}
            setYear={setRegisteredUserYear}
          />
          <ChartComponent
            type="pie"
            options={categoriesOptions}
            data={categoriesData}
            title={t("text.dashboard.topSellingTitle")}
            optionsSecond={productOptions}
            dataSecond={productData}
            titleOne={t("text.dashboard.categoriesTitle")}
            titleSecond={t("text.dashboard.productsTitle")}
            chartCount={2}
            year={categoryProductYear}
            setYear={setCategoryProductYear}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
