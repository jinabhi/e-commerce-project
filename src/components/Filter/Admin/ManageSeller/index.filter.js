import { Formik, Form } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DatePicker, CommonButton, Select } from "../../..";
import { classicDateFormat } from "../../../../helpers";
import { disabledFutureDate } from "../../../../utils";

function ManageSellerFilter(mainProps) {
  const {
    t,
    onSubmit,
    onReset,
    loading,
    countryList,
    cityList,
    filterData,
    onSelectCountry,
    onSelectState,
    statesList,
    cityLoader,
    stateLoader,
    countryLoader,
  } = mainProps;

  const initialValues = {
    registeredFrom: filterData?.registeredFrom || "",
    registeredTo: filterData?.registeredTo || "",
    countryId: filterData?.countryId || undefined,
    stateId: filterData?.stateId || undefined,
    cityId: filterData?.cityId || undefined,
    status: filterData?.status || undefined,
  };

  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const arrayOfData = [
    { id: "all", name: "All" },
    {
      id: "pendingApproval",
      name: "Pending Approval",
    },
    {
      id: "profileInComplete",
      name: "Profile Incomplete",
    },
    {
      id: "active",
      name: "Active",
    },
    {
      id: "inactive",
      name: "Inactive",
    },
    {
      id: "rejected",
      name: "Rejected",
    },
  ];

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (
      filterData?.registeredFrom ||
      filterData?.registeredTo ||
      filterData?.status ||
      filterData?.countryId ||
      filterData?.stateId ||
      filterData?.cityId
    )
      onReset();
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      enableReinitialize
      validate={(e) => {
        if (
          e.registeredFrom ||
          e.registeredTo ||
          e.status ||
          e.countryId ||
          e.cityId
        ) {
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
                          format={classicDateFormat}
                          onChange={(_, dateString) =>
                            props.setFieldValue("registeredFrom", dateString)
                          }
                          value={
                            values?.registeredFrom !== ""
                              ? moment(values?.registeredFrom)
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
                          format={classicDateFormat}
                          onChange={(_, dateString) => {
                            props.setFieldValue("registeredTo", dateString);
                          }}
                          value={
                            values?.registeredTo !== ""
                              ? moment(values?.registeredTo)
                              : ""
                          }
                          disabledDate={(d) => {
                            return (
                              !d ||
                              d.isBefore(
                                moment(
                                  initialValues?.registeredFrom ||
                                    props.values.registeredFrom
                                )
                              )
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.manageSellers.country")}
                    </label>
                    <Select
                      showSearch
                      id="country"
                      extraClassName="form-control form-control-lg"
                      name="countryId"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.common.country")}
                      arrayOfData={countryList}
                      setFieldValue={props.handleChange}
                      onSelect={(e) => onSelectCountry(props.setFieldValue, e)}
                      loading={countryLoader}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.common.states")}
                    </label>
                    <Select
                      showSearch
                      id="state"
                      extraClassName="form-control form-control-lg"
                      name="stateId"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.common.states")}
                      arrayOfData={statesList}
                      setFieldValue={props.handleChange}
                      onSelect={(e) => onSelectState(props.setFieldValue, e)}
                      loading={stateLoader}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.manageSellers.city")}
                    </label>
                    <Select
                      showSearch
                      id="city"
                      extraClassName="form-control form-control-lg"
                      name="cityId"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.common.city")}
                      arrayOfData={cityList}
                      setFieldValue={props.handleChange}
                      loading={cityLoader}
                    />
                  </div>
                </div>
                <div className="col-md-6">
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

export default withTranslation()(ManageSellerFilter);
