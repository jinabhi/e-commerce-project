import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import {
  CommonButton,
  Input as TextInput,
  UploadInput,
  Select,
  CancelButton,
  AntTooltip as Tooltip,
} from "../../../index";
import { validationStepTwo } from "./validation";

function StoreDetailsForm({
  onSubmit,
  brandLogo,
  licenseImage,
  countries,
  states,
  cities,
  isEdit,
  editProfile,
  cancelProfile,
  loading,
  accountData,
  formRef,
  onSelectCountry,
  cityLoader,
  stateLoader,
  onSelectState,
}) {
  const { t } = useTranslation();

  let initialValues = {
    name: accountData?.sellerBrandDetail?.name || "",
    brandImage: accountData?.sellerBrandDetail?.brandImage || "",
    storeName: accountData?.sellerBrandDetail?.storeName || "",
    storeContactNumberCountryCode: "+1",
    storeContactNumber:
      accountData?.sellerBrandDetail?.storeContactNumber || "",
    address: accountData?.sellerBrandDetail?.address || "",
    countryId:
      accountData?.userAddressDetails &&
      accountData?.userAddressDetails[0]?.countryId,
    stateId:
      accountData?.userAddressDetails &&
      accountData?.userAddressDetails[0]?.stateId,
    cityId:
      accountData?.userAddressDetails &&
      accountData?.userAddressDetails[0]?.cityId,
    storeLicenseDocumentImage:
      accountData?.sellerBrandDetail?.storeLicenseDocumentImage || "",
  };
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validationStepTwo()}
      onSubmit={onSubmit}
      innerRef={formRef}
      enableReinitialize
    >
      {(props) => {
        return (
          <>
            <Form>
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="row">
                    <div className="col-lg-12 col-xl-8 col-xxl-6">
                      <div className="formSection readOnly">
                        <div className="profile text-center">
                          <div className="profile_img">
                            <UploadInput
                              name="brandImage"
                              apiEndPoints={brandLogo}
                              type="file"
                              disabled={!isEdit}
                              defaultImageUrl={
                                accountData?.sellerBrandDetail?.brandImageUrl ||
                                ""
                              }
                              setFieldValue={props.handleChange}
                            >
                              {isEdit ? (
                                <Tooltip
                                  placement="top"
                                  promptText={t("text.common.imageTooltip")}
                                  overlayInnerStyle={{ width: "80%" }}
                                  color="#b9923b"
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

                        <div className="form-group">
                          <label className="form-label">
                            {t("text.register.brandName")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            placeholder={t(
                              "text.register.brandNamePlaceholder"
                            )}
                            name="name"
                            variant="standard"
                            setFieldValue={props.handleChange}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            {t("text.register.storeName")}
                          </label>
                          <TextInput
                            className="form-control"
                            type="text"
                            placeholder={t(
                              "text.register.storeNamePlaceholder"
                            )}
                            name="storeName"
                            variant="standard"
                            setFieldValue={props.handleChange}
                            readOnly={!isEdit}
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
                                    placeholder={t(
                                      "text.register.storeNumberPlaceholder"
                                    )}
                                    name="storeContactNumber"
                                    variant="standard"
                                    setFieldValue={props.handleChange}
                                    readOnly={!isEdit}
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
                            placeholder={t(
                              "text.register.storeAddressPlaceholder"
                            )}
                            name="address"
                            variant="standard"
                            setFieldValue={props.handleChange}
                            readOnly={!isEdit}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            {t("text.common.country")}
                          </label>
                          <Select
                            showSearch
                            id="select"
                            setFieldValue={props.handleChange}
                            suffixIcon={<span className="icon-down-arrow" />}
                            extraClassName="form-select form-select-sm customSelect"
                            name="countryId"
                            disabled={!isEdit}
                            variant="standard"
                            arrayOfData={countries}
                            placeholder={t("text.register.countryPlaceholder")}
                            onSelect={(e) =>
                              onSelectCountry(props.setFieldValue, e)
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            {t("text.common.state")}
                          </label>
                          <Select
                            showSearch
                            id="select"
                            setFieldValue={props.handleChange}
                            suffixIcon={<span className="icon-down-arrow" />}
                            extraClassName="form-select form-select-sm "
                            name="stateId"
                            disabled={!isEdit}
                            variant="standard"
                            arrayOfData={states}
                            placeholder={t("text.register.statePlaceholder")}
                            onSelect={(e) =>
                              onSelectState(props.setFieldValue, e)
                            }
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
                            setFieldValue={props.handleChange}
                            suffixIcon={<span className="icon-down-arrow" />}
                            extraClassName="form-select form-select-sm "
                            name="cityId"
                            disabled={!isEdit}
                            variant="standard"
                            arrayOfData={cities}
                            placeholder={t("text.register.cityPlaceholder")}
                            loading={cityLoader}
                          />
                        </div>
                        <div className="form-group uploadStuff">
                          <em className="d-block small my-2">
                            Upload either a JPEG, JPG or PNG file not exceeding
                            5MBs in size{" "}
                          </em>
                          <UploadInput
                            apiEndPoints={licenseImage}
                            className="uploadStuff_upload d-flex flex-column align-items-center justify-content-center mb-0 img-fluid"
                            name="storeLicenseDocumentImage"
                            type="file"
                            defaultImageUrl={
                              accountData?.sellerBrandDetail
                                ?.storeLicenseDocumentImageUrl || ""
                            }
                            disabled={!isEdit}
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
          </>
        );
      }}
    </Formik>
  );
}
export default StoreDetailsForm;
