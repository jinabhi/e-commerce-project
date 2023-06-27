import { Formik, Form } from "formik";
import moment from "moment";
import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DatePicker, CommonButton, Select } from "../../..";

function DiscountOfferFilter(mainProps) {
  const { t } = useTranslation();
  const [disableReset, setDisableReset] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [value, setValue] = useState(true);

  const {
    onSelectCategory,
    onSelectSubCategory,
    onSubmit,
    loading,
    categories,
    subCategory,
    childCategory,
    sellerName,
    onReset,
    filterData,
    getCategories,
    getSubCategory,
    getChildCategory,
    categoryLoading,
    subCategoryLoading,
    childCategoryLoading,
  } = mainProps;

  const initialValues = {
    categoryId: filterData?.categoryId || undefined,
    subCategoryId: filterData?.subCategoryId || undefined,
    childCategoryId: filterData?.childCategoryId || undefined,
    sellerId: filterData?.sellerId || undefined,
    fromDate: filterData?.fromDate || "",
    toDate: filterData?.toDate || "",
  };

  const onHandleReset = (resetForm) => {
    resetForm({});
    getCategories();
    getSubCategory();
    getChildCategory();
    setDisableReset(true);
    if (
      filterData.categoryId ||
      filterData.subCategoryId ||
      filterData.childCategoryId ||
      filterData.sellerId ||
      filterData.fromDate ||
      filterData.toDate
    ) {
      onReset();
    }
  };

  useEffect(() => {
    if (!filterData?.toDate) {
      setValue(true);
    }
  }, [filterData?.toDate]);

  return (
    <Formik
      initialValues={{ ...initialValues }}
      enableReinitialize
      validate={(e) => {
        if (
          e.categoryId ||
          e.subCategoryId ||
          e.childCategoryId ||
          e.sellerId ||
          e.fromDate ||
          e.toDate
        ) {
          setDisableReset(false);
          setDisableSubmit(true);
        } else {
          setDisableReset(true);
          setDisableSubmit(false);
        }
      }}
      onSubmit={disableSubmit && onSubmit}
    >
      {(props) => {
        const { values } = props;
        return (
          <Form>
            <div className="dropdown-body dropdown-body-rg">
              <div className="row g-3">
                <div className="col-6">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.discountOffers.category")}
                    </label>
                    <Select
                      id="categoryid"
                      extraClassName="form-control form-control-sm form-select"
                      name="categoryId"
                      disabled={false}
                      variant="standard"
                      loading={categoryLoading}
                      placeholder={t("text.discountOffers.category")}
                      onSelect={(e) => onSelectCategory(props.setFieldValue, e)}
                      arrayOfData={categories}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.discountOffers.SubCategoryName")}
                    </label>
                    <Select
                      id="subCategoryId"
                      extraClassName="form-control form-control-sm form-select"
                      name="subCategoryId"
                      disabled={false}
                      variant="standard"
                      loading={subCategoryLoading}
                      placeholder={t("text.discountOffers.SubCategoryName")}
                      onSelect={(e) =>
                        onSelectSubCategory(props.setFieldValue, e)
                      }
                      arrayOfData={subCategory}
                      data-placeholder="Select Sub Category"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.discountOffers.childCategory")}
                    </label>
                    <Select
                      id="childCategoryId"
                      extraClassName="form-control form-control-sm form-select"
                      name="childCategoryId"
                      disabled={false}
                      loading={childCategoryLoading}
                      variant="standard"
                      placeholder={t("text.discountOffers.childCategory")}
                      setFieldValue={props.handleChange}
                      arrayOfData={childCategory}
                      data-placeholder="Select Child Category"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group ">
                    <label className="overline-title overline-title-alt">
                      {t("text.discountOffers.seller")}
                    </label>
                    <Select
                      id="sellerId"
                      extraClassName="form-control form-control-sm form-select"
                      name="sellerId"
                      disabled={false}
                      variant="standard"
                      placeholder={t("text.discountOffers.seller")}
                      setFieldValue={props.handleChange}
                      arrayOfData={sellerName}
                      data-placeholder="Select Seller"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="overline-title overline-title-alt">
                      {t("text.discountOffers.startEnd")}
                    </label>
                    <div className="dateRange d-flex flex-column flex-sm-row">
                      <div className="form-control-wrap">
                        {/* <label
                          htmlFor="fromDate"
                          className="form-icon form-icon-right"
                          style={{ zIndex: 1 }}
                        >
                          <em className="icon ni ni-calendar" />
                        </label> */}
                        <DatePicker
                          name="fromDate"
                          id="fromDate"
                          className="form-control date-picker shadow-none"
                          placeholder={t("text.discountOffers.startDate")}
                          format="YYYY-MM-DD"
                          onChange={(_, dateString) =>
                            props.setFieldValue("fromDate", dateString)
                          }
                          value={
                            values?.fromDate !== ""
                              ? moment(values?.fromDate)
                              : ""
                          }
                          onOpenChange={values?.fromDate && setValue(false)}
                        />
                      </div>
                      <div className="dateBetween align-self-center mx-0 mx-sm-1 my-sm-0 my-1">
                        {t("text.common.to")}
                      </div>
                      <div className="form-control-wrap">
                        {/* <label
                          htmlFor="toDate"
                          className="form-icon form-icon-right"
                          style={{ zIndex: 1 }}
                        >
                          <em className="icon ni ni-calendar" />
                        </label> */}
                        <DatePicker
                          name="toDate"
                          id="toDate"
                          className="form-control date-picker shadow-none"
                          placeholder={t("text.discountOffers.endDate")}
                          format="YYYY-MM-DD"
                          onChange={(_, dateString) =>
                            props.setFieldValue("toDate", dateString)
                          }
                          value={
                            values?.toDate !== "" ? moment(values?.toDate) : ""
                          }
                          disabledDate={(d) => {
                            return (
                              !d ||
                              d.isBefore(
                                moment(
                                  initialValues?.fromDate ||
                                    props.values.fromDate
                                )
                              )
                            );
                          }}
                          disabled={value}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown-foot between mt-1">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (!disableReset) {
                    onHandleReset(props.resetForm);
                  }
                }}
                type="button"
                className="clickable"
              >
                {t("text.common.resetFilter")}
              </Link>

              <CommonButton
                extraClassName="btn btn-sm btn-primary"
                htmlType="submit"
                loading={loading}
                type="submit"
              >
                {t("text.common.filter")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default DiscountOfferFilter;
