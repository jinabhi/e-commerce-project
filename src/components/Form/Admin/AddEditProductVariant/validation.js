import i18next from "i18next";
import * as yup from "yup";

// Add custom validation for array later.

// yup.addMethod(yup.array, "unique", (message, path) => {
//   console.log("Inside Ypu add method", message, path);
//   return this.test("unique", (lists) => {
//     console.log(message, path);
//     console.log(lists);
//     const uniqArray = _.uniqBy(lists, path),
//       mapper = (x) => _.get(x, path),
//       set = [...new Set(lists.map(mapper))];
//     if (uniqArray.length !== lists.length) {
//       const idx = _.findIndex(lists, (list, i) => mapper(list) !== set[i]);
//       if (idx !== -1) {
//         return this.createError({ path: `invitees[${idx}].${path}`, message });
//       }
//     }
//     return true;
//   });
// });

export default function validation() {
  return yup.object().shape({
    variantName: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.productVariant.validVariantName")
      )
      .required(i18next.t("validation.productVariant.variantName"))
      .min(1, i18next.t("validation.productVariant.variantNameLength"))
      .max(24, i18next.t("validation.productVariant.variantNameLength")),
    attributeName: yup
      .array()
      .required(i18next.t("validation.productVariant.attributeName"))
      .max(100, i18next.t("validation.productVariant.maxAttributeRequired")),
    // .min(1, i18next.t("validation.productVariant.minAttributeRequired"))
    // .unique("attributeName", "attributeName"),
  });
}
