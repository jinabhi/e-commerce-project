import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import validation from "./validation";
import {
  Input as TextInput,
  CommonButton,
  UploadInput,
  AntTooltip as Tooltip,
} from "../../../index";
import Select from "../../../UiElement/Select";

function AddEditChildCategoryForm(mainProps) {
  const {
    onSubmit,
    apiEndPoints,
    row,
    loading,
    categories,
    subCategory,
    formData,
    onSelectCategory,
    loadingData,
    loadingDataCat,
  } = mainProps;

  const initialValues = {
    childCategoryImage: formData?.childCategoryImage || "",
    name: formData?.name || "",
    categoryId: loadingDataCat ? undefined : formData?.categoryId,
    subCategoryId: loadingData ? undefined : formData?.subCategoryId,
  };

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
            <div className="form-group">
              <label className="form-label">{t("text.child.image")}</label>
              <div className="form-group">
                <div className="upload_photo mb-2 mb-md-3 mx-auto text-center">
                  <div className="img-box">
                    <UploadInput
                      name="childCategoryImage"
                      apiEndPoints={apiEndPoints}
                      type="file"
                      defaultImageUrl={row?.childCategoryImageUrl}
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
            </div>
            <div className="form-group">
              <label className="form-label">{t("text.child.name")}</label>
              <div className="form-control-wrap">
                <TextInput
                  id="name"
                  className="form-control"
                  name="name"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t("text.child.namePlaceholder")}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                {t("text.child.categorySelect")}
              </label>
              <div className="form-control-wrap ">
                <Select
                  // suffixIcon={
                  //   <em className="icon text-white ni ni-chevron-down" />
                  // }
                  id="category"
                  name="categoryId"
                  disabled={false}
                  variant="standard"
                  arrayOfData={categories}
                  placeholder={t("text.child.categorySelected")}
                  setFieldValue={props.handleChange}
                  onSelect={(e) => onSelectCategory(props.setFieldValue, e)}
                  loading={loadingDataCat}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                {t("text.child.subCategorySelect")}
              </label>
              <div className="form-control-wrap ">
                <div className="form-control-wrap ">
                  <Select
                    // suffixIcon={
                    //   <em className="icon text-white ni ni-chevron-down" />
                    // }
                    id="subCategory"
                    name="subCategoryId"
                    variant="standard"
                    placeholder={t("text.child.subCategorySelected")}
                    arrayOfData={subCategory}
                    setFieldValue={props.handleChange}
                    loading={loadingData}
                    value={props.values.subCategoryId || undefined}
                  />
                </div>
              </div>
            </div>

            <div className="form-group text-center">
              <CommonButton
                htmlType="submit"
                type="submit"
                loading={loading}
                extraClassName="btn btn-primary ripple-effect"
              >
                {row?.id ? t("text.common.update") : t("text.common.add")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddEditChildCategoryForm;
