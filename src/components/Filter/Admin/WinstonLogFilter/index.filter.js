import { Formik, Form } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DatePicker, CommonButton, Select } from "../../..";
import { disabledFutureDate } from "../../../../utils";

function WinstonLogFilter(mainProps) {
  const { t, onSubmit, loading, arrayOfData, onReset, filterData } = mainProps;
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const initialValues = {
    startDate: filterData?.startDate || "",
    endDate: filterData?.endDate || "",
    level: filterData?.level || undefined,
  };

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (filterData.startDate || filterData.endDate || filterData.level) {
      onReset();
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      enableReinitialize
      validate={(e) => {
        if (e.startDate || e.endDate || e.level) {
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
                        <DatePicker
                          name="startDate"
                          // id="fromDate"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
                          onChange={(_, dateString) =>
                            props.setFieldValue("startDate", dateString)
                          }
                          value={
                            values.startDate !== ""
                              ? moment(values.startDate)
                              : ""
                          }
                          disabledDate={disabledFutureDate}
                        />
                      </div>
                      <div className="dateBetween align-self-center mx-0 mx-sm-1 my-sm-0 my-1">
                        {t("text.common.to")}
                      </div>
                      <div className="form-control-wrap">
                        <DatePicker
                          name="endDate"
                          id="endDate"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
                          onChange={(_, dateString) =>
                            props.setFieldValue("endDate", dateString)
                          }
                          value={
                            values.endDate !== "" ? moment(values.endDate) : ""
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
                      {t("text.common.level")}
                    </label>
                    <Select
                      id="level"
                      extraClassName="form-control form-control-lg"
                      name="level"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.common.level")}
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

export default withTranslation()(WinstonLogFilter);
