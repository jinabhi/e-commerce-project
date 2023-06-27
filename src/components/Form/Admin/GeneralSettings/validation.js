import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    tax: yup
      .number()
      .positive("Please enter the tax  greater then 0")
      .integer()
      .min(1, i18next.t("validation.generalSetting.taxValidMessageOne"))
      .max(100, i18next.t("validation.generalSetting.taxValidMessageHundred"))
      .required(i18next.t("validation.generalSetting.tax")),
    credit_point: yup
      .number()
      .positive("Please enter the credit point greater then 0")
      .typeError(i18next.t("validation.generalSetting.numberValidation"))
      .integer()
      .min(1, i18next.t("validation.generalSetting.taxValidMessageCretePoint1"))
      .max(
        1000,
        i18next.t("validation.generalSetting.taxValidMessageCretePoint100")
      )
      .required(i18next.t("validation.generalSetting.creditPoints")),
    minimum_quantity_product: yup
      .number()
      .positive("Please enter the minimum quantity product greater then 0")
      .typeError(i18next.t("validation.generalSetting.numberValidation"))
      .integer()
      .min(
        1,
        i18next.t("validation.generalSetting.taxValidMessageMinQuantity1")
      )
      .max(
        1000,
        i18next.t("validation.generalSetting.taxValidMessageMaxQuantity100")
      )
      .required(i18next.t("validation.generalSetting.minQuantity")),
    commission: yup
      .number()
      .positive("Please enter the commission greater then 0")
      .integer()
      .min(1, i18next.t("validation.generalSetting.taxValidMessageCommission1"))
      .max(
        100,
        i18next.t("validation.generalSetting.taxValidMessageCommission100")
      )
      .required(i18next.t("validation.generalSetting.commission")),
    promotion_video: yup.boolean(),
  });
}
