import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  PageHeader,
  Tabs,
  ModalComponent,
  MetaTags,
} from "../../../../components";
import { SellerAccountServices } from "../../../../services/Seller";
import AccountDetails from "./accountDetails";
import BankDetails from "./bankDetails";
import PersonalInfo from "./personalnfo";
import StoreDetails from "./storeDetails";
import { logger } from "../../../../utils";
import { selectUserData } from "../../../../redux/AuthSlice/index.slice";

function SellerProfile() {
  const { t } = useTranslation();
  const [accountData, setAccountData] = useState({});
  const [bankData, setBankData] = useState({});
  const [show, setShow] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const userData = useSelector(selectUserData);
  const [loading, setLoading] = useState(false);
  const [stateId, setStateId] = useState();
  const [countryId, setCountryId] = useState();

  const getAccountData = async () => {
    setLoading(true);
    try {
      const res = await SellerAccountServices.getSellerData(userData.id);
      const { success, data } = res;
      if (success) {
        setAccountData(data);
        setBankData(data?.sellerBankDetail);
        data?.userAddressDetails?.map((i) => {
          setStateId(i.stateId);
          setCountryId(i.countryId);
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAccountData();
  }, []);

  const showSuccessModal = (msg) => {
    setShow(true);
    setSuccessMsg(msg);
    setTimeout(() => {
      setShow(false);
      setSuccessMsg("");
    }, 4000);
  };
  const tabContent = [
    {
      name: t("text.sellerProfile.accountDetails"),
      key: "Account Detail",
      content: (
        <AccountDetails
          getAccountData={getAccountData}
          accountData={accountData}
          userData={userData}
          showSuccessModal={showSuccessModal}
        />
      ),
    },
    {
      name: t("text.sellerProfile.store"),
      key: "Store Detail",
      content: (
        <StoreDetails
          getAccountData={getAccountData}
          accountData={accountData}
          userData={userData}
          showSuccessModal={showSuccessModal}
          countryId={countryId}
          stateId={stateId}
          setCountryId={setCountryId}
          setStateId={setStateId}
        />
      ),
    },
    {
      name: t("text.sellerProfile.bankInfo"),
      key: "Bank Info",
      content: (
        <BankDetails
          getAccountData={getAccountData}
          accountData={bankData}
          userData={userData}
          showSuccessModal={showSuccessModal}
        />
      ),
    },
  ];

  return (
    <>
      <MetaTags title={t("text.sellerProfile.metaTitle")} />
      <div className="myAccount pb">
        <PageHeader userType="seller" heading={t("text.sellerProfile.title")} />
        <div className="row">
          <PersonalInfo info={accountData} loading={loading} />
          <div className="col-md-8">
            <div className="myAccount_right bg-850 pd-common radius-20">
              <div className="commonTabs">
                <Tabs tabContent={tabContent} border={false} />
              </div>
            </div>
          </div>
        </div>
        <ModalComponent
          show={show}
          onHandleCancel={() => {
            setShow(false);
          }}
        >
          <img
            src="/assets/images/success.svg"
            className="img-fluid"
            alt="morluxury"
          />
          <h2 className="text-white">{successMsg}</h2>
        </ModalComponent>
      </div>
    </>
  );
}

export default SellerProfile;
