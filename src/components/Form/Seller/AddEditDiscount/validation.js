import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    discountPercent: yup
      .number()
      .min(
        1,
        i18next.t("validation.sellerDiscountOffer.discountOfferValidZero")
      )
      .max(100, i18next.t("validation.sellerDiscountOffer.discountOfferValid"))
      .required(i18next.t("validation.sellerDiscountOffer.discountValid"))
      .test("", i18next.t("validation.sellerProductDetails.decimal"), (value) =>
        `${value}`.match(/^[1-9]\d*$/)
      ),
    categoryId: yup
      .string()
      .required(i18next.t("validation.sellerDiscountOffer.categoryValid")),
    subCategoryId: yup
      .string()
      .required(i18next.t("validation.sellerDiscountOffer.subCategoryValid")),
    childCategoryId: yup
      .string()
      .required(i18next.t("validation.sellerDiscountOffer.childCategoryValid")),
    startDate: yup
      .date()
      .required(i18next.t("validation.sellerDiscountOffer.startDate")),
    endDate: yup
      .date()
      .when(
        "startDate",
        (startDate, Yup) =>
          startDate &&
          Yup.min(startDate, "End Date cannot be before Start Date")
      )
      .required(i18next.t("validation.sellerDiscountOffer.endDate")),
    productIds: yup
      .array()
      .min(1, i18next.t("validation.sellerDiscountOffer.productOfferValid")),
  });
}
