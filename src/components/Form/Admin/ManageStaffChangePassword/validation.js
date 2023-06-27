import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    password: yup
      .string()
      .required(i18next.t("validation.adminLogin.password"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/,
        i18next.t("validation.adminLogin.passwordField")
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password and Confirm Password must be the same"
      ),
  });
}
