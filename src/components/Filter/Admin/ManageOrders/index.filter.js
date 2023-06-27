import { Formik, Form } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DatePicker, CommonButton } from "../../..";
import { logger } from "../../../../utils";
// import { disabledFutureDate } from "../../../../utils";

function OrdersFilter(mainProps) {
  const { t, onSubmit, loading, onReset, filterData, defaultKey } = mainProps;
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [value, setValue] = useState(true);

  const initialValues = {
    fromDate: filterData?.fromDate || "",
    toDate: filterData?.toDate || "",
  };

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (filterData.fromDate || filterData.toDate) {
      onReset();
    }
  };
  const dateFormat = "DD/MM/YYYY";

  function onSelect(setFieldValue){
    try {
      setFieldValue("toDate", "");      
    } catch (error) {
      logger(error);
    }
  }
  useEffect(() => {   
    if (!filterData?.toDate) {
      setValue(true);      
    }
  }, [filterData?.toDate]);
  

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      enableReinitialize
      validate={(e) => {
        if (e.fromDate || e.toDate) {
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
                      {defaultKey} {t("text.common.date")}
                    </label>
                    <div className="dateRange d-flex flex-column flex-sm-row">
                      <div className="form-control-wrap">
                       
                        <DatePicker
                          name="fromDate"
                          id="fromDate"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
                          format={dateFormat}
                          onChange={(_, dateString) =>
                            props.setFieldValue("fromDate", dateString)
                          }
                          value={
                            values?.fromDate !== ""
                              ? moment(values?.fromDate)
                              : ""
                          }
                          onOpenChange={values?.fromDate && setValue(false)}
                          onSelect={(e)=>onSelect(props.setFieldValue, e)}
                        />
                      </div>
                      <div className="dateBetween align-self-center mx-0 mx-sm-1 my-sm-0 my-1">
                        {t("text.common.to")}
                      </div>
                      <div className="form-control-wrap">                       
                       
                        <DatePicker
                          name="toDate"
                          id="toDate"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
                          format={dateFormat}
                          onChange={(_, dateString) =>
                            props.setFieldValue("toDate", dateString)
                          }
                          value={
                            values?.toDate !== "" ? moment(values?.toDate) : ""
                          }
                          disabledDate={(d) => {
                            return (
                              !d ||
                              d.isBefore(
                                moment(
                                  initialValues?.fromDate ||
                                    props.values.fromDate
                                )
                              )
                            );
                          }}
                          disabled={value}
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

export default withTranslation()(OrdersFilter);
