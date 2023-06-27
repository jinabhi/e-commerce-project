import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Input as TextInput,
  CommonButton,
  MultipleInput,
  AntTooltip,
} from "../../../index";
import validation from "./validation";

function ProductVariantsForm({
  rowData,
  onSubmit,
  loading,
  err,
  setData,
  data,
}) {
  const { t } = useTranslation();
  const initialValues = {
    variantName: rowData?.name || "",
    attributeName:
      rowData?.productVariantAttributeDetail?.map((i) => i.attributeNames) ||
      undefined,
  };

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
              <label className="form-label" htmlFor="category-name">
                {t("text.productVariant.variantName")}
              </label>
              <div className="form-control-wrap">
                <TextInput
                  className="form-control"
                  name="variantName"
                  disabled={rowData?.name && true}
                  variant="standard"
                  type="text"
                  placeholder={t("text.productVariant.variantNamePlaceholder")}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="category-name">
                {t("text.productVariant.attributeName")}
              </label>
              <AntTooltip
                placement="right"
                promptText={t("text.productVariant.attributeInfo")}
              >
                <em className="ml-1 icon ni ni-info" />
              </AntTooltip>
              <div className="form-control-wrap">
                <MultipleInput
                  name="attributeName"
                  defaultValue={initialValues?.attributeName}
                  type="text"
                  disabled={false}
                  variant="standard"
                  placeholder={t("text.productVariant.attributePlaceholder")}
                  setFieldValue={props.handleChange}
                  totalProduct={rowData?.totalProduct}
                  setData={setData}
                  data={data}
                />
                {err && (
                  <span style={{ color: "red" }}>
                    {t("validation.productVariant.attributeNameLength")}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group text-center">
              <CommonButton
                type="submit"
                htmlType="submit"
                className="btn btn-primary ripple-effect"
                loading={loading}
              >
                {rowData.id
                  ? t("text.common.update")
                  : t("text.productVariant.submit")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProductVariantsForm;
