import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    userType: yup
      .string()
      .required(i18next.t("validation.customNotification.userType")),

    title: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.customNotification.validTitle")
      )
      .required(i18next.t("validation.customNotification.title"))
      .min(2, i18next.t("validation.customNotification.titleInvalid"))
      .max(24, i18next.t("validation.customNotification.titleInvalid")),
    description: yup
      .string()
      .required(i18next.t("validation.customNotification.description"))
      .min(3, i18next.t("validation.customNotification.descriptionInvalid"))
      .max(254, i18next.t("validation.customNotification.descriptionInvalid")),
  });
}
