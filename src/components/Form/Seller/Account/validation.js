import i18next from "i18next";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let alphaNumericRegex = /^[a-zA-Z0-9]+$/;
export function validationStepOne() {
  return yup.object().shape({
    firstName: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.sellerProfile.validFirstName")
      )
      .min(3, i18next.t("validation.register.firstNameLimit"))
      .max(24, i18next.t("validation.register.firstNameLimit"))
      .required(i18next.t("validation.register.firstName")),
    lastName: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.sellerProfile.validLastName")
      )
      .required(i18next.t("validation.register.lastName"))
      .min(3, i18next.t("validation.register.lastNameLimit"))
      .max(24, i18next.t("validation.register.lastNameLimit")),
    phoneNumber: yup
      .string()
      .required(i18next.t("validation.register.phoneNumber"))
      .min(6, i18next.t("validation.register.mobileNumber"))
      .max(12, i18next.t("validation.register.mobileNumber"))
      .matches(/^[0-9]*$/, i18next.t("validation.register.validPhoneNumber")),
    profilePicture: yup.string(),
  });
}

export function validationStepTwo() {
  return yup.object().shape({
    brandImage: yup
      .string()
      .required(i18next.t("validation.register.brandImage")),

    name: yup
      .string()
      .required(i18next.t("validation.register.brandName"))
      .min(3, i18next.t("validation.register.brandNameLimit"))
      .max(24, i18next.t("validation.register.brandNameLimit")),
    storeName: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.sellerProfile.storeName")
      )
      .min(3, i18next.t("validation.register.storeNameLimit"))
      .max(24, i18next.t("validation.register.storeNameLimit"))
      .required(i18next.t("validation.register.storeName")),
    storeContactNumber: yup
      .string()
      .required(i18next.t("validation.profile.phoneNumber"))
      .matches(phoneRegExp, i18next.t("validation.profile.valid"))
      .min(6, i18next.t("validation.profile.short"))
      .max(12, i18next.t("validation.profile.long")),
    address: yup
      .string()
      .min(3, i18next.t("validation.register.addressLimit"))
      .max(54, i18next.t("validation.register.addressLimit"))
      .required(i18next.t("validation.register.address")),
    cityId: yup.string().required(i18next.t("validation.register.city")),
    countryId: yup.string().required(i18next.t("validation.register.country")),
    stateId: yup.string().required(i18next.t("validation.register.state")),
  });
}
export function validationStepThree() {
  return yup.object().shape({
    accountHolderName: yup
      .string()
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.sellerProfile.accountHolderName")
      )
      .required(i18next.t("validation.register.accountHolderName"))
      .min(3, i18next.t("validation.register.accountHolderNameLimit"))
      .max(24, i18next.t("validation.register.accountHolderNameLimit")),
    accountNumber: yup
      .string()
      .min(10, i18next.t("validation.register.accountNumberLimit"))
      .max(12, i18next.t("validation.register.accountNumberLimit"))
      .required(i18next.t("validation.register.accountNumber"))
      .matches(/^[0-9]*$/, i18next.t("validation.register.validAccountNumber")),
    routingNumber: yup
      .string()
      .required(i18next.t("validation.register.routingNumber"))
      .min(10, i18next.t("validation.register.routingNumberLimit"))
      .max(12, i18next.t("validation.register.routingNumberLimit"))
      .matches(
        alphaNumericRegex,
        i18next.t("validation.register.validRoutingNumber")
      ),
  });
}
