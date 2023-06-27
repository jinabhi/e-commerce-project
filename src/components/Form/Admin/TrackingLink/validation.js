import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  const URL =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  return yup.object().shape({
    text: yup
      .string()
      .required(i18next.t("validation.manageOrders.text"))
      .matches(URL, i18next.t("validation.manageOrders.urlText"))
      .min(16, i18next.t("validation.manageOrders.input"))
      .max(240, i18next.t("validation.manageOrders.input")),
  });
}
