import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import {
  CommonButton,
  Input as TextInput,
  UploadInput,
  AntTooltip as Tooltip,
  Select,
} from "../../../index";
import { validationStepTwo } from "./validation";

export function StoreDetails({
  onSubmit,
  apiEndPoints,
  countries = [],
  states = [],
  cities = [],
  loading,
  onSelectCountry,
  // countryLoader,
  cityLoader,
  stateLoader,
  onSelectState,
}) {
  const { t } = useTranslation();
  let initialValues = {
    name: "",
    brandImage: "",
    storeName: "",
    storeContactNumberCountryCode: "+1",
    storeContactNumber: "",
    address: "",
    storeLicenseDocumentImage: "",
    cityId: undefined,
    stateId: undefined,
    countryId: undefined,
  };
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
        validationSchema={validationStepTwo()}
        onSubmit={onSubmit}
      >
        {(props) => {
          return (
            <Form>
              <div className="d-flex h-100 flex-column justify-content-between">
                <div className="formBlk">
                  <div className="form-group">
                    <div className="profile text-center">
                      <div className="profile_img">
                        <UploadInput
                          apiEndPoints={apiEndPoints}
                          className="filelabel FileUpload1"
                          name="brandImage"
                          type="file"
                          defaultImageUrl="/assets/images/brand-img.jpg"
                        >
                          <Tooltip
                            placement="top"
                            promptText={t("text.common.imageTooltip")}
                          >
                            <label
                              className="filelabel mt-5"
                              data-toggle="tooltip"
                            >
                              <em className="icon-edit bg-black" />
                            </label>
                          </Tooltip>
                        </UploadInput>
                      </div>
                    </div>
                    <label className="form-label text-center d-block">
                      {t("text.register.brandLogo")}
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.register.brandName")}
                    </label>
                    <TextInput
                      className="form-control"
                      type="text"
                      placeholder={t("text.register.brandNamePlaceholder")}
                      name="name"
                      variant="standard"
                      setFieldValue={props.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.register.storeName")}
                    </label>
                    <TextInput
                      className="form-control"
                      type="text"
                      placeholder={t("text.register.storeNamePlaceholder")}
                      name="storeName"
                      variant="standard"
                      setFieldValue={props.handleChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.register.storeContactNumber")}
                      </label>
                      <div className="row">
                        <div className="col-lg-2 col-md-3 col-4 pr-1">
                          <div className="form-control-wrap">
                            <TextInput
                              className="form-control"
                              type="text"
                              name="storeContactNumberCountryCode"
                              readOnly
                              variant="standard"
                              placeholder="Country Code"
                              setFieldValue={props.handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-9 col-8 pl-1">
                          <div className="form-control-wrap">
                            <TextInput
                              className="form-control"
                              type="number"
                              placeholder={t(
                                "text.register.storeNumberPlaceholder"
                              )}
                              name="storeContactNumber"
                              variant="standard"
                              onKeyDown={onKeyChange}
                              setFieldValue={props.handleChange}
                              maxLength={10}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.register.storeAddress")}
                    </label>
                    <TextInput
                      className="form-control"
                      type="text"
                      placeholder={t("text.register.storeAddressPlaceholder")}
                      name="address"
                      variant="standard"
                      setFieldValue={props.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.common.country")}
                    </label>
                    <Select
                      showSearch
                      id="select"
                      suffixIcon={<span className="icon-down-arrow" />}
                      extraClassName="form-select form-select-sm customSelect"
                      name="countryId"
                      disabled={false}
                      variant="standard"
                      arrayOfData={countries}
                      placeholder={t("text.register.countryPlaceholder")}
                      setFieldValue={props.handleChange}
                      onSelect={(e) => onSelectCountry(props.setFieldValue, e)}
                      // loading={countryLoader}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.common.state")}
                    </label>
                    <Select
                      showSearch
                      id="select"
                      suffixIcon={<span className="icon-down-arrow" />}
                      extraClassName="form-select form-select-sm "
                      name="stateId"
                      disabled={false}
                      variant="standard"
                      arrayOfData={states}
                      placeholder={t("text.register.statePlaceholder")}
                      setFieldValue={props.handleChange}
                      onSelect={(e) => onSelectState(props.setFieldValue, e)}
                      loading={stateLoader}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t("text.common.city")}
                    </label>
                    <Select
                      showSearch
                      id="select"
                      suffixIcon={<span className="icon-down-arrow" />}
                      extraClassName="form-select form-select-sm "
                      name="cityId"
                      disabled={false}
                      variant="standard"
                      arrayOfData={cities}
                      placeholder={t("text.register.cityPlaceholder")}
                      loading={cityLoader}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                  <div className="form-group uploadStuff">
                    <label className="form-label">
                      Store&apos;s License Document
                    </label>
                    <em className="d-block small mb-2 text-secondary">
                      Upload either a JPEG, JPG or PNG file not exceeding 5MBs
                      in size{" "}
                    </em>
                    <UploadInput
                      apiEndPoints={apiEndPoints}
                      className="uploadStuff_upload d-flex flex-column align-items-center justify-content-center mb-0"
                      name="storeLicenseDocumentImage"
                      type="file"
                      defaultImageUrl=""
                    />
                  </div>
                </div>
                <div className="formAction d-flex align-items-center justify-content-end">
                  <CommonButton
                    extraClassName="btn btn-primary flex-shrink-0 w190 btn-gradiant"
                    htmlType="submit"
                    type="submit"
                    loading={loading}
                  >
                    {t("text.register.continue")}
                  </CommonButton>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </fieldset>
  );
}
