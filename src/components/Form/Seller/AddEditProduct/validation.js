import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    productImage: yup
      .string()
      .required(i18next.t("validation.sellerProductDetails.image")),
    productName: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.sellerProductDetails.validProductName")
      )
      .required(i18next.t("validation.sellerProductDetails.productName"))
      .min(3, i18next.t("validation.sellerProductDetails.productNameLimit"))
      .max(100, i18next.t("validation.sellerProductDetails.productNameLimit")),
    categoryId: yup
      .string()
      .required(i18next.t("validation.sellerProductDetails.category")),
    subCategoryId: yup
      .string()
      .required(i18next.t("validation.sellerProductDetails.subCategory")),
    childCategoryId: yup
      .string()
      .required(i18next.t("validation.sellerProductDetails.childCategory")),
    price: yup
      .number()
      .required(i18next.t("validation.sellerProductDetails.price"))
      .test(
        "",
        i18next.t("validation.sellerProductDetails.priceGreater"),
        (value) => `${value}`.match(/^[1-9]\d*$/)
      )
      .typeError(i18next.t("validation.sellerProductDetails.validNumber")),
    weight: yup
      .number()
      .required(i18next.t("validation.sellerProductDetails.weight"))
      .typeError(i18next.t("validation.sellerProductDetails.validNumber"))
      .max(
        999999.99,
        i18next.t("validation.sellerProductDetails.weightDigitLimit")
      ),
    // .test(
    //   "",
    //   i18next.t("validation.sellerProductDetails.weightGreater"),
    //   // (value) => `${value}`.match(/^[1-9]\d*$/)/^[0-9]+(\.[0-9]*)?$/
    //   // (value) => `${value}`.match(/^[0-9]+(\.[0-9]*)?$/)
    //   (value) => `${value}`.match(/([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s)
    // )

    unit: yup
      .string()
      .required(i18next.t("validation.sellerProductDetails.unit")),
    // variantId: yup
    //   .string()
    //   .required(i18next.t("validation.sellerProductDetails.variant")),
    // attributeId: yup
    //   .string()
    //   .required(i18next.t("validation.sellerProductDetails.attribute")),
    overview: yup
      .string()
      .required(i18next.t("validation.sellerProductDetails.overview"))
      .min(3),
    specification: yup
      .string()
      .required(i18next.t("validation.sellerProductDetails.specifications"))
      .min(3),
  });
}
