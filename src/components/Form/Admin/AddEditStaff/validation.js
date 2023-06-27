import i18next from "i18next";
import * as yup from "yup";

export default function validation(staffId) {
  const phoneRegExp = /^[0-9]+$/;
  return yup.object().shape({
    // profilePicture: yup.string().required("Image is required"),
    email: yup
      .string()
      .required(i18next.t("validation.staff.email"))
      .email(i18next.t("validation.staff.validEmail")),
    firstName: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.staff.validfirstName")
      )
      .required(i18next.t("validation.staff.firstName"))
      .min(3, i18next.t("validation.staff.input")),
    lastName: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.staff.validlastName")
      )
      .required(i18next.t("validation.staff.lastName"))
      .min(3, i18next.t("validation.staff.input")),
    phoneNumber: yup
      .string()
      .required(i18next.t("validation.staff.number"))
      .matches(phoneRegExp, i18next.t("validation.staff.valid"))
      .min(6, i18next.t("validation.staff.short"))
      .max(12, i18next.t("validation.staff.long")),
    address: yup
      .string()
      .required(i18next.t("validation.staff.address"))
      .min(3, i18next.t("validation.staff.addressInput"))
      .max(54, i18next.t("validation.staff.addressInput")),
    password: yup.string().concat(
      !staffId
        ? yup
            .string()
            .required(i18next.t("validation.staff.password"))
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/,
              i18next.t("validation.adminLogin.passwordField")
            )
        : null
    ),
  });
}
