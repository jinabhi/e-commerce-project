import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape(
    {
      contactNumber: yup
        .string()
        .required(i18next.t("validation.landingPage.contactNumber"))
        .min(6, i18next.t("validation.landingPage.contactNumberLength"))
        .max(12, i18next.t("validation.landingPage.contactNumberLength")),
    },
    {
      contactNumberCountryCode: yup
        .number()
        .required(i18next.t("validation.landingPage.countryCode")),
    }
  );
}
