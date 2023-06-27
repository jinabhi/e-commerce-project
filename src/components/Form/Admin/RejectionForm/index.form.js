import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";

import { AntTextArea as TextInput, CommonButton } from "../../../index";
import validation from "./validation";

function RejectionForm(mainProps) {
  const { onSubmit, loading } = mainProps;
  const initialValues = {
    rejectMessage: "",
  };
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <div className="form-control-wrap">
                <TextInput
                  id="rejectMessage"
                  className="form-control form-control-sm bg-gray-dim"
                  name="rejectMessage"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t("text.common.write")}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group center">
              <CommonButton
                extraClassName="btn btn-md btn-primary  "
                loading={loading}
                htmlType="submit"
                data-dismiss="modal"
                type="submit"
              >
                {t("text.common.submit")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RejectionForm;
