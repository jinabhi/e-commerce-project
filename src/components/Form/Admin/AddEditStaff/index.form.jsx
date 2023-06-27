import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Input as TextInput,
  CommonButton,
  UploadInput,
  Password as TextPassword,
  AntTooltip as Tooltip,
} from "../../../index";
import validation from "./validation";

function AddEditStaffForm(mainProps) {
  const {
    onHandleCancel,
    onSubmit,
    formData,
    apiEndPoints,
    staffId,
    address,
    loading,
  } = mainProps;
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstName: formData?.firstName || "",
    lastName: formData?.lastName || "",
    email: formData?.email || "",
    phoneNumberCountryCode: "+1",
    phoneNumber: formData?.phoneNumber || "",
    address: address || "",
    profilePicture: formData?.profilePicture || "",
    password: "",
  };
  const { t } = useTranslation();

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

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation(staffId)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <div className="upload_photo mb-2 mb-md-3 mx-auto text-center">
                <div className="img-box">
                  <UploadInput
                    // className="center w-100px"
                    name="profilePicture"
                    type="file"
                    apiEndPoints={apiEndPoints}
                    defaultImageUrl={formData?.profilePictureUrl}
                    setFieldValue={props.handleChange}
                  >
                    <Tooltip
                      overlayInnerStyle={{ width: "80%" }}
                      placement="right"
                      color="#b9923b"
                      promptText={t("text.common.imageTooltip")}
                    >
                      <label className="mb-0 ripple-effect">
                        <em className="icon ni ni-pen2" />
                      </label>
                    </Tooltip>
                  </UploadInput>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.staff.firstName")}
                  </label>
                  <div className="form-control-wrap">
                    <TextInput
                      id="firstName"
                      className="form-control"
                      name="firstName"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.staff.firstName")}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.staff.lastName")}
                  </label>
                  <div className="form-control-wrap">
                    <TextInput
                      id="lastName"
                      className="form-control"
                      name="lastName"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.staff.lastName")}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">{t("text.staff.email")}</label>
                  <div className="form-control-wrap">
                    <TextInput
                      id="email"
                      className="form-control"
                      name="email"
                      disabled={staffId}
                      variant="standard"
                      type="email"
                      placeholder={t("text.staff.enterEmail")}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">{t("text.staff.phone")}</label>
                  <div className="row">
                    <div className="col-4 pr-1">
                      <div className="form-control-wrap ">
                        <TextInput
                          id="countryCode"
                          className="form-control"
                          name="phoneNumberCountryCode"
                          type="text"
                          disabled={false}
                          readOnly
                          variant="standard"
                          setFieldValue={props.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-8 pl-1">
                      <div className="form-control-wrap">
                        <TextInput
                          id="phone"
                          className="form-control"
                          name="phoneNumber"
                          disabled={false}
                          variant="standard"
                          onKeyDown={onKeyChange}
                          type="number"
                          placeholder={t("text.staff.phoneNumber")}
                          setFieldValue={props.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {!staffId && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.staff.password")}
                    </label>
                    <div className="form-control-wrap">
                      <TextPassword
                        id="password"
                        className="form-control "
                        name="password"
                        disabled={false}
                        variant="standard"
                        placeholder={t("text.staff.password")}
                        setFieldValue={props.handleChange}
                        type={showPassword ? "text" : "password"}
                        toggleIcon={
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowPassword(!showPassword);
                            }}
                            className="form-icon form-icon-right passcode-switch"
                            data-target="password"
                          >
                            <em
                              className={`passcode-icon icon-show icon ni ni-eye${
                                showPassword ? "" : "-off"
                              } `}
                            />
                          </Link>
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.staff.address")}
                  </label>
                  <div className="form-control-wrap">
                    <TextInput
                      id="address"
                      className="form-control "
                      name="address"
                      disabled={false}
                      variant="standard"
                      type="text"
                      placeholder={t("text.staff.enterAddress")}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group text-center mt-4">
              <CommonButton
                htmltype="button"
                extraClassName="btn btn-secondary ripple-effect mr-2 h-100"
                data-dismiss="modal"
                loading={loading}
                onClick={onHandleCancel}
              >
                {t("text.common.cancel")}
              </CommonButton>
              <CommonButton
                htmlType="submit"
                loading={loading}
                type="submit"
                extraClassName="btn btn-primary ripple-effect"
              >
                {staffId ? t("text.common.update") : t("text.common.add")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddEditStaffForm;
