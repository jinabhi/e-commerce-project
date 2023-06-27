import React, { useEffect, useState } from "react";
import { AddEditChildCategoryForm } from "../../../../../components";
import { logger, modalNotification } from "../../../../../utils";
import {
  CategoryServices,
  ChildCategoryServices,
  SubCategoryServices,
} from "../../../../../services";
import { Media } from "../../../../../apiEndPoints/Admin";

function AddEditChildCategory({
  onHandleHide,
  row,
  getChildCategoryData,
  tableReset,
}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [formData, setFormData] = useState();
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDataCat, setLoadingDataCat] = useState(false);

  const getCategories = async () => {
    setLoadingDataCat(true);
    try {
      let queryParams = { scope: "activeCategory" };
      let res = await CategoryServices.getCategoryService({ queryParams });

      if (res.success) {
        setLoadingDataCat(false);
        setCategories([...res.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
  };

  async function fetchSubCategory(id) {
    setLoadingData(true);
    try {
      let queryParams = { categoryId: id };
      let res = await SubCategoryServices.getSubCategoryService({
        queryParams,
      });

      if (res.success) {
        setSubCategory([...res.data.rows]);
        setLoadingData(false);
      }
    } catch (error) {
      logger(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

  const getSingleChildCategory = async (id) => {
    // setLoadingData(true);
    try {
      let res = await ChildCategoryServices.getChildCategoryByIdService(id);
      let { success, data } = res;
      if (success) {
        setFormData(data);
        fetchSubCategory(data?.categoryId);
      }
    } catch (error) {
      logger(error);
    }
  };

  const onSelectCategory = async (setFieldValue, e) => {
    try {
      setFieldValue("subCategoryId", "");
      fetchSubCategory(e);
      setLoadingData(false);
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (row?.id > 0) {
      getSingleChildCategory(row?.id);
    }
  }, [row?.id]);

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = row?.id
        ? await ChildCategoryServices.updateChildCategoryService(
            values,
            row?.id
          )
        : await ChildCategoryServices.addNewChildCategoryService(values);
      const { message, success } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onHandleHide();
        tableReset();
        getChildCategoryData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  }

  return (
    <div>
      <AddEditChildCategoryForm
        onSubmit={onSubmit}
        loading={loading}
        apiEndPoints={Media.childCategoryImage}
        categories={categories}
        onSelectCategory={onSelectCategory}
        row={row}
        subCategory={subCategory}
        formData={formData}
        loadingData={loadingData}
        loadingDataCat={loadingDataCat}
      />
    </div>
  );
}

export default AddEditChildCategory;
