import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { CommonButton, Input as TextInput, CancelButton } from "../../../index";
import { validationStepThree } from "./validation";

function BankDetailsForm({
  onSubmit,
  loading,
  isEdit,
  editProfile,
  cancelProfile,
  accountData,
  formRef,
}) {
  let initialValues = {
    accountHolderName: accountData?.accountHolderName || "",
    accountNumber: accountData?.accountNumber || "",
    routingNumber: accountData?.routingNumber || "",
  };
  const { t } = useTranslation();
  return (
    <fieldset className="h-100">
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validationStepThree()}
        onSubmit={onSubmit}
        innerRef={formRef}
        enableReinitialize
      >
        {(props) => {
          return (
            <Form>
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="row">
                    <div className="col-lg-12 col-xl-8 col-xxl-6">
                      <div className="formSection readOnly">
                        <div className="form-group mb-30">
                          <label className="form-label">
                            {t("text.register.accountHolderName")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            readOnly={!isEdit}
                            placeholder={t(
                              "text.register.accountHolderNamePlaceholder"
                            )}
                            name="accountHolderName"
                            variant="standard"
                            setFieldValue={props.handleChange}
                          />
                        </div>
                        <div className="form-group mb-30">
                          <label className="form-label">
                            {t("text.register.accountNumber")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            readOnly={!isEdit}
                            placeholder={t(
                              "text.register.accountNumberPlaceholder"
                            )}
                            name="accountNumber"
                            variant="standard"
                            setFieldValue={props.handleChange}
                          />
                        </div>
                        <div className="form-group mb-30">
                          <label className="form-label">
                            {t("text.register.routingNumber")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            readOnly={!isEdit}
                            placeholder={t(
                              "text.register.routingNumberPlaceholder"
                            )}
                            name="routingNumber"
                            variant="standard"
                            setFieldValue={props.handleChange}
                          />
                        </div>
                        {isEdit ? (
                          <div className="formAction text-end">
                            <CancelButton
                              className="btn btn-primary-outline flex-shrink-0 w190 cancelButton me-2"
                              onClick={() => cancelProfile()}
                              btnText={t("text.common.cancel")}
                            />
                            <CommonButton
                              extraClassName="btn btn-primary flex-shrink-0 w190 btn-gradiant saveButton"
                              htmlType="submit"
                              type="submit"
                              loading={loading}
                            >
                              {t("text.common.update")}
                            </CommonButton>
                          </div>
                        ) : (
                          <div className="formAction d-flex align-items-center justify-content-end">
                            <CommonButton
                              onClick={() => editProfile()}
                              extraClassName="btn btn-primary flex-shrink-0 w190 btn-gradiant editButton"
                              type="button"
                              loading={loading}
                              htmlType="submit"
                            >
                              {t("text.common.edit")}
                            </CommonButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </fieldset>
  );
}
export default BankDetailsForm;
