import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { DatePicker } from "../../Antd";
import Charts from "../Chart";
import Select from "../Select";

function ChartComponent({
  options,
  data,
  type,
  chartCount = 1,
  optionsSecond,
  dataSecond,
  title,
  titleOne,
  titleSecond,
  year,
  setYear,
}) {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const [chartHtml, setChartHtml] = useState();
  const [secondChartHtml, setSecondChartHtml] = useState();
  const yearData = [
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

  useEffect(() => {
    setChartHtml(<></>);
    let chart = <Charts type={type} options={options} data={data} />;
    setTimeout(() => {
      setChartHtml(chart);
    }, 2);
    if (chartCount > 1) {
      setSecondChartHtml(<></>);
      let secondChart = (
        <Charts type={type} options={optionsSecond} data={dataSecond} />
      );
      setTimeout(() => {
        setSecondChartHtml(secondChart);
      }, 2);
    }
  }, [data, dataSecond]);

  const initialValues = {
    year: undefined,
    toDate: undefined,
    fromDate: undefined,
  };

  return (
    <>
      <div className="col-lg-6">
        <div className="card card-full">
          <div className="nk-ecwg nk-ecwg8 h-100">
            <div className="card-inner">
              <div className="card-title-group flex-wrap mb-3">
                <div className="card-title">
                  <h6 className="title">{title}</h6>
                </div>
                <Formik initialValues={{ ...initialValues }}>
                  {(props) => (
                    <Form className="w-100">
                      <div className="d-flex justify-content-between flex-wrap flex-lg-nowrap w-100 mt-3">
                        <div className="form-group">
                          <label className="form-label mb-0">
                            {t("text.common.year")}
                          </label>
                          {/* <select
                                   className="form-select form-select-sm custom-select2"
                                   data-placeholder="Select"
                                  >
                                   <option value="All">This Year</option>
                                   <option value="2021">2021</option>
                                   <option value="2020">2020</option>
                                </select> */}
                          <Select
                            id="year"
                            name="year"
                            disabled={false}
                            variant="standard"
                            arrayOfData={yearData}
                            placeholder="Select"
                            setFieldValue={props.handleChange}
                            onSelect={(e) => {
                              if (setYear) {
                                setYear(e ? `${e}` : "");
                              }
                            }}
                          />
                        </div>
                        <div className="dateRange pl-0 pl-lg-0">
                          <div className="form-group">
                            <div className="row gx-2">
                              <div className="col-6">
                                {/* <label className="form-label mb-0">
                                  {t("text.common.from")}
                                </label> */}
                                <div className="form-control-wrap">
                                  {/* <label
                                        htmlFor="earningsFrom"
                                        className="form-icon form-icon-right"
                                        style={{ zIndex: 1 }}
                                      >
                                        <em className="icon ni ni-calendar" />
                                      </label> */}
                                  {/* <AdminDatePickerForm /> */}
                                  {/* <DatePicker
                                    id="fromDate"
                                    name="fromDate"
                                    disabled={false}
                                    variant="standard"
                                    className="form-control date-picker shadow-none"
                                    placeholder="DD/MM/YY"
                                    // suffixIcon=""
                                    setFieldValue={props.handleChange}
                                  /> */}
                                  {/* <input
                                        id="earningsFrom"
                                        type="text"
                                        className="form-control date-picker shadow-none"
                                        placeholder="DD/MM/YY"
                                        data-date-format="dd/mm/yyyy"
                                      /> */}
                                </div>
                              </div>
                              <div className="col-6">
                                {/* <label className="form-label mb-0">
                                  {t("text.common.to")}
                                </label> */}
                                <div className="form-control-wrap">
                                  {/* <label
                                        htmlFor="earningsTo"
                                        className="form-icon form-icon-right"
                                        style={{ zIndex: 1 }}
                                      >
                                        <em className="icon ni ni-calendar" />
                                      </label> */}
                                  {/* <AdminDatePickerForm /> */}
                                  {/* <DatePicker
                                    id="toDate"
                                    name="toDate"
                                    disabled={false}
                                    variant="standard"
                                    className="form-control date-picker shadow-none"
                                    placeholder="DD/MM/YY"
                                    // suffixIcon=""
                                    setFieldValue={props.handleChange}
                                  /> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              {chartCount === 1 ? (
                <div className="nk-ecwg8-ck graphHeight-lg">
                  {/* <Charts type={type} options={options} data={data} /> */}
                  {chartHtml}
                </div>
              ) : (
                <>
                  <div className="nk-ecwg8-ck">
                    <div className="card-title card-title-sm">
                      <h6 className="title text-muted">{titleOne}</h6>
                    </div>
                    <div className="graphHeight-sm">
                      {/* <Charts type={type} options={options} data={data} /> */}
                      {chartHtml}
                    </div>
                  </div>
                  <div className="nk-ecwg8-ck border-top mt-4 pt-4">
                    <div className="card-title card-title-sm">
                      <h6 className="title text-muted">{titleSecond}</h6>
                    </div>
                    <div className="graphHeight-sm">
                      {/* <Charts type={type} options={optionsSecond} data={dataSecond}/> */}
                      {secondChartHtml}
                    </div>
                  </div>
                </>
              )}
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

export default React.memo(ChartComponent);
