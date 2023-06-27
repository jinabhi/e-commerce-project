import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    commission: yup
      .number()
      .positive(i18next.t("validation.brands.commissionGreaterThenZero"))
      .integer(i18next.t("validation.brands.commissionInteger"))
      .min(1, i18next.t("validation.brands.validationMessageCommission1"))
      .max(100, i18next.t("validation.brands.validationMessageCommission100"))
      .required(i18next.t("validation.brands.commission")),
  });
}
