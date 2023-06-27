import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Input as TextInput } from "../../../index";
import { CommonButton } from "../../../UiElement";
import validation from "./validation";

function EmailForm(mainProps) {
  const { onSubmit, loading } = mainProps;
  const initialValues = {
    to: "",
    from: "",
    subject: "",
    message: "",
  };
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={(e, { resetForm }) => {
        onSubmit(e, resetForm);
      }}
      validationSchema={validation()}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="row justify-content-center">
              <div className="col-sm-8 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.contactPromotional.to")}
                    className="form-control"
                    name="to"
                    disabled
                    value="info@mor.luxury"
                    variant="standard"
                    type="text"
                    placeholder={t("text.contactPromotional.to")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-user icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-sm-8 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.contactPromotional.from")}
                    className="form-control"
                    name="from"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t("text.contactPromotional.from")}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-user icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>

              <div className="col-sm-8 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.contactPromotional.subjectPlaceholder")}
                    className="form-control"
                    name="subject"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t(
                      "text.contactPromotional.subjectPlaceholder"
                    )}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-arrow-down icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-md-8 form">
                <div className="form-floating">
                  <TextInput
                    floatingLabel
                    label={t("text.contactPromotional.messagePlaceholder")}
                    className="form-control"
                    name="message"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t(
                      "text.contactPromotional.messagePlaceholder"
                    )}
                    setFieldValue={props.handleChange}
                    icon={
                      <span className="form-icon">
                        <span className="icon-pencil icomoon text-white" />
                      </span>
                    }
                  />
                </div>
              </div>
              <div className="col-md-12 text-center mt-3">
                <CommonButton
                  type="submit"
                  extraClassName="btn btn-primary ripple-effect flex-shrink-0 w190 btn-gradiant"
                  disabled={loading}
                >
                  {t("text.contactPromotional.send")}
                </CommonButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default EmailForm;
