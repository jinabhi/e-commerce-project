import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    name: yup
      .string()
      .required(i18next.t("validation.child.name"))
      // Validation for input field if only text is required and number not
      .matches(/^[a-z](.*[a-z])?$/gim, i18next.t("validation.child.validName"))
      .min(3, i18next.t("validation.child.input"))
      .max(36, i18next.t("validation.child.inputValid")),
    categoryId: yup.string().required(i18next.t("validation.child.category")),
    subCategoryId: yup
      .string()
      .required(i18next.t("validation.child.subCategory")),
    childCategoryImage: yup
      .string()
      .required(i18next.t("validation.child.image")),
  });
}
