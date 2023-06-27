import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MetaTags, RegisterForm, ModalComponent } from "../../../components";
import { logger, modalNotification } from "../../../utils";
import { SellerRegisterServices, commonServices } from "../../../services";
import {
  selectSellerRegisterData,
  updateSellerRegisterData,
} from "../../../redux/AuthSlice/index.slice";
import { SellerMedia } from "../../../apiEndPoints";
import routesControl from "../../../routeControl/sellerRoutes";
import config from "../../../config";

function SellerRegister() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [storeLoader, setStoreLoader] = useState(false);
  const [step, setStep] = useState("one");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCodes, setCountryCode] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const sellerRegisterData = useSelector(selectSellerRegisterData);
  const [countryLoader, setCountryLoader] = useState(false);
  const [stateLoader, setStateLoader] = useState(false);
  const [cityLoader, setCityLoader] = useState(false);
  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();

  useEffect(() => {
    if (state?.defaultStep) {
      setStep(state?.defaultStep);
    }
  }, []);

  const getCountries = async () => {
    setCountryLoader(true);
    try {
      let res = await commonServices.countries();
      if (res.success) {
        let country = res.data.map((item) => {
          return { name: item.country, id: item.id };
        });
        let countryCode = res.data.map((item) => {
          return { name: item.countryCode, id: item.countryCode };
        });
        setCountries(country);
        setCountryCode(countryCode);
        setCountryLoader(false);
      }
    } catch (error) {
      logger(error);
      setCountryLoader(false);
    }
  };
  const getStates = async (id) => {
    setStateLoader(true);
    try {
      let queryParams = {
        countryId: id,
      };
      let res = await commonServices.states({ queryParams });
      if (res.success) {
        let stateData = res.data.map((item) => {
          return { name: item.stateName, id: item.id };
        });
        setStates(stateData);
        setStateLoader(false);
      }
    } catch (error) {
      logger(error);
      setStateLoader(false);
    }
  };
  const getCities = async (id) => {
    setCityLoader(true);
    try {
      let queryParams = {
        stateId: id,
      };
      let res = await commonServices.cities({ queryParams });
      if (res.success) {
        let city = res.data.map((item) => {
          return { name: item.city, id: item.id };
        });
        if (stateId) {
          setCities(city);
          setCityLoader(false);
        }
      }
    } catch (error) {
      logger(error);
      setCityLoader(false);
    }
  };
  const onSubmitPersonalDetail = async (values) => {
    setLoading(true);
    try {
      let bodyData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phoneNumberCountryCode: values.phoneNumberCountryCode,
        phoneNumber: values.phoneNumber.toString(),
      };
      let res = await SellerRegisterServices.personalDetails(bodyData);
      if (res.success) {
        modalNotification({
          type: "success",
          message: res?.message,
        });
        setStep("two");
        dispatch(updateSellerRegisterData(res.data));
        navigate(routesControl.OTP_VERIFICATION.path);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };
  const onSubmitStoreDetail = async (values) => {
    setStoreLoader(true);
    try {
      let bodyData = {
        name: values.name,
        brandImage: values.brandImage,
        storeName: values.storeName,
        storeContactNumberCountryCode: values.storeContactNumberCountryCode,
        storeContactNumber: values.storeContactNumber.toString(),
        address: values.address,
        countryId: values.countryId,
        stateId: values.stateId,
        cityId: values.cityId,
        storeLicenseDocumentImage: values.storeLicenseDocumentImage,
        userId: sellerRegisterData.id,
      };
      let res = await SellerRegisterServices.storeDetails(bodyData);
      if (res.success) {
        setStep("three");
        setStoreLoader(false);
      }
    } catch (error) {
      logger(error);
      setStoreLoader(false);
    }
    setStoreLoader(false);
  };

  const onSubmitBankDetail = async (values) => {
    setStoreLoader(true);
    try {
      let bodyData = {
        accountHolderName: values.accountHolderName,
        accountNumber: values.accountNumber.toString(),
        routingNumber: values.routingNumber.toString(),
        userId: sellerRegisterData.id,
      };
      let res = await SellerRegisterServices.bankDetails(bodyData);
      if (res.success) {
        setShow(true);
        setStoreLoader(false);
        setTimeout(() => {
          setShow(false);
          setStep(4);
          dispatch(updateSellerRegisterData({}));
          navigate(routesControl.LOGIN.path);
        }, 5000);
      }
    } catch (error) {
      logger(error);
      setStoreLoader(false);
    }
    setStoreLoader(false);
  };

  const onChangeTAndC = (e) => {
    if (e.target.checked) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  };

  const onSelectCountry = async (setFieldValue, e) => {
    try {
      setStateLoader(true);
      setFieldValue("stateId", undefined);
      setFieldValue("cityId", undefined);
      setCountryId(e);
    } catch (error) {
      logger(error);
    }
  };
  const onSelectState = async (setFieldValue, e) => {
    try {
      setCityLoader(true);
      setFieldValue("cityId", undefined);
      setStateId(e);
    } catch (error) {
      logger(error);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    if (countryId) {
      getStates(countryId);
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      getCities(stateId);
    }
  }, [stateId]);

  return (
    <>
      <MetaTags title={t("text.register.title")} />
      <ModalComponent
        show={show}
        onHandleCancel={() => {
          setShow(false);
        }}
        closeButton={false}
      >
        <img
          src={`${config.IMAGE_URL}/success.svg`}
          className="img-fluid"
          alt="morluxury"
        />
        <h2>{t("text.common.success")}</h2>
        <p>{t("text.register.successMsg")}</p>
      </ModalComponent>
      <div className="d-flex  h-100 flex-column justify-content-between">
        <RegisterForm
          step={step}
          onSubmitStepOne={onSubmitPersonalDetail}
          onSubmitStepTwo={onSubmitStoreDetail}
          onSubmitStepThree={onSubmitBankDetail}
          storeLoader={storeLoader}
          loading={loading || loader}
          onChangeTAndC={onChangeTAndC}
          apiEndPoints={SellerMedia.brandLogo}
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
      </div>
    </>
  );
}

export default SellerRegister;
