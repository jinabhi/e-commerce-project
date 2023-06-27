import * as yup from "yup";
import i18next from "i18next";

export default function validation(show) {
  return yup.object().shape({
    shippingQuantity: yup
      .number()
      .positive("Please enter the product quantity greater then 0")
      .integer()
      .min(1, i18next.t("validation.morInventory.validQuantityMin"))
      .max(10000, i18next.t("validation.morInventory.validQuantityMax"))
      .required(i18next.t("validation.morInventory.quantityRequired")),
    shippingCarrier: yup.string().concat(
      !show
        ? yup
            .string()
            .required(i18next.t("validation.morInventory.carrierRequired"))
            .matches(
              /^[a-z](.*[a-z])?$/gim,
              i18next.t("validation.morInventory.validCarrierName")
            )

            .min(3, i18next.t("validation.morInventory.minCarrier"))
            .max(24, i18next.t("validation.morInventory.validCarrier"))
        : null
    ),

    trackingId: yup
      .string()
      .concat(
        !show
          ? yup
              .string()
              .required(i18next.t("validation.morInventory.trackingIdRequired"))
              .min(3, i18next.t("validation.morInventory.minTrackingId"))
              .max(50, i18next.t("validation.morInventory.validTrackingId"))
          : null
      ),
  });
}
