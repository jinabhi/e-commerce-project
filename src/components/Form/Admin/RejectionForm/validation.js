import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    rejectMessage: yup
      .string()
      .required(i18next.t("validation.manageSeller.text"))
      .min(3, i18next.t("validation.manageSeller.input"))
      .max(240, i18next.t("validation.manageSeller.input")),
  });
}
