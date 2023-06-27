import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { t } from "i18next";
import moment from "moment";
import { logger } from "../../../../utils";
import { DatePicker } from "../../../Antd";
import { CommonButton, Select } from "../../../UiElement";
import {
  CategoryServices,
  ChildCategoryServices,
  SubCategoryServices,
} from "../../../../services";
import { classicDateFormat, dateFormateWithSlash } from "../../../../helpers";

export default function SellerDiscountOfferFilter({
  onSubmit,
  onReset,
  filterData,
}) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const onHandleReset = (resetForm) => {
    resetForm({});
    onReset();
  };

  const getCategories = async () => {
    try {
      let queryParams = {
        scope: "activeCategory",
      };
      const response = await CategoryServices.getCategoryService({
        queryParams,
      });
      if (response.success) {
        setCategories([...response.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
  };

  const fetchSubCategory = async (id) => {
    try {
      let queryParams = {
        categoryId: id,
        scope: "activeSubCategory",
      };
      const response = await SubCategoryServices.getSubCategoryService({
        queryParams,
      });
      if (response.success) {
        setSubCategories([...response.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
  };

  const onCategorySelect = async (setFieldValue, e) => {
    try {
      setFieldValue("subCategoryId", undefined);
      setFieldValue("childCategoryId", undefined);
      setChildCategories([]);
      fetchSubCategory(e);
    } catch (error) {
      logger(error);
    }
  };

  const fetchChildCategory = async (id) => {
    try {
      let queryParams = {
        subCategoryId: id,
        scope: "activeChildCategory",
      };
      const response = await ChildCategoryServices.getChildCategoryService({
        queryParams,
      });
      if (response.success) {
        setChildCategories([...response.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
  };

  const onSubCategorySelect = async (setFieldValue, e) => {
    try {
      setFieldValue("childCategoryId", undefined);
      fetchChildCategory(e);
    } catch (error) {
      logger(error);
    }
  };

  const initialValues = {
    categoryId: filterData?.categoryId || undefined,
    subCategoryId: filterData?.subCategoryId || undefined,
    childCategoryId: filterData?.childCategoryId || undefined,
    status: filterData?.status || undefined,
    fromDate: filterData?.fromDate || "",
    toDate: filterData?.toDate || "",
  };

  const status = [
    {
      id: "active",
      name: "Active",
    },
    {
      id: "inactive",
      name: "InActive",
    },
    {
      id: "scheduled",
      name: "Scheduled",
    },
    {
      id: "expired",
      name: "Expired",
    },
  ];

  useEffect(() => {
    getCategories();
    fetchChildCategory();
    fetchSubCategory();
  }, []);

  return (
    <Formik initialValues={{ ...initialValues }} onSubmit={onSubmit}>
      {(props) => {
        return (
          <Form>
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-4">{t("text.common.filter")}</h2>
              </div>
              <div className="col-md-6">
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
                    onSelect={(e) => onCategorySelect(props.setFieldValue, e)}
                  />
                </div>
              </div>
              <div className="col-md-6">
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
                  />
                </div>
              </div>
              <div className="col-md-6">
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
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerDiscountOffer.orderStatus")}
                  </label>
                  <Select
                    id="status"
                    name="status"
                    disabled={false}
                    variant="standard"
                    arrayOfData={status}
                    placeholder={t("text.sellerDiscountOffer.selectStatus")}
                    setFieldValue={props.handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerDiscountOffer.startDate")}
                  </label>
                  <div
                    id="datetimepicker7"
                    className="input-group align-items-center"
                    data-date-format="DD/MM/YYYY"
                    data-target-input="nearest"
                  >
                    <DatePicker
                      name="fromDate"
                      id="fromDate"
                      className="form-control date-picker shadow-none"
                      placeholder={classicDateFormat}
                      format={classicDateFormat}
                      requiredDateTimeFormat={dateFormateWithSlash}
                      onChange={(_, dateString) =>
                        props.setFieldValue("fromDate", dateString)
                      }
                      value={
                        props.values?.fromDate !== ""
                          ? moment(props.values?.fromDate)
                          : ""
                      }
                    />
                    {/* <span
                      className="input-group-addon position-absolute top-50 end-0 translate-middle"
                      data-toggle="datetimepicker"
                      data-target="#datetimepicker7"
                    >
                      <em className="icon-calendar" />
                    </span> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    {t("text.sellerDiscountOffer.endDate")}
                  </label>
                  <div
                    id="datetimepicker8"
                    className="input-group align-items-center"
                    data-date-format="DD/MM/YYYY"
                    data-target-input="nearest"
                  >
                    <DatePicker
                      name="toDate"
                      id="toDate"
                      className="form-control date-picker shadow-none"
                      placeholder={classicDateFormat}
                      format={classicDateFormat}
                      requiredDateTimeFormat={dateFormateWithSlash}
                      onChange={(_, dateString) =>
                        props.setFieldValue("toDate", dateString)
                      }
                      value={
                        props.values?.toDate !== ""
                          ? moment(props.values?.toDate)
                          : ""
                      }
                      disabledDate={(d) => {
                        return (
                          !d ||
                          d.isBefore(
                            moment(
                              initialValues?.fromDate || props.values.fromDate
                            )
                          )
                        );
                      }}
                    />
                    {/* <span
                      className="input-group-addon position-absolute top-50 end-0 translate-middle"
                      data-toggle="datetimepicker"
                      data-target="#datetimepicker8"
                    >
                      <em className="icon-calendar" />
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <CommonButton
                htmlType="submit"
                type="submit"
                className="btn btn-gradiant"
              >
                {t("text.common.applyFilter")}
              </CommonButton>
              <CommonButton
                onClick={(e) => {
                  e.preventDefault();
                  onHandleReset(props.resetForm);
                  fetchChildCategory();
                  fetchSubCategory();
                }}
                className="link"
              >
                {t("text.common.reset")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
