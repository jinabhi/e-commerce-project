import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    trackingId: yup
      .string()
      .max(20, i18next.t("validation.manageOrders.trackingIdMax"))
      .required(i18next.t("validation.manageOrders.trackingId")),
  });
}
