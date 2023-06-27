import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    password: yup
      .string()
      .required(i18next.t("validation.sellerLogin.password")),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   i18next.t("validation.adminLogin.passwordField")
    // ),
    emailMobileNumber: yup
      .string()
      .required(i18next.t("validation.sellerLogin.email"))
      .matches(
        /^(?:\d{6,15}|[\w-\.]+@([\w-]+\.)+[\w-]{2,6})$/,
        i18next.t("validation.sellerLogin.validEmail")
      ),
    // .email(i18next.t("validation.adminLogin.validEmail")),
  });
}
