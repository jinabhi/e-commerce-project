import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    question: yup.string().required(i18next.t("validation.faqs.question")),
    // .matches(
    //   /^[a-z](.*[a-z])?$/gim,
    //   i18next.t("validation.faqs.validQuestion")
    // ),
    typeOfFaqs: yup.string().required(i18next.t("validation.faqs.typeOfFaqs")),
    answer: yup.string().required(i18next.t("validation.faqs.answer")),
  });
}
