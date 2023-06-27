import React, { useEffect, useState } from "react";
import { Charts } from "../../../../components";
import { EarningsServices } from "../../../../services";
import { logger } from "../../../../utils";

function EarningGraph({ registeredFrom, registeredTo, Year }) {
  const [sellerGraphData, setSellerGraphData] = useState();
  const [earningYear, setEarningYear] = useState();
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
        label: "",
        backgroundColor: "#555555",
        borderColor: "#C8A452",
        pointBackgroundColor: "#0D0D0D",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        data: sellerGraphData,
        // data: [
        //   0, 37410, 48240, 35104, 49480, 50000, 25670, 46660, 14830, 45590,
        //   15730, 34790, 43950,
        // ],
        fill: false,
        font: {
          size: 16,
        },
      },
    ],
  };

  const getEarningGraphData = async () => {
    try {
      let queryParams = {
        status: "all",
        year: Year,
        fromDate: registeredFrom,
        toDate: registeredTo,
      };
      const response = await EarningsServices.getEarningGraphServices({
        queryParams,
      });
      const { success, data } = response;
      if (success) {
        let sellerCommission = data.map((item) => {
          return item?.sellerCommission;
        });
        // let graphData = chartData;
        // let datasetsArray = graphData.datasets;
        // let earnings = datasetsArray[0];
        // earnings.data = adminCommissionData;
        // datasetsArray.splice(0, 1, earnings);
        // graphData.datasets = datasetsArray;
        // setChartData();
        setSellerGraphData(sellerCommission);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getEarningGraphData();
  }, [registeredTo, registeredFrom, Year]);

  const chartOptions = {
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
          text: `Year - ${Year}`,
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

  return (
    <>
      <div style={{ height: "500px" }}>
        <Charts
          type="line"
          data={chartData}
          options={chartOptions}
          year={earningYear}
          setYear={setEarningYear}
        />
      </div>
    </>
  );
}

export default EarningGraph;
