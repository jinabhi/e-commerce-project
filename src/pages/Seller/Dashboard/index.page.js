import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  checkValidCount,
  currencyFormatter,
  MetaTags,
  SellerChartComponent,
  SellerDashboardCardComponent,
} from "../../../components";
import routesMap from "../../../routeControl/sellerRoutes";
import { DashboardServices, SellerDashboardServices } from "../../../services";
import { logger } from "../../../utils";

function SellerDashboard() {
  const { t } = useTranslation();
  const [visitorBuyerUserYear, setVisitorBuyerUserYear] = useState("");
  const [earningYear, setEarningYear] = useState("");
  const [visitorBuyerToDate, setVisitorBuyerToDate] = useState(undefined);
  const [visitorBuyerFromDate, setVisitorBuyerFromDate] = useState(undefined);
  const [earningToDate, setEarningToDate] = useState(undefined);
  const [earningFromDate, setEarningFromDate] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [dashboardCardValues, setDashboardCardValues] = useState({});
  const [visitorBuyerData, setVisitorBuyerData] = useState({
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
          color: "#858585",
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          font: {
            size: 16,
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
        color: "#858585",
      },
    },
    scales: {
      xAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "#858585",
        },
        grid: {
          display: true,
          tickBorderDash: [5, 5],
          drawBorder: false,
          borderColor: "#858585",
        },
        title: {
          display: true,
          // text: "Year - 2022",
          padding: {
            top: 20,
          },
          color: "#ffffff",
          font: {
            size: 16,
          },
        },
      },
      yAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "#858585",
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
          color: "#202020",
          borderDash: [5, 5],
          tickBorderDash: [5, 5],
          drawTicks: false,
          drawBorder: false,
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
            return `Amount : $${tooltipItems.formattedValue}`;
          },
        },
      },
      title: {
        display: true,
      },
      legend: {
        display: false,
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
        color: "#858585",
      },
    },
    scales: {
      xAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "#858585",
        },
        grid: {
          display: true,
          tickBorderDash: [5, 5],
          drawBorder: false,
          borderColor: "#858585",
        },
        title: {
          display: true,
          // text: "Year - 2022",
          padding: {
            top: 20,
          },
          color: "#ffffff",
          font: {
            size: 16,
          },
        },
      },
      yAxes: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "#858585",
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
          color: "#202020",
          borderDash: [5, 5],
          tickBorderDash: [5, 5],
          drawTicks: false,
          drawBorder: false,
        },
      },
    },
  };

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
        label: "",
        backgroundColor: "#555555",
        borderColor: "#C8A452",
        pointBackgroundColor: "#0D0D0D",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        data: [],
        fill: false,
        font: {
          size: 16,
        },
      },
    ],
  });

  const getDashboardCardValues = async () => {
    setLoading(true);
    try {
      const response = await SellerDashboardServices.sellerDashboardData();
      if (response.success) {
        setDashboardCardValues(response?.data || {});
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  const getVisitorBuyerGraphData = async () => {
    try {
      let queryParams = {
        year: visitorBuyerUserYear,
        fromDate: visitorBuyerFromDate,
        toDate: visitorBuyerToDate,
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
        let graphData = visitorBuyerData;
        graphData.datasets[0].data = visitorData;
        graphData.datasets[1].data = buyerData;
        setVisitorBuyerData({ ...graphData });
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
        fromDate: earningFromDate,
        toDate: earningToDate,
      };
      const response = await DashboardServices.sellerGraphData({ queryParams });
      const { success, data } = response;
      if (success) {
        let sellerCommissionData = data.map((item) => {
          return item?.sellerCommission || 0;
        });
        let graphData = earningData;
        let datasetsArray = graphData.datasets;
        let earnings = datasetsArray[0];
        earnings.data = sellerCommissionData;
        datasetsArray.splice(0, 1, earnings);
        graphData.datasets = datasetsArray;
        setEarningData({ ...graphData });
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getDashboardCardValues();
    getVisitorBuyerGraphData();
    getSellerGraphData();
  }, []);

  useEffect(() => {
    getVisitorBuyerGraphData();
  }, [visitorBuyerUserYear, visitorBuyerFromDate, visitorBuyerToDate]);

  useEffect(() => {
    getSellerGraphData();
  }, [earningYear, earningToDate, earningFromDate]);

  return (
    <>
      <MetaTags title={t("text.sellerDashboard.title")} />
      <div className="dashboardPage_sets mb-30">
        <div className="row g-3 g-lg-4">
          <SellerDashboardCardComponent
            linkPath={routesMap.ORDERS.path}
            title={t("text.sellerDashboard.activeOrders")}
            count={checkValidCount(dashboardCardValues?.activeOrder)}
            image="active_orders.svg"
          />
          <SellerDashboardCardComponent
            linkPath={routesMap.ORDERS.path}
            title={t("text.sellerDashboard.completedOrders")}
            count={checkValidCount(dashboardCardValues?.completeOrder)}
            image="completed_orders.svg"
          />
          <SellerDashboardCardComponent
            linkPath={routesMap.ORDERS.path}
            title={t("text.sellerDashboard.cancelledOrders")}
            count={checkValidCount(dashboardCardValues?.cancelOrder)}
            image="cancelled_orders.svg"
          />
          <SellerDashboardCardComponent
            linkPath="#"
            title={t("text.sellerDashboard.totalProductViews")}
            count={checkValidCount(dashboardCardValues?.viewProduct)}
            image="total_products_view.svg"
          />
          {/* <SellerDashboardCardComponent
            linkPath="#"
            title={t("text.sellerDashboard.totalSellerViews")}
            count={checkValidCount(dashboardCardValues?.viewSeller)}
            image="total_seller_view.svg"
          /> */}
          <SellerDashboardCardComponent
            linkPath={routesMap.PRODUCTS.path}
            title={t("text.sellerDashboard.totalProducts")}
            count={checkValidCount(dashboardCardValues?.totalProduct)}
            image="total_products.svg"
          />
          <SellerDashboardCardComponent
            linkPath={routesMap.EARNINGS.path}
            title={t("text.sellerDashboard.totalEarnings")}
            count={
              loading
                ? 0
                : currencyFormatter(
                    parseFloat(dashboardCardValues?.totalEarning),
                    "USD"
                  )
            }
            // count={
            //   loading
            //     ? 0
            //     : checkValidCount(
            //         dashboardCardValues?.totalEarning === null
            //           ? dashboardCardValues?.totalEarning
            //           : parseFloat(dashboardCardValues?.totalEarning).toFixed(2)
            //       )
            // }
            image="total_earning.svg"
          />
        </div>
      </div>
      <div className="dashboardPage_charts mb-30">
        <div className="row">
          <SellerChartComponent
            type="line"
            options={visitOptions}
            data={visitorBuyerData}
            title={t("text.sellerDashboard.visitOrderTitle")}
            year={visitorBuyerUserYear}
            setYear={setVisitorBuyerUserYear}
            setToDate={setVisitorBuyerToDate}
            toDate={visitorBuyerToDate}
            setFromDate={setVisitorBuyerFromDate}
            fromDate={visitorBuyerFromDate}
          />
          <SellerChartComponent
            type="line"
            options={earningOptions}
            data={earningData}
            title={t("text.sellerDashboard.earnings")}
            year={earningYear}
            setYear={setEarningYear}
            setToDate={setEarningToDate}
            toDate={earningToDate}
            setFromDate={setEarningFromDate}
            fromDate={earningFromDate}
          />
        </div>
      </div>
    </>
  );
}

export default SellerDashboard;
