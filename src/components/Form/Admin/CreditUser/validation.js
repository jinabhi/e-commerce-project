import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    point: yup
      .number()
      .positive("Please enter the credit point greater then 0")
      .typeError(i18next.t("validation.generalSetting.numberValidation"))
      .integer()
      .min(1, i18next.t("validation.generalSetting.taxValidMessageCretePoint1"))
      .max(
        1000,
        i18next.t("validation.generalSetting.taxValidMessageCretePoint100")
      )
      .required(i18next.t("validation.productComplaints.creditPoints")),
  });
}
