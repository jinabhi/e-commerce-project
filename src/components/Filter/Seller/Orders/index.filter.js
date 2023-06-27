import { Formik, Form } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DatePicker, CommonButton, Select } from "../../..";
import { logger } from "../../../../utils";

function SellerOrdersFilter(mainProps) {
  const { t, onSubmit, loading, arrayOfData, onReset, filterData } = mainProps;
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [value, setValue] = useState(true);

  const initialValues = {
    fromDate: filterData?.fromDate || "",
    toDate: filterData?.toDate || "",
    status: filterData?.status || undefined,
  };
  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (filterData.fromDate || filterData.toDate || filterData.status) {
      onReset();
    }
  };
  const dateFormat = "DD/MM/YYYY";

  function onSelect(setFieldValue) {
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
        if (e.fromDate || e.toDate || e.status) {
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
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-4">{t("text.sellerOrders.ordersFilter")}</h2>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerOrders.ordersStatus")}
                  </label>
                  <Select
                    id="status"
                    extraClassName="form-control form-control-lg"
                    name="status"
                    disabled={false}
                    variant="standard"
                    placeholder={t("text.sellerOrders.ordersStatus")}
                    arrayOfData={arrayOfData}
                    setFieldValue={props.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
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
                        values?.fromDate !== "" ? moment(values?.fromDate) : ""
                      }
                      onOpenChange={values?.fromDate && setValue(false)}
                      onSelect={(e) => onSelect(props.setFieldValue, e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
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
                              initialValues?.fromDate || props.values.fromDate
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
            <div className="d-flex align-items-center justify-content-between">
              <CommonButton
                className="btn btn-gradiant"
                htmlType="submit"
                loading={loading}
                type="submit"
              >
                {t("text.common.applyFilter")}
              </CommonButton>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (!disableReset) {
                    onHandleReset(props.resetForm);
                  }
                }}
                type="button"
                className="link btn btn-none"
              >
                {t("text.common.resetFilter")}
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
export default withTranslation()(SellerOrdersFilter);
