import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    currentPassword: yup
      .string()
      .required(i18next.t("validation.changePassword.currentPassword"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/,
        i18next.t("validation.changePassword.passwordField")
      ),
    newPassword: yup
      .string()
      .required(i18next.t("validation.changePassword.newPassword")),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/,
    //   i18next.t("validation.changePassword.passwordField")
    // ),
    confirmPassword: yup
      .string()
      .required(i18next.t("validation.changePassword.confirmPassword"))
      .oneOf(
        [yup.ref("newPassword"), null],
        "Password and Confirm Password must be the same"
      ),
  });
}
