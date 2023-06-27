import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    reason: yup
      .string()
      .required(i18next.t("validation.sellerManageCms.reason"))
      .min(3, i18next.t("validation.sellerManageCms.reasonMoreThenThree"))
      .max(25, i18next.t("validation.sellerManageCms.reasonLessThen25")),
    description: yup
      .string()
      .required(i18next.t("validation.sellerManageCms.description"))
      .min(3, i18next.t("validation.sellerManageCms.descriptionMoreThenThree"))
      .max(254, i18next.t("validation.sellerManageCms.descriptionLessThen254")),
  });
}
