import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    title: yup
      .string()
      .required(i18next.t("validation.banner.name"))
      // .matches(
      //   /^[a-z](.*[a-z])?$/gim,
      //   i18next.t("validation.banner.validTitle")
      // )
      .min(3, i18next.t("validation.banner.titleInput"))
      .max(24, i18next.t("validation.banner.titleInputValid")),
    description: yup
      .string()
      .required(i18next.t("validation.banner.description"))
      // .matches(
      //   /^[a-z](.*[a-z])?$/gim,
      //   i18next.t("validation.banner.validDescription")
      // )
      .min(3, i18next.t("validation.banner.descriptionInput"))
      .max(50, i18next.t("validation.banner.descriptionInputValid")),

    bannerImage: yup.string().required(i18next.t("validation.banner.image")),
  });
}
