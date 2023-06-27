import * as yup from "yup";
import i18next from "i18next";

export default function validation() {
  return yup.object().shape({
    newPassword: yup
      .string()
      .required(i18next.t("validation.sellerResetPassword.password")),

    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("newPassword"), null],
        i18next.t("validation.sellerResetPassword.newPassword")
      ),
  });
}
