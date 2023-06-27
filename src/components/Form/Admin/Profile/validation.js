import i18next from "i18next";
import * as yup from "yup";

export default function validation(isEdit) {
  const phoneRegExp = /^[0-9]+$/;
  return yup.object().shape({
    firstName: isEdit
      ? yup
          .string()
          .matches(
            /^[a-z](.*[a-z])?$/gim,
            i18next.t("validation.profile.validFirstName")
          )
          .min(3, i18next.t("validation.profile.firstNameMin"))
          .max(24, i18next.t("validation.profile.firstNameMax"))
          .required(i18next.t("validation.profile.firstName"))
      : null,
    lastName: isEdit
      ? yup
          .string()
          .matches(
            /^[a-z](.*[a-z])?$/gim,
            i18next.t("validation.profile.validLastName")
          )
          .min(3, i18next.t("validation.profile.lastNameMin"))
          .max(24, i18next.t("validation.profile.lastNameMax"))
          .required(i18next.t("validation.profile.lastName"))
      : null,
    phoneNumber: isEdit
      ? yup
          .string()
          .required(i18next.t("validation.profile.phoneNumber"))
          .matches(phoneRegExp, i18next.t("validation.profile.valid"))
          .min(6, i18next.t("validation.profile.short"))
          .max(12, i18next.t("validation.profile.long"))
      : null,
    profilePicture: yup.string(),
  });
}
