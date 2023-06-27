import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import validation from "./validation";
import {
  Input as TextInput,
  GradientButton,
  MultiUpload,
  VideoUploader,
  AntTooltip as Tooltip,
} from "../../../index";
import Select from "../../../UiElement/Select";
import routesMap from "../../../../routeControl/sellerRoutes";
import { TextEditor } from "../../../UiElement";

function AddEditProduct(mainProps) {
  const { t } = useTranslation();
  const [weightValue, setWeightValue] = useState(undefined);
  const {
    loading = false,
    categories = [],
    subCategories = [],
    childCategories = [],
    variants = [],
    attribute = [],
    onSelectVariant,
    onSubmit,
    onCategorySelect,
    onSubCategorySelect,
    apiEndPoints,
    videoApiEndPoint,
    mediaUrl,
    imageArray = [],
    removeProductImage,
    sellerBrand,
    productId,
    variantArray,
    addNewVariant,
    removeVariant,
    fetchAttributesOfVariants,
    initialValues,
    productVideo,
    setProductVideo,
    categoryLoader,
    subCategoryLoader,
    childCategoryLoader,
    variantLoader,
    attributeLoader,
  } = mainProps;

  const units = [
    { id: "lb", name: "lb" },
    { id: "ounces", name: "ounces" },
    { id: "gm", name: "grams" },
  ];

  function handleDecimalsOnValue(value) {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
  }

  function checkWeightValue(e) {
    let test = handleDecimalsOnValue(e.target.value);
    setWeightValue(test);
  }

  function handleKey(e) {
    let ASCIICode = e.which ? e.which : e.keyCode;
    let keyCode = e.charCode;
    if (ASCIICode === 46 && e.target.value.indexOf(".") !== -1) {
      e.preventDefault();
    }
    if (
      (ASCIICode > 31 && ASCIICode > 57) ||
      keyCode === 43 ||
      keyCode === 42 ||
      keyCode === 45 ||
      keyCode === 47 ||
      keyCode === 33 ||
      keyCode === 35 ||
      keyCode === 36 ||
      keyCode === 37 ||
      keyCode === 38 ||
      keyCode === 44 ||
      keyCode === 40 ||
      keyCode === 41 ||
      keyCode === 39 ||
      keyCode === 34 ||
      keyCode === 32
    ) {
      e.preventDefault();
    }
  }

  function handleKeyPrice(e) {
    let ASCIICode = e.which ? e.which : e.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
      e.preventDefault();
    }
  }

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => (
        <Form className="d-flex h-100 flex-column justify-content-between">
          <div className="addProduct_inner bg-850 p-30 radius-20">
            <h5 className="subHeading mb-20 text-white">
              {t("text.sellerProductDetails.addImagesAndVideos")}
            </h5>
            <div className="row">
              <div className="col-md-12 col-xxl-8">
                <div className="addProduct_upload d-flex flex-wrap mb-1">
                  <div
                    className="form-group uploadStuff"
                    data-toggle="tooltip"
                    data-placement="right"
                    title=""
                    data-bs-original-title="Upload either a JPEG, JPG or PNG file not exceeding 5MBs in size"
                  >
                    <div
                      htmlFor="uploadId"
                      className={`uploadStuff_upload custom-upload uploadStuff_upload-sm d-flex flex-column align-items-center justify-content-center mb-0  ${
                        imageArray.length >= 5 ? "d-none" : ""
                      }`}
                    >
                      <Tooltip
                        placement="top"
                        promptText={t("text.common.imageTooltip")}
                      >
                        <MultiUpload
                          name="productImage"
                          apiEndPoints={apiEndPoints}
                          type="file"
                          id="uploadId"
                          setFieldValue={props.handleChange}
                          mediaUrl={mediaUrl}
                          uploadButtonHtml={
                            <div className="my-auto text-center">
                              <span className="icon-camera" />
                            </div>
                          }
                        />
                      </Tooltip>
                    </div>
                  </div>
                  {imageArray.map((item, index) => {
                    if (item.fileType === "image") {
                      return (
                        <div
                          key={item.id}
                          className="addProduct_trash sqr_img position-relative"
                        >
                          <img src={item.baseUrl} alt="Product" />
                          <Link
                            to="#"
                            onClick={() =>
                              removeProductImage(props.setFieldValue, index)
                            }
                            className="imgtrash"
                          >
                            <em className="icon-trash" />
                          </Link>
                        </div>
                      );
                    }
                    <div
                      key={item.id}
                      className="addProduct_trash sqr_img position-relative"
                    >
                      <img src={item.baseUrl} alt="Product" />
                      <Link
                        to="#"
                        onClick={() =>
                          removeProductImage(props.setFieldValue, index)
                        }
                        className="imgtrash"
                      >
                        <em className="icon-trash" />
                      </Link>
                    </div>;
                  })}
                  <div
                    className="form-group uploadStuff"
                    data-toggle="tooltip"
                    data-placement="right"
                    title=""
                    data-bs-original-title="Upload MP4 video not exceeding 5 MBs in size"
                  >
                    <div
                      htmlFor="videoId"
                      className={`uploadStuff_upload custom-upload uploadStuff_upload-sm d-flex flex-column align-items-center justify-content-center mb-0 ${
                        productVideo?.baseUrl ? "d-none" : ""
                      }`}
                    >
                      <Tooltip
                        placement="top"
                        promptText={t("text.common.videoTooltip")}
                      >
                        <VideoUploader
                          name="productVideo"
                          apiEndPoints={videoApiEndPoint}
                          type="file"
                          id="videoId"
                          setProductVideo={setProductVideo}
                          setFieldValue={props.handleChange}
                          uploadButtonHtml={
                            <div className="my-auto text-center">
                              <span className="icon-video-camera" />
                            </div>
                          }
                        />
                      </Tooltip>
                    </div>
                    <div
                      className={`addProduct_trash position-relative ${
                        productVideo?.baseUrl ? "" : "d-none"
                      }`}
                    >
                      {productVideo?.baseUrl ? (
                        <video height="125" controls>
                          <source
                            src={productVideo?.baseUrl}
                            type="video/mp4"
                          />
                          <track
                            kind="captions"
                            srcLang="en"
                            label="english_captions"
                          />
                        </video>
                      ) : (
                        <></>
                      )}
                      <Link
                        to="#"
                        onClick={() => {
                          setProductVideo(null);
                          props.setFieldValue("productVideo", "");
                        }}
                        className="imgtrash"
                      >
                        <em className="icon-trash" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.sellerProductDetails.productName")}
                      </label>
                      <TextInput
                        className="form-control"
                        name="productName"
                        type="text"
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.enterProductName"
                        )}
                        spellCheck="false"
                        data-ms-editor="true"
                        setFieldValue={props.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.sellerProductDetails.category")}
                      </label>
                      <Select
                        id="category"
                        name="categoryId"
                        disabled={false}
                        variant="standard"
                        arrayOfData={categories}
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.selectCategory"
                        )}
                        setFieldValue={props.handleChange}
                        onSelect={(e) =>
                          onCategorySelect(props.setFieldValue, e)
                        }
                        loading={categoryLoader}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.sellerProductDetails.brand")}
                      </label>
                      <TextInput
                        className="form-control"
                        type="text"
                        placeholder={t("text.sellerProductDetails.brand")}
                        name="brandId"
                        value={sellerBrand?.brandName || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.sellerProductDetails.subCategory")}
                      </label>
                      <Select
                        id="subCategory"
                        name="subCategoryId"
                        disabled={false}
                        variant="standard"
                        arrayOfData={subCategories}
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.selectSubCategory"
                        )}
                        setFieldValue={props.handleChange}
                        onSelect={(e) =>
                          onSubCategorySelect(props.setFieldValue, e)
                        }
                        loading={subCategoryLoader}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.sellerProductDetails.childCategory")}
                      </label>
                      <Select
                        id="childCategory"
                        name="childCategoryId"
                        disabled={false}
                        variant="standard"
                        arrayOfData={childCategories}
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.selectChildCategory"
                        )}
                        setFieldValue={props.handleChange}
                        loading={childCategoryLoader}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.sellerProductDetails.price")}
                      </label>
                      <TextInput
                        className="form-control"
                        type="text"
                        name="price"
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.enterPrice"
                        )}
                        spellCheck="false"
                        data-ms-editor="true"
                        setFieldValue={props.handleChange}
                        // onKeyPress={(e) => handleKey(e)}

                        onKeyPress={(e) => handleKeyPrice(e)}
                        min="0"
                        maxlength="8"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.sellerProductDetails.weight")}
                      </label>
                      <TextInput
                        className="form-control"
                        type="text"
                        name="weight"
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.enterWeight"
                        )}
                        spellCheck="false"
                        data-ms-editor="true"
                        setFieldValue={props.handleChange}
                        onKeyPress={(e) => handleKey(e)}
                        min="0"
                        inputmode="numeric"
                        // pattern="[0-9]*"
                        onChange={(e) => {
                          props.handleChange(e);
                          checkWeightValue(e);
                        }}
                        value={weightValue || props.values.weight}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.sellerProductDetails.unit")}
                      </label>
                      <Select
                        id="unit"
                        name="unit"
                        disabled={false}
                        variant="standard"
                        arrayOfData={units}
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.selectUnit"
                        )}
                        setFieldValue={props.handleChange}
                      />
                    </div>
                  </div>
                  <h5 className="subHeading mb-20 text-white">
                    {t("text.productVariant.variants")}
                  </h5>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.productVariant.variantName")}
                      </label>
                      <Select
                        id="variant"
                        name="variantId"
                        disabled={false}
                        variant="standard"
                        arrayOfData={variants}
                        onSelect={(e) =>
                          onSelectVariant(props.setFieldValue, e)
                        }
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.selectVariant"
                        )}
                        setFieldValue={props.handleChange}
                        loading={variantLoader}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">
                        {t("text.productVariant.attribute")}
                      </label>
                      <Select
                        id="attribute"
                        name="attributeId"
                        disabled={false}
                        variant="standard"
                        arrayOfData={attribute}
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.selectAttribute"
                        )}
                        setFieldValue={props.handleChange}
                        loading={attributeLoader}
                      />
                    </div>
                  </div>
                  <Link
                    to=""
                    onClick={addNewVariant}
                    className="text-white w-100 text-end text-decoration-underline "
                  >
                    {t("text.sellerProductDetails.addMore")}
                  </Link>
                  <div id="showItem">
                    {variantArray.length > 0 &&
                      variantArray.map((item, index) => {
                        if (item) {
                          return (
                            <div className="row" key={index}>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {t("text.productVariant.variantName")}
                                  </label>
                                  <Select
                                    id="variant"
                                    name={item.extraVariantIdFieldName}
                                    disabled={false}
                                    variant="standard"
                                    arrayOfData={
                                      item[item.extraVariantIdFieldName]
                                    }
                                    onSelect={(e) => {
                                      fetchAttributesOfVariants(
                                        e,
                                        item.extraAttributeIdFieldName,
                                        props.setFieldValue,
                                        index
                                      );
                                    }}
                                    placeholder={t(
                                      "text.sellerProductDetails.placeHolders.selectVariant"
                                    )}
                                    setFieldValue={props.handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {t("text.productVariant.attribute")}
                                  </label>
                                  <Select
                                    id="attribute"
                                    name={item.extraAttributeIdFieldName}
                                    disabled={false}
                                    variant="standard"
                                    arrayOfData={
                                      item[item.extraAttributeIdFieldName]
                                    }
                                    placeholder={t(
                                      "text.sellerProductDetails.placeHolders.selectAttribute"
                                    )}
                                  />
                                </div>
                              </div>
                              <Link
                                to="#"
                                onClick={() => removeVariant(index)}
                                className="text-white w-100 text-end text-decoration-underline "
                              >
                                {t("text.common.remove")}
                              </Link>
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="addProduct_inner bg-850 p-30 radius-20">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="row">
                  <h5 className="subHeading mb-20 text-white">
                    {t("text.sellerProductDetails.productContent")}
                  </h5>
                  <div className="col-sm-6">
                    <div className="form-group bg-850">
                      <label className="form-label" htmlFor="overview">
                        {t("text.sellerProductDetails.productOverview")}
                      </label>
                      <TextEditor
                        name="overview"
                        id="overview"
                        setFieldValue={props.handleChange}
                        placeholder={t(
                          "text.sellerProductDetails.placeHolders.writeHere"
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group bg-850">
                      <label className="form-label" htmlFor="Specifications">
                        {t("text.sellerProductDetails.productSpecification")}
                      </label>
                      <div className="nk-block">
                        <TextEditor
                          id="specifications"
                          name="specification"
                          setFieldValue={props.handleChange}
                          placeholder={t(
                            "text.sellerProductDetails.placeHolders.writeHere"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="formAction d-flex align-items-center justify-content-end">
                    <Link
                      to={routesMap.PRODUCTS.path}
                      className="btn btn-primary-outline flex-shrink-0 w190 me-2"
                    >
                      {t("text.common.cancel")}
                    </Link>
                    <GradientButton
                      extraClassName="flex-shrink-0 w190"
                      loading={loading}
                      // htmlType="submit"
                      type="submit"
                    >
                      {productId
                        ? t("text.sellerProductDetails.updateProduct")
                        : t("text.sellerProductDetails.addProduct")}
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddEditProduct;
