import React from "react";
import { FormSteps } from "../../..";
import { PersonalDetails } from "./personalDetails";
import { StoreDetails } from "./storeDetails";
import { BankDetails } from "./bankDetails";

function RegisterForm({
  step,
  onSubmitStepOne,
  onSubmitStepTwo,
  onSubmitStepThree,
  loading,
  onChangeTAndC,
  apiEndPoints,
  countries,
  states,
  storeLoader,
  cities,
  countryCodes,
  onSelectCountry,
  countryLoader,
  cityLoader,
  stateLoader,
  onSelectState,
}) {
  return (
    <>
      <FormSteps step={step} />
      <div className="authPage_cnt h-100">
        {step === "one" && (
          <PersonalDetails
            step={step}
            onSubmit={onSubmitStepOne}
            loading={loading}
            onChangeTAndC={onChangeTAndC}
            countries={countries}
            countryCodes={countryCodes}
          />
        )}
        {step === "two" && (
          <StoreDetails
            step={step}
            onSubmit={onSubmitStepTwo}
            loading={storeLoader}
            apiEndPoints={apiEndPoints}
            countries={countries}
            states={states}
            cities={cities}
            countryCodes={countryCodes}
            onSelectCountry={onSelectCountry}
            countryLoader={countryLoader}
            stateLoader={stateLoader}
            cityLoader={cityLoader}
            onSelectState={onSelectState}
          />
        )}
        {step === "three" && (
          <BankDetails
            step={step}
            onSubmit={onSubmitStepThree}
            loading={storeLoader}
          />
        )}
      </div>
    </>
  );
}

export default RegisterForm;
