import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    subCategoryImage: yup
      .string()
      .required(i18next.t("validation.subCategories.image")),
    name: yup
      .string()
      .required(i18next.t("validation.subCategories.name"))
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.subCategories.validName")
      )
      .min(3, i18next.t("validation.subCategories.input"))
      .max(36, i18next.t("validation.subCategories.inputValid")),
    categoryId: yup
      .string()
      .required(i18next.t("validation.subCategories.category")),
  });
}
