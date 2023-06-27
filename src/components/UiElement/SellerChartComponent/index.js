import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import moment from "moment";
import Charts from "../Chart";
// import { DatePicker } from "../../Antd";
import Select from "../Select";
// import { disabledFutureDate } from "../../../utils";
// import { classicDateFormat } from "../../../helpers";

function SellerChartComponent({
  options,
  data,
  type,
  title,
  year,
  setYear,
  setToDate,
  setFromDate,
}) {
  const currentYear = new Date().getFullYear();
  const [chartHtml, setChartHtml] = useState();

  useEffect(() => {
    setChartHtml(<></>);
    let chart = <Charts type={type} options={options} data={data} />;
    setTimeout(() => {
      setChartHtml(chart);
    }, 2);
  }, [data]);

  // function enableDateRanges(range = { startDate: false, endDate: false }) {
  //   const { startDate, endDate } = range;
  //   return function disabledDate(current) {
  //     let startCheck = true;
  //     let endCheck = true;
  //     if (startDate) {
  //       startCheck = current && current < moment(startDate, "YYYY-MM-DD");
  //     }
  //     if (endDate) {
  //       endCheck =
  //         current && current > moment(endDate, "YYYY-MM-DD").add(1, "days");
  //     }
  //     return (startDate && startCheck) || (endDate && endCheck);
  //   };
  // }

  const { t } = useTranslation();
  const selectOptions = [
    {
      id: `${currentYear}`,
      name: `This Year`,
    },
    {
      id: `${currentYear - 1}`,
      name: `${currentYear - 1}`,
    },
    {
      id: `${currentYear - 2}`,
      name: `${currentYear - 2}`,
    },
  ];

  const initialValues = {
    year: undefined,
    toDate: undefined,
    fromDate: undefined,
  };

  const onToDateChange = (e) => {
    setToDate(e);
  };
  const onFromDateChange = (e) => {
    setFromDate(e);
  };

  return (
    <>
      <div className="col-md-12 col-xxl-6">
        <div className="card card-full bg-850 radius-20">
          <div className="nk-ecwg nk-ecwg8 h-100">
            <div className="card-inner">
              <div className="card-title-group flex-wrap mb-3">
                <div className="common-heading p-0 ">
                  <h1 className="common-heading_title mb-30 text-white">
                    {title}
                  </h1>
                </div>
                <Formik initialValues={{ ...initialValues }}>
                  {(props) => {
                    const { values } = props;
                    onToDateChange(values.toDate);
                    onFromDateChange(values.fromDate);
                    return (
                      <Form className="w-100">
                        <div className="row mt-3 justify-content-between">
                          <div className="col-md-3">
                            <div className="form-group mb-0">
                              {/* <SellerDashboardForm arrayOfData={selectOptions} /> */}
                              <Select
                                id="year"
                                extraClassName="form-select form-select-sm"
                                name="year"
                                disabled={false}
                                variant="standard"
                                placeholder={t("text.sellerDashboard.year")}
                                arrayOfData={selectOptions}
                                setFieldValue={props.handleChange}
                                onSelect={(e) => {
                                  if (setYear) {
                                    setYear(e ? `${e}` : "");
                                    setToDate(undefined);
                                    setFromDate(undefined);
                                    props.setFieldValue("fromDate", undefined);
                                    props.setFieldValue("toDate", undefined);
                                    onToDateChange(undefined);
                                    onFromDateChange(undefined);
                                  }
                                }}
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-9 text-end">
                            <div className="dateRangepicker pl-2">
                              <div className="form-group mb-0 d-flex">
                                <div className="form-control-wrap">
                                  <div
                                    id="datetimepicker7"
                                    className="input-group date datepicker"
                                    data-date-format="DD/MM/YYYY"
                                    data-target-input="nearest"
                                  >
                                    <span className="date-head">From:</span>
                                    <SellerDatePickerForm />
                                    <DatePicker
                                      id="fromDate"
                                      name="fromDate"
                                      disabled={false}
                                      variant="standard"
                                      className="form-control datetimepicker-input"
                                      placeholder="DD/MM/YY"
                                      onChange={(_, dateString) =>
                                        props.setFieldValue(
                                          "fromDate",
                                          dateString
                                        )
                                      }
                                      defaultValue={
                                        values.fromDate
                                          ? moment(values.fromDate)
                                          : undefined
                                      }
                                      format={classicDateFormat}
                                      disabledDate={
                                        year
                                          ? enableDateRanges({
                                              endDate:
                                                `${year}` === `${currentYear}`
                                                  ? new Date(
                                                      moment().format(
                                                        "YYYY-MM-DD"
                                                      )
                                                    )
                                                  : new Date(`${year}-12-31`),
                                              startDate: new Date(
                                                `${year}-01-01`
                                              ),
                                            })
                                          : disabledFutureDate
                                      }
                                    />
                                    <span
                                      className="input-group-addon"
                                      data-toggle="datetimepicker"
                                      data-target="#datetimepicker7"
                                    >
                                      <em className="icon-calendar" />
                                    </span>
                                  </div>
                                </div>
                                <div className="form-control-wrap">
                                  <div
                                    id="datetimepicker8"
                                    className="input-group date datepicker"
                                    data-date-format="DD/MM/YYYY"
                                    data-target-input="nearest"
                                  >
                                    <span className="date-head">To:</span>
                                    <SellerDatePickerForm />
                                    <DatePicker
                                      id="toDate"
                                      name="toDate"
                                      disabled={false}
                                      variant="standard"
                                      className="form-control datetimepicker-input"
                                      placeholder="DD/MM/YY"
                                      onChange={(_, dateString) =>
                                        props.setFieldValue(
                                          "toDate",
                                          dateString
                                        )
                                      }
                                      defaultValue={
                                        values.toDate
                                          ? moment(values.toDate)
                                          : undefined
                                      }
                                      format={classicDateFormat}
                                      disabledDate={
                                        year
                                          ? enableDateRanges({
                                              endDate:
                                                year === `${currentYear}`
                                                  ? new Date()
                                                  : new Date(`${year}-12-31`),
                                              startDate: new Date(
                                                `${year}-01-01`
                                              ),
                                            })
                                          : disabledFutureDate
                                      }
                                    />
                                    <span
                                      className="input-group-addon"
                                      data-toggle="datetimepicker"
                                      data-target="#datetimepicker8"
                                    >
                                      <em className="icon-calendar" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              <div className="nk-ecwg8-ck" style={{ height: "400px" }}>
                {/* <Charts type={type} options={options} data={data} /> */}
                {chartHtml}
              </div>
              <p className="text-white text-center mt-2">
                Year - {year || `${new Date().getFullYear()}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(SellerChartComponent);
