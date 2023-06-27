import { Formik, Form } from "formik";
// import moment from "moment";
import React from "react";
// import { disabledFutureDate } from "../../../../utils";
// import { DatePicker } from "../../../Antd";
import { Select } from "../../../UiElement";

function EarningFilter({
  setFromDate,
  setToDate,
  setSelection,
  currentYear,
  // selection,
}) {
  const yearPayload = [
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

  // const dateFormat = "DD/MM/YYYY";
  const initialValues = {
    year: undefined,
    // registeredFrom: "",
    // registeredTo: "",
  };
  const onRegisteredChange = (e) => {
    setFromDate(e);
  };
  const onRegisteredTo = (e) => {
    setToDate(e);
  };
  const onSelectyear = (e) => {
    setSelection(e);
  };

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

  return (
    <Formik enableReinitialize initialValues={{ ...initialValues }}>
      {(props) => {
        const { values } = props;
        onRegisteredChange(values.registeredFrom && values.registeredFrom);
        onRegisteredTo(values.registeredTo && values.registeredTo);
        return (
          <Form>
            <div className="d-flex flex-wrap">
              <div className="form-group mb-0 yearSelect">
                <Select
                  id="Year"
                  extraClassName="form-select customSelect form-select-sm"
                  name="year"
                  disabled={false}
                  placeholder="This Year"
                  arrayOfData={yearPayload}
                  setFieldValue={props.handleChange}
                  onSelect={(e) => onSelectyear(e)}
                />
              </div>

              {/* <div className="dateRangepicker pl-2">
                <div className="form-group mb-0 d-flex"> */}
              {/* <div className="form-control-wrap">
                    <div className="input-group date datepicker"> */}
              {/* <span className="date-head">From:</span>
                      <DatePicker
                        name="registeredFrom"
                        id="registeredFrom"
                        bordered={false}
                        className="form-control datetimepicker-input"
                        placeholder="DD/MM/YY"
                        onChange={(_, dateString) =>
                          props.setFieldValue("registeredFrom", dateString)
                        }
                        defaultValue={
                          values.registeredFrom !== ""
                            ? moment(values.registeredFrom)
                            : ""
                        }
                        format={dateFormat}
                        // disabledDate={disabledFutureDate}
                        disabledDate={
                          selection
                            ? enableDateRanges({
                                endDate:
                                  `${selection}` === `${currentYear}`
                                    ? new Date(moment().format("YYYY-MM-DD"))
                                    : new Date(`${selection}-12-31`),
                                startDate: new Date(`${selection}-01-01`),
                              })
                            : disabledFutureDate
                        }
                      /> */}
              {/* <span
                        className="input-group-addon"
                        data-toggle="datetimepicker"
                        data-target="#datetimepicker10"
                      >
                        <em className="icon-calendar" />
                      </span> */}
              {/* </div>
                  </div> */}
              {/* <div className="form-control-wrap">
                    <div className="input-group date datepicker"> */}
              {/* <span className="date-head">To:</span>
                      <DatePicker
                        name="registeredTo"
                        id="registeredTo"
                        bordered={false}
                        className="form-control datetimepicker-input"
                        placeholder="DD/MM/YY"
                        onChange={(_, dateString) =>
                          props.setFieldValue("registeredTo", dateString)
                        }
                        format={dateFormat}
                        defaultValue={
                          values.registeredTo !== ""
                            ? moment(values.registeredTo)
                            : ""
                        }
                        // disabledDate={disabledFutureDate}
                        disabledDate={
                          selection
                            ? enableDateRanges({
                                endDate:
                                  `${selection}` === `${currentYear}`
                                    ? new Date(moment().format("YYYY-MM-DD"))
                                    : new Date(`${selection}-12-31`),
                                startDate: new Date(`${selection}-01-01`),
                              })
                            : disabledFutureDate
                        }
                      /> */}
              {/* <span
                        className="input-group-addon"
                        data-toggle="datetimepicker"
                        data-target="#datetimepicker10"
                      >
                        <em className="icon-calendar" />
                      </span> */}
              {/* </div>
                  </div> */}
              {/* </div>
              </div> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default EarningFilter;
