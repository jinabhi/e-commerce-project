import { Formik, Form } from "formik";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { CommonButton } from "../../../UiElement";
import Select from "../../../UiElement/Select";

function ManageStaffFilter(mainProps) {
  const { t, onSubmit, onReset, statusPayload, filterData, loading } =
    mainProps;
  const initialValues = {
    status: filterData?.status || undefined,
  };
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const onHandleReset = (resetForm) => {
    resetForm({});
    setDisableReset(true);
    if (filterData.status) {
      onReset();
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={disableSubmit && onSubmit}
      validate={(e) => {
        if (e.status) {
          setDisableReset(false);
          setDisableSubmit(true);
        } else {
          setDisableReset(true);
          setDisableSubmit(false);
        }
      }}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="dropdown-body dropdown-body-rg">
              <div className="row g-3">
                <div className="col-12">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.common.status")}
                    </label>
                    <div className="form-control-wrap ">
                      <Select
                        id="status"
                        extraClassName="form-control form-control-lg"
                        name="status"
                        disabled={false}
                        placeholder={t("text.common.status")}
                        arrayOfData={statusPayload}
                        setFieldValue={props.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown-foot between">
              <Link
                to="#"
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
                type="submit"
                loading={loading}
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

export default withTranslation()(ManageStaffFilter);
