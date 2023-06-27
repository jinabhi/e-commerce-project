import { Formik, Form } from "formik";
import React from "react";
import { withTranslation } from "react-i18next";
import { Select } from "../../..";

function UserQueriesFilter(mainProps) {
  const { t, onSubmit, arrayOfData } = mainProps;

  const initialValues = {
    year: undefined,
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <Select
              id="status"
              extraClassName="form-select form-select-sm"
              name="year"
              disabled={false}
              variant="standard"
              placeholder={t("text.sellerDashboard.year")}
              arrayOfData={arrayOfData}
              setFieldValue={props.handleChange}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default withTranslation()(UserQueriesFilter);
