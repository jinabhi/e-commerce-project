import i18next from "i18next";
import * as yup from "yup";

const phoneRegExp = /^[0-9]+$/;

let alphaNumericRegex = /^[a-zA-Z0-9]+$/;
export function validationStepOne() {
  return yup.object().shape({
    password: yup
      .string()
      .required(i18next.t("validation.register.password"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        // i18next.t("validation.adminLogin.passwordField")
        " "
      ),
    confirmPassword: yup
      .string()
      .required(i18next.t("validation.register.confirmPassword"))
      .oneOf(
        [yup.ref("password"), null],
        i18next.t("validation.adminResetPassword.confirmPasswordField")
      ),
    email: yup
      .string()
      .required(i18next.t("validation.adminLogin.email"))
      .email(i18next.t("validation.register.validEmail"))
      .matches(
        /^(?:\d{6,15}|[\w-\.]+@([\w-]+\.)+[\w-]{2,6})$/,
        i18next.t("validation.register.validEmail")
      ),

    firstName: yup
      .string()
      .min(3, i18next.t("validation.register.firstNameLimit"))
      .max(24, i18next.t("validation.register.firstNameLimit"))
      .required(i18next.t("validation.register.firstName"))
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.register.validFirstName")
      ),
    lastName: yup
      .string()
      .required(i18next.t("validation.register.lastName"))
      .min(3, i18next.t("validation.register.lastNameLimit"))
      .max(24, i18next.t("validation.register.lastNameLimit"))
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.register.validLastName")
      ),
    phoneNumber: yup
      .string()
      .required(i18next.t("validation.profile.phoneNumber"))
      .matches(phoneRegExp, i18next.t("validation.profile.valid"))
      .min(6, i18next.t("validation.profile.short"))
      .max(12, i18next.t("validation.profile.long")),
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
      .min(1, i18next.t("validation.register.brandNameLimit"))
      .max(24, i18next.t("validation.register.brandNameLimit"))
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.register.validBrandName")
      ),
    storeName: yup
      .string()
      .min(1, i18next.t("validation.register.storeNameLimit"))
      .max(24, i18next.t("validation.register.storeNameLimit"))
      .required(i18next.t("validation.register.storeName"))
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.register.validStoreName")
      ),
    storeContactNumber: yup
      .string()
      .required(i18next.t("validation.profile.phoneNumber"))
      .matches(phoneRegExp, i18next.t("validation.profile.valid"))
      .min(6, i18next.t("validation.profile.short"))
      .max(12, i18next.t("validation.profile.long")),
    address: yup
      .string()
      .min(1, i18next.t("validation.register.addressLimit"))
      .max(54, i18next.t("validation.register.addressLimit"))
      .required(i18next.t("validation.register.address")),
    cityId: yup.string().required(i18next.t("validation.register.city")),
    countryId: yup.string().required(i18next.t("validation.register.country")),
    stateId: yup.string().required(i18next.t("validation.register.state")),
    storeLicenseDocumentImage: yup
      .string()
      .required(i18next.t("validation.register.licenseImage")),
  });
}

export function validationStepThree() {
  return yup.object().shape({
    accountHolderName: yup
      .string()
      .required(i18next.t("validation.register.accountHolderName"))
      .min(1, i18next.t("validation.register.accountHolderNameLimit"))
      .max(24, i18next.t("validation.register.accountHolderNameLimit"))
      .matches(
        /^[a-z](.*[a-z])?$/gim,
        i18next.t("validation.register.validAccountHolderName")
      ),
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
