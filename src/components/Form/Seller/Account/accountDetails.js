import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import {
  CommonButton,
  Input as TextInput,
  UploadInput,
  CancelButton,
  AntTooltip as Tooltip,
} from "../../../index";
import { validationStepOne } from "./validation";

function AccountDetailsForm({
  onSubmit,
  loading,
  isEdit,
  editProfile,
  cancelProfile,
  userData,
  formRef,
  apiEndPoints,
}) {
  let initialValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    phoneNumber: userData?.phoneNumber || "",
    phoneNumberCountryCode: userData?.phoneNumberCountryCode || "",
    email: userData?.email || "",
    profilePicture: userData?.profilePicture || "",
  };
  const { t } = useTranslation();

  function onKeyChange(e) {
    if (
      e.keyCode === 190 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 110 ||
      e.keyCode === 69
    ) {
      e.preventDefault();
    }
  }
  return (
    <fieldset className="h-100">
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validationStepOne()}
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
                        <div className="profile text-center">
                          <div className="profile_img">
                            <UploadInput
                              name="profilePicture"
                              apiEndPoints={apiEndPoints}
                              type="file"
                              disabled={!isEdit}
                              defaultImageUrl={
                                userData?.profilePictureUrl || ""
                              }
                              setFieldValue={props.handleChange}
                            >
                              {isEdit ? (
                                <Tooltip
                                  placement="top"
                                  promptText={t("text.common.imageTooltip")}
                                >
                                  <label
                                    className="filelabel"
                                    data-toggle="tooltip"
                                  >
                                    <em className="icon-edit" />
                                  </label>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                            </UploadInput>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                {t("text.register.firstName")}
                              </label>
                              <TextInput
                                className="form-control"
                                type="text"
                                placeholder={t(
                                  "text.register.firstNamePlaceholder"
                                )}
                                name="firstName"
                                variant="standard"
                                setFieldValue={props.handleChange}
                                readOnly={!isEdit}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                {t("text.register.lastName")}
                              </label>
                              <TextInput
                                className="form-control"
                                type="text"
                                placeholder={t(
                                  "text.register.lastNamePlaceholder"
                                )}
                                name="lastName"
                                variant="standard"
                                readOnly={!isEdit}
                                setFieldValue={props.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              {t("text.register.mobileNumber")}
                            </label>
                            <div className="row">
                              <div className="col-lg-2 col-md-3 col-4 pr-1">
                                <div className="form-control-wrap">
                                  <TextInput
                                    className="form-control"
                                    type="text"
                                    name="phoneNumberCountryCode"
                                    readOnly
                                    variant="standard"
                                    placeholder={t("text.register.countryCode")}
                                    setFieldValue={props.handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-10 col-md-9 col-8 pl-1">
                                <div className="form-control-wrap">
                                  <TextInput
                                    className="form-control"
                                    type="number"
                                    readOnly={!isEdit}
                                    placeholder={t(
                                      "text.register.mobileNumberPlaceholder"
                                    )}
                                    name="phoneNumber"
                                    variant="standard"
                                    onKeyDown={onKeyChange}
                                    setFieldValue={props.handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-30">
                          <label className="form-label">
                            {t("text.register.email")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="email"
                            readOnly={!isEdit}
                            placeholder={t("text.register.emailPlaceholder")}
                            name="email"
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
export default AccountDetailsForm;
