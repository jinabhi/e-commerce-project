import { Formik, Form } from "formik";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CommonButton, Select } from "../../..";

function CustomNotificationFilter(mainProps) {
  const { t, onSubmit, loading, arrayOfData, onReset, filterData } = mainProps;
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const initialValues = {
    userType: filterData?.userType || undefined,
  };

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (filterData.userType) {
      onReset();
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      enableReinitialize
      validate={(e) => {
        if (e.userType) {
          setDisableReset(false);
          setDisableSubmit(true);
        } else {
          setDisableReset(true);
          setDisableSubmit(false);
        }
      }}
    >
      {(props) => {
        return (
          <Form>
            <div className="dropdown-body dropdown-body-rg">
              <div className="row g-3">
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
                      type="status"
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

export default withTranslation()(CustomNotificationFilter);
