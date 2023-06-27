import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    from: yup
      .string()
      .required(i18next.t("validation.contact.email"))
      .email(i18next.t("validation.contact.validEmail")),
    subject: yup
      .string()
      .required(i18next.t("validation.contact.subject"))
      .max(100, i18next.t("validation.contact.subjectLength")),

    message: yup
      .string()
      .required(i18next.t("validation.contact.messageRequired"))
      .max(200, i18next.t("validation.contact.messageLength")),
  });
}
