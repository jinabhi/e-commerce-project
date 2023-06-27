import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUserDataAction } from "../../../../redux/AuthSlice/index.slice";
import { StoreDetailsForm } from "../../../../components";
import { SellerAccountServices, commonServices } from "../../../../services";
import { logger } from "../../../../utils";
import Media from "../../../../apiEndPoints/Seller/SellerMedia";

function StoreDetails({
  accountData,
  getAccountData,
  // userData,
  showSuccessModal,
  setStateId,
  stateId,
  countryId,
  setCountryId,
}) {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [stateLoader, setStateLoader] = useState(false);
  const [cityLoader, setCityLoader] = useState(false);

  const getCountries = async () => {
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
        setCountryCodes(countryCode);
      }
    } catch (error) {
      logger(error);
    }
  };
  const getStates = async (id) => {
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
      }
    } catch (error) {
      logger(error);
    }
  };

  const getCities = async (id) => {
    try {
      let queryParams = {
        stateId: id,
      };
      let res = await commonServices.cities({ queryParams });
      if (res.success) {
        let city = res.data.map((item) => {
          return { name: item.city, id: item.id };
        });
        setCities(city);
      }
    } catch (error) {
      logger(error);
    }
  };

  const onSelectCountry = async (setFieldValue, e) => {
    try {
      setStateLoader(true);
      setFieldValue("stateId", undefined);
      setFieldValue("cityId", undefined);
      setCities([]);
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

  const onSubmit = async (bodyData) => {
    setLoading(true);
    try {
      let values = { ...bodyData };
      values.storeContactNumber = `${values.storeContactNumber}`;
      const response = await SellerAccountServices.editStoreDetailService(
        values,
        accountData?.sellerBrandDetail?.id
      );
      const { success, message } = response;
      if (success) {
        setLoading(false);
        setIsEdit(false);
        showSuccessModal(message);
        dispatch(updateUserDataAction(response?.data));
        getAccountData();
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const editProfile = () => {
    setIsEdit(true);
  };
  const cancelProfile = () => {
    formRef.current.resetForm({ ...accountData });
    setIsEdit(false);
  };
  return (
    <>
      <StoreDetailsForm
        loading={loading}
        onSubmit={onSubmit}
        editProfile={editProfile}
        cancelProfile={cancelProfile}
        isEdit={isEdit}
        countries={countries}
        states={states}
        cities={cities}
        formRef={formRef}
        countryCode={countryCodes}
        accountData={accountData}
        brandLogo={Media.brandLogo}
        licenseImage={Media.licenseImage}
        onSelectCountry={onSelectCountry}
        stateLoader={stateLoader}
        cityLoader={cityLoader}
        onSelectState={onSelectState}
      />
    </>
  );
}

export default StoreDetails;
