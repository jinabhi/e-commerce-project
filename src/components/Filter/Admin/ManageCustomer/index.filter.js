import { Formik, Form } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DatePicker, CommonButton, Select } from "../../..";
import { disabledFutureDate } from "../../../../utils";

function ManageCustomerFilter(mainProps) {
  const { t, onSubmit, loading, arrayOfData, onReset, filterData } = mainProps;

  const initialValues = {
    registeredFrom: filterData?.registeredFrom || "",
    registeredTo: filterData?.registeredTo || "",
    status: filterData?.status || undefined,
  };
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (
      filterData.registeredFrom ||
      filterData.registeredTo ||
      filterData.status
    ) {
      onReset();
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      validate={(e) => {
        if (e.registeredFrom || e.registeredTo || e.status) {
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
                      {t("text.manageSellers.registeredOn")}
                    </label>
                    <div className="dateRange d-flex flex-column flex-sm-row">
                      <div className="form-control-wrap">
                        {/* <label
                          htmlFor="registeredFrom"
                          className="form-icon form-icon-right"
                          style={{ zIndex: 1 }}
                        >
                          <em className="icon ni ni-calendar" />
                        </label> */}
                        <DatePicker
                          name="registeredFrom"
                          id="registeredFrom"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
                          onChange={(_, dateString) =>
                            props.setFieldValue("registeredFrom", dateString)
                          }
                          value={
                            values.registeredFrom !== ""
                              ? moment(values.registeredFrom)
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
                          htmlFor="registeredTo"
                          className="form-icon form-icon-right"
                          style={{ zIndex: 1 }}
                        >
                          <em className="icon ni ni-calendar" />
                        </label> */}

                        <DatePicker
                          name="registeredTo"
                          id="registeredTo"
                          className="form-control date-picker shadow-none"
                          placeholder="DD/MM/YY"
                          onChange={(_, dateString) =>
                            props.setFieldValue("registeredTo", dateString)
                          }
                          value={
                            values.registeredTo !== ""
                              ? moment(values.registeredTo)
                              : ""
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
                      {t("text.common.status")}
                    </label>
                    <Select
                      id="status"
                      extraClassName="form-control form-control-lg"
                      name="status"
                      disabled={false}
                      type="status"
                      variant="standard"
                      placeholder={t("text.common.status")}
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

export default withTranslation()(ManageCustomerFilter);
