import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
// import i18next from "i18next";

import { Input as TextInput } from "../../../index";
import { CommonButton, ImageElement } from "../../../UiElement";
import validation from "./validation";

function EarlyAccessForm(mainProps) {
  const { onSubmit, loading, countryCodes, handleChangeSelect } = mainProps;
  const initialValues = {
    contactNumber: "",
    contactNumberCountryCode: "",
  };
  const { t } = useTranslation();

  function handleKey(e) {
    // if (e.keyCode === 107 || e.keyCode === 109 || e.keyCode === 69) {
    //   e.preventDefault();
    // }
    let ASCIICode = e.which ? e.which : e.keyCode;
    if (
      ASCIICode > 31 &&
      (ASCIICode < 48 || ASCIICode > 57)
      // ||
      // (e.keyCode >= 33 && e.keyCode <= 47)
    ) {
      e.preventDefault();
    }
  }

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={(e, { resetForm }) => {
        onSubmit(e, resetForm);
      }}
      validationSchema={validation()}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form className="customInputGroup d-flex align-items-center mx-auto mt-xxl-5 mt-3">
            <div className="w-100">
              <Select
                className="selectPicker"
                classNamePrefix="selectPicker"
                name="contactNumberCountryCode"
                onChange={handleChangeSelect}
                options={countryCodes}
                // defaultMenuIsOpen
                defaultValue={{
                  label: "+91",
                  value: +91,
                }}
                isDisabled
              />

              <TextInput
                className="customInputGroup-input"
                name="contactNumber"
                disabled={false}
                variant="standard"
                type="text"
                placeholder={t("text.landingPage.mobilePlaceholder")}
                setFieldValue={props.handleChange}
                icon={
                  <span className="customInputGroup-icon">
                    <span className="icon-phone icomoon text-white" />
                  </span>
                }
                onKeyPress={(e) => handleKey(e)}
                min="0"
                inputmode="numeric"
                pattern="[0-9]*"
                title="Non-negative integral number"
              />
            </div>
            <CommonButton
              type="submit"
              extraClassName="customInputGroup-button d-flex align-items-center"
              disabled={loading}
            >
              <span className="customInputGroup-text">Get early access</span>
              <span>
                <ImageElement source="/arrow-next.svg" alt="" />
              </span>
            </CommonButton>
          </Form>
        );
      }}
    </Formik>
  );
}

export default EarlyAccessForm;
