import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    quantity: yup
      .number()
      .min(1, i18next.t("validation.shippingLog.validationAcceptedQuantity"))
      .required(i18next.t("validation.shippingLog.acceptedQuantity")),
  });
}
