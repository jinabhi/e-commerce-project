import React, { useEffect, useState } from "react";
import { AddEditSubCategoryForm } from "../../../../../components";
import { logger, modalNotification } from "../../../../../utils";
import { CategoryServices, SubCategoryServices } from "../../../../../services";
import { Media } from "../../../../../apiEndPoints/Admin";

function AddEditChildCategory({
  onHandleHide,
  row,
  getSubCategoryData,
  tableReset,
}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState();
  const [loadingDataCat, setLoadingDataCat] = useState(false);

  const getCategories = async () => {
    setLoadingDataCat(true);
    try {
      let queryParams = { scope: "activeCategory" };
      let res = await CategoryServices.getCategoryService({ queryParams });
      if (res.success) {
        setCategories([...res.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
    setLoadingDataCat(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getSingleSubCategory = async (id) => {
    try {
      let res = await SubCategoryServices.getChildCategoryByIdService(id);
      let { success, data } = res;
      if (success) {
        setFormData(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (row?.id > 0) {
      getSingleSubCategory(row?.id);
    }
  }, [row?.id]);

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = row?.id
        ? await SubCategoryServices.updateSubCategoryService(values, row?.id)
        : await SubCategoryServices.addNewSubCategoryService(values);
      const { message, success } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onHandleHide();
        tableReset();
        getSubCategoryData();
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
    setLoading(false);
  }

  return (
    <div>
      <AddEditSubCategoryForm
        onSubmit={onSubmit}
        loading={loading}
        apiEndPoints={Media.subCategoryImage}
        categories={categories}
        row={row}
        formData={formData}
        loadingDataCat={loadingDataCat}
      />
    </div>
  );
}

export default AddEditChildCategory;
