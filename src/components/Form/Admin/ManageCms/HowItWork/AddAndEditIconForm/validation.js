import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    title: yup
      .string()
      .required(i18next.t("validation.howItWorks.title"))
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.howItWorks.validTitle")
      ),
    description: yup
      .string()
      .required(i18next.t("validation.howItWorks.description")),
  });
}
