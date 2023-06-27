import i18next from "i18next";
import * as yup from "yup";

let urlPattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

// let phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

// let workEmailPattern =
//   /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!Gmail.com)(?!Yahoo.com)(?!Hotmail.com)(?!GMAIL.COM)(?!YAHOO.COM)(?!HOTMAIL.COM)([\w-]+\.)+[\w-]{2,8})?$/;

export default function validation() {
  return yup.object().shape({
    email: yup
      .string()
      .required(i18next.t("validation.landingPage.email"))
      .email(i18next.t("validation.landingPage.validEmail"))
      .matches(
        /^(?:\d{6,15}|[\w-\.]+@([\w-]+\.)+[\w-]{2,6})$/,
        i18next.t("validation.landingPage.validEmail")
      ),
    firstName: yup
      .string()
      .required(i18next.t("validation.landingPage.firstName"))
      .min(3, i18next.t("validation.landingPage.firstNameLength"))
      .max(26, i18next.t("validation.landingPage.firstNameLength")),
    lastName: yup
      .string()
      .required(i18next.t("validation.landingPage.lastName"))
      .min(3, i18next.t("validation.landingPage.lastNameLength"))
      .max(26, i18next.t("validation.landingPage.lastNameLength")),
    subject: yup
      .string()
      .required(i18next.t("validation.landingPage.subject"))
      // .min(6, i18next.t("validation.landingPage.subjectLength"))
      .max(100, i18next.t("validation.landingPage.subjectLength")),
    companyUrl: yup
      .string()
      // .required(i18next.t("validation.landingPage.companyUrl"))
      .matches(urlPattern, i18next.t("validation.landingPage.validUrl")),
    message: yup
      .string()
      // .min(6, i18next.t("validation.landingPage.messageLength"))
      .max(200, i18next.t("validation.landingPage.messageLength")),
    phoneNumber: yup
      .string()
      .required(i18next.t("validation.landingPage.phoneNumber")),
    // .min(13, i18next.t("validation.landingPage.phoneNumberLength"))
    // .max(13, i18next.t("validation.landingPage.phoneNumberLength"))
    // .matches(
    //   phoneNumberPattern,
    //   i18next.t("validation.landingPage.validMobileNumber")
    // ),
    // instagramHandle: yup
    //   .string()
    //   // .required(i18next.t("validation.landingPage.companyUrl"))
    //   .matches(
    //     urlPattern,
    //     i18next.t("validation.landingPage.validInstagramUrl")
    //   ),
    captcha: yup
      .string()
      .required(i18next.t("validation.landingPage.captchaCode")),
  });
}
