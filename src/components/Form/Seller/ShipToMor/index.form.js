import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { CommonButton, Input as TextInput, ToggleButton } from "../../../index";
import validation from "./validation";

function ShipToMorForm(mainProps) {
  const { onSubmit, loading, show, onChange } = mainProps;
  const { t } = useTranslation();

  const initialValues = {
    shippingQuantity: "",
    shippingCarrier: "",
    trackingId: "",
    isShippingType: false,
  };

  function onKeyChange(e) {
    if (
      e.keyCode === 190 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 110 ||
      e.keyCode === 187 ||
      e.keyCode === 69 ||
      e.keyCode === 189
    ) {
      e.preventDefault();
    }
  }
  return (
    <>
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={validation(show)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(props) => {
          return (
            <Form>
              <div className="form-group">
                <TextInput
                  className="form-control"
                  type="number"
                  name="shippingQuantity"
                  onKeyDown={onKeyChange}
                  placeholder={t("text.morInventory.enterQuantity")}
                  setFieldValue={props.handleChange}
                />
              </div>
              {!show ? (
                <>
                  <div className="form-group">
                    <TextInput
                      className="form-control"
                      type="text"
                      name="shippingCarrier"
                      placeholder={t("text.morInventory.enterShippingCarrier")}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <TextInput
                      className="form-control"
                      type="text"
                      name="trackingId"
                      placeholder={t("text.morInventory.enterTrackingId")}
                      setFieldValue={props.handleChange}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="form-group text-start">
                <label className="customSwitchBtn">
                  <ToggleButton onChange={onChange} name="isShippingType" />
                </label>
                <span className="ms-2">Ship Manually</span>
              </div>

              <CommonButton
                type="submit"
                htmlType="submit"
                className="btn btn-gradiant"
                loading={loading}
              >
                {t("text.common.submit")}
              </CommonButton>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default ShipToMorForm;
