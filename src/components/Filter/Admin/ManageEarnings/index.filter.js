import { Formik, Form } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DatePicker, CommonButton, Select } from "../../..";
import { disabledFutureDate } from "../../../../utils";

function AdminEarningFilter(mainProps) {
  const {
    t,
    onSubmit,
    loading,
    onReset,
    filterData,
    arrayOfData,
    statusArray,
  } = mainProps;
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const initialValues = {
    fromDate: filterData?.fromDate || "",
    toDate: filterData?.toDate || "",
    year: filterData?.year || undefined,
    status: filterData?.status || undefined,
  };

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (
      filterData.fromDate ||
      filterData.toDate ||
      filterData.year ||
      filterData.status
    ) {
      onReset();
    }
  };
  const dateFormat = "DD/MM/YYYY";

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      enableReinitialize
      validate={(e) => {
        if (e.fromDate || e.toDate || e.status || e.year) {
          setDisableReset(false);
          setDisableSubmit(true);
        } else {
          setDisableReset(true);
          setDisableSubmit(false);
        }
      }}
    >
      {(props) => {
        const { values } = props;
        return (
          <Form>
            <div className="dropdown-body dropdown-body-rg">
              <div className="row g-3">
                <div className="col-12">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.manageEarning.year")}
                    </label>
                    <Select
                      id="year"
                      extraClassName="form-control form-control-lg"
                      name="year"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.common.year")}
                      arrayOfData={arrayOfData}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.manageEarning.status")}
                    </label>
                    <Select
                      id="status"
                      extraClassName="form-control form-control-lg"
                      name="status"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.common.status")}
                      arrayOfData={statusArray}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="overline-title overline-title-alt">
                      {t("text.manageEarning.startEnd")}
                    </label>
                    <div className="dateRange d-flex flex-column flex-sm-row">
                      <div className="form-control-wrap">
                        {/* <label
                          htmlFor="fromDate"
                          className="form-icon form-icon-right"
                          style={{ zIndex: 1 }}
                        >
                          <em className="icon ni ni-calendar" />
                        </label> */}
                        <DatePicker
                          name="fromDate"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
                          format={dateFormat}
                          onChange={(_, dateString) =>
                            props.setFieldValue("fromDate", dateString)
                          }
                          value={
                            values.fromDate !== ""
                              ? moment(values.fromDate)
                              : ""
                          }
                          disabledDate={disabledFutureDate}
                        />
                      </div>
                      <div className="dateBetween align-self-center mx-0 mx-sm-1 my-sm-0 my-1">
                        {t("text.common.to")}
                      </div>
                      <div className="form-control-wrap">
                        {/* <label
                          htmlFor="toDate"
                          className="form-icon form-icon-right"
                          style={{ zIndex: 1 }}
                        >
                          <em className="icon ni ni-calendar" />
                        </label> */}

                        <DatePicker
                          name="toDate"
                          id="toDate"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
                          onChange={(_, dateString) =>
                            props.setFieldValue("toDate", dateString)
                          }
                          format={dateFormat}
                          value={
                            values.toDate !== "" ? moment(values.toDate) : ""
                          }
                          disabledDate={disabledFutureDate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown-foot between">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (!disableReset) {
                    onHandleReset(props.resetForm);
                  }
                }}
                type="button"
                className="clickable"
              >
                {t("text.common.resetFilter")}
              </Link>
              <CommonButton
                extraClassName="btn btn-sm btn-primary"
                htmlType="submit"
                loading={loading}
                type="submit"
              >
                {t("text.common.filter")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default withTranslation()(AdminEarningFilter);
