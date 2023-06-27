import { Formik, Form } from "formik";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { dateFormateWithSlash } from "../../../../helpers";
import routesMap from "../../../../routeControl/sellerRoutes";
import { Input as TextInput } from "../../../Antd";
import { CommonButton, ReactDatepicker, Select } from "../../../UiElement";
import validation from "./validation";

export default function AddEditDiscount(mainProps) {
  const {
    initialValues,
    loading,
    categories,
    subCategories,
    childCategories,
    onSubmit,
    onCategorySelect,
    onSubCategorySelect,
    onChildCategorySelect,
    notDiscountedProducts,
    discountId,
    categoryLoader,
    subCategoryLoader,
    childCategoryLoader,
    productLoader,
  } = mainProps;
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validation()}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerDiscountOffer.discountPercent")}
                  </label>
                  <TextInput
                    className="form-control"
                    type="number"
                    name="discountPercent"
                    placeholder={t(
                      "text.sellerDiscountOffer.placeholder.enterDiscountPercent"
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
                    {t("text.sellerDiscountOffer.category")}
                  </label>
                  <Select
                    id="categoryId"
                    name="categoryId"
                    disabled={false}
                    variant="standard"
                    arrayOfData={categories}
                    placeholder={t(
                      "text.sellerDiscountOffer.placeholder.selectCategory"
                    )}
                    setFieldValue={props.handleChange}
                    onSelect={(e) => onCategorySelect(props.setFieldValue, e)}
                    loading={categoryLoader}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerDiscountOffer.subCategory")}
                  </label>
                  <Select
                    id="subCategoryId"
                    name="subCategoryId"
                    disabled={false}
                    variant="standard"
                    arrayOfData={subCategories}
                    placeholder={t(
                      "text.sellerDiscountOffer.placeholder.selectSubCategory"
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
                    {t("text.sellerDiscountOffer.childCategories")}
                  </label>
                  <Select
                    id="childCategoryId"
                    name="childCategoryId"
                    disabled={false}
                    variant="standard"
                    arrayOfData={childCategories}
                    placeholder={t(
                      "text.sellerDiscountOffer.placeholder.selectChildCategory"
                    )}
                    setFieldValue={props.handleChange}
                    onSelect={(e) =>
                      onChildCategorySelect(props.setFieldValue, e)
                    }
                    loading={childCategoryLoader}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerDiscountOffer.product")}
                  </label>
                  <Select
                    id="productIds"
                    name="productIds"
                    mode="multiple"
                    disabled={false}
                    variant="standard"
                    arrayOfData={notDiscountedProducts}
                    placeholder={t(
                      "text.sellerDiscountOffer.placeholder.selectProduct"
                    )}
                    setFieldValue={props.handleChange}
                    loading={productLoader}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerDiscountOffer.startDate")}
                  </label>
                  <div className="form-control-wrap">
                    <span className="form-icon form-icon-date form-icon-right">
                      <em className="icon-calendar" />
                    </span>
                    <ReactDatepicker
                      name="startDate"
                      onChange={() => {
                        props.setFieldValue("endDate", "");
                      }}
                      requiredDateFormat={dateFormateWithSlash}
                      className="form-control date-picker shadow-none"
                      placeholder={t("text.sellerDiscountOffer.enterStartDate")}
                      disabledDate={moment().toDate()}
                      values={
                        props.values?.startDate
                          ? new Date(props.values?.startDate)
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group datePick">
                  <label className="form-label">
                    {t("text.sellerDiscountOffer.endDate")}
                  </label>
                  <div className="form-control-wrap">
                    <span className="form-icon form-icon-date form-icon-right">
                      <em className="icon-calendar" />
                    </span>
                    <ReactDatepicker
                      name="endDate"
                      onChange={() => {}}
                      values={
                        props.values?.endDate
                          ? new Date(props.values?.endDate)
                          : ""
                      }
                      requiredDateFormat={dateFormateWithSlash}
                      className="form-control date-picker shadow-none"
                      placeholder={t("text.sellerDiscountOffer.enterEndDate")}
                      disabledDate={
                        props.values?.startDate
                          ? new Date(props.values.startDate)
                          : moment().toDate()
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="formAction d-flex align-items-center justify-content-end mt-3">
                <Link
                  href="<?php echo BASE_URL ?>/discounts-offers.php"
                  className="btn btn-primary-outline w190 me-3"
                  to={routesMap.DISCOUNTS_OFFERS.path}
                >
                  {t("text.common.cancel")}
                </Link>
                <CommonButton
                  type="submit"
                  className="btn btn-primary w190 btn-gradiant"
                  loading={loading}
                >
                  {discountId
                    ? t("text.sellerDiscountOffer.updateDiscount")
                    : t("text.sellerDiscountOffer.addDiscount")}
                </CommonButton>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
