import { Formik, Form } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DatePicker, CommonButton, Select } from "../../..";
import { disabledFutureDate } from "../../../../utils";

function UserQueriesFilter(mainProps) {
  const { t, onSubmit, loading, arrayOfData, onReset, filterData } = mainProps;
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const initialValues = {
    fromDate: filterData?.fromDate || "",
    toDate: filterData?.toDate || "",
    userType: filterData?.userType || undefined,
  };

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (filterData.fromDate || filterData.toDate || filterData.userType) {
      onReset();
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      enableReinitialize
      validate={(e) => {
        if (e.fromDate || e.toDate || e.userType) {
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
                  <div className="form-group">
                    <label className="overline-title overline-title-alt">
                      {t("text.common.date")}
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
                          // id="fromDate"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
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
                          value={
                            values.toDate !== "" ? moment(values.toDate) : ""
                          }
                          disabledDate={disabledFutureDate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.common.userType")}
                    </label>
                    <Select
                      id="status"
                      extraClassName="form-control form-control-lg"
                      name="userType"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.common.userType")}
                      arrayOfData={arrayOfData}
                      setFieldValue={props.handleChange}
                    />
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

export default withTranslation()(UserQueriesFilter);
