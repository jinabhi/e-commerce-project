import { Formik, Form } from "formik";
import React from "react";

import { AntTextArea as TextInput, CommonButton } from "../../../index";
import validation from "./validation";

function TrackingLinkForm(mainProps) {
  const { onSubmit, loader, name } = mainProps;
  const initialValues = {
    text: "",
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={onSubmit}
      validationSchema={validation()}
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <div className="form-control-wrap">
                <TextInput
                  id="text"
                  className="form-control form-control-sm bg-gray-dim"
                  name="text"
                  disabled={false}
                  variant="standard"
                  type="text"
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group center">
              <CommonButton
                htmlType="submit"
                type="submit"
                loading={loader}
                extraClassName="btn btn-primary ripple-effect"
              >
                {name}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default TrackingLinkForm;
