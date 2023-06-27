import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import validation from "./validation";
import {
  Input as TextInput,
  UploadInput,
  CommonButton,
  CancelButton,
  AntTooltip as Tooltip,
} from "../../../index";
import "./index.scss";

function ProfileForm({
  onSubmit,
  loading,
  apiEndPoints,
  userData,
  isEdit,
  editProfile,
  formRef,
  cancelProfile,
}) {
  const initialValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    phoneNumber: userData?.phoneNumber || "",
    profilePicture: userData?.profilePicture || "",
  };

  function onKeyChange(e) {
    if (
      e.keyCode === 190 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 110 ||
      e.keyCode === 69 ||
      e.keyCode === 187 ||
      e.keyCode === 189
    ) {
      e.preventDefault();
    }
  }

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation(isEdit)}
      onSubmit={onSubmit}
      innerRef={formRef}
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <div className="form-control-wrap language-flag">
                <div className="upload_photo mb-2 mb-md-3 mx-auto text-center">
                  <div className="img-box">
                    <UploadInput
                      name="profilePicture"
                      apiEndPoints={apiEndPoints}
                      type="file"
                      disabled={!isEdit}
                      defaultImageUrl={userData?.profilePictureUrl || ""}
                      setFieldValue={props.handleChange}
                    >
                      {isEdit ? (
                        <Tooltip
                          placement="right"
                          color="#c8a452"
                          promptText={t("text.common.imageTooltip")}
                        >
                          <label className="mb-0 ripple-effect filelabel">
                            <em className="icon ni ni-pen2" />
                          </label>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </UploadInput>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group mb-md-3 mb-2">
              <div className="row">
                <div className="col-6 pr-1">
                  <label className="form-label">
                    {isEdit ? (
                      t("text.profile.enterFirstName")
                    ) : (
                      <>
                        {isEdit
                          ? t("text.profile.enterFirstName")
                          : t("text.profile.firstName")}
                      </>
                    )}
                  </label>
                  <div className="form-control-wrap">
                    <TextInput
                      className="form-control shadow-none"
                      name="firstName"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.profile.enterFirstName")}
                      setFieldValue={props.handleChange}
                      readOnly={!isEdit}
                    />
                  </div>
                </div>
                <div className="col-6 pr-1">
                  <label className="form-label">
                    {isEdit ? (
                      t("text.profile.enterLastName")
                    ) : (
                      <>
                        {isEdit
                          ? t("text.profile.enterLastName")
                          : t("text.profile.lastName")}
                      </>
                    )}
                  </label>
                  <div className="form-control-wrap">
                    <TextInput
                      className="form-control shadow-none"
                      name="lastName"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.profile.enterLastName")}
                      setFieldValue={props.handleChange}
                      readOnly={!isEdit}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label">
                  {isEdit
                    ? t("text.profile.enterNumber")
                    : t("text.profile.mobileNumber")}
                </label>
              </div>
              <div className="row">
                <div className="countryCode col-4 col-sm-3 pr-1">
                  <div className="form-control-wrap">
                    <TextInput
                      type="text"
                      className="form-control"
                      placeholder={t("text.profile.countryCode")}
                      value="+1"
                      name="countryCode"
                      disabled={false}
                      variant="standard"
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-8 col-sm-9 pr-1">
                  <div className="form-control-wrap">
                    <TextInput
                      className="form-control"
                      name="phoneNumber"
                      disabled={false}
                      variant="standard"
                      type="number"
                      placeholder={t("text.profile.enterNumber")}
                      setFieldValue={props.handleChange}
                      onKeyDown={onKeyChange}
                      readOnly={!isEdit}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label">{t("text.profile.email")}</label>
              </div>
              <div className="form-control-wrap">
                <p>{userData?.email}</p>
              </div>
            </div>
            {isEdit ? (
              <div className="formAction text-end">
                <CancelButton
                  className="btn btn-outline-primary cancelButton mr-2"
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
                  extraClassName="btn btn-primary flex-shrink-0 w190 btn-gradiant saveButton"
                  type="button"
                  loading={loading}
                  htmlType="submit"
                >
                  {t("text.common.edit")}
                </CommonButton>
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProfileForm;
