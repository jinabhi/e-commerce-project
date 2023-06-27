import * as yup from "yup";
import i18next from "i18next";

export default function validation() {
  return yup.object().shape({
    newPassword: yup
      .string()
      .required(i18next.t("validation.adminResetPassword.newPassword"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/,
        i18next.t("validation.adminResetPassword.passwordField")
      ),
    confirmPassword: yup
      .string()
      .required(i18next.t("validation.adminResetPassword.confirmPassword"))
      .oneOf(
        [yup.ref("newPassword"), null],
        i18next.t("validation.adminResetPassword.confirmPasswordField")
      ),
  });
}
