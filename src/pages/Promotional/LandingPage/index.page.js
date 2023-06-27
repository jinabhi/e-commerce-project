import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  // AccordionComponent,

  EarlyAccessForm,
  Fancybox,
  ImageElement,
  MetaTags,
  ModalComponent,
  PromotionalContactUsForm,
} from "../../../components";
import config from "../../../config";
// import routesMap from "../../routeControl";
import { commonServices, UserServices } from "../../../services";
import { logger } from "../../../utils";
import modalNotification from "../../../utils/notifications";

function LandingPage() {
  const { t } = useTranslation();
  const [earlyAccessLoading, setEarlyAccessLoading] = useState(false);
  const [contactUsLoading, setContactUsLoading] = useState(false);
  // const [page] = useState(1);
  // const [sizePerPage] = useState(7);
  // const [faqData, setFaqData] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [landingPageData, setLandingPageData] = useState({});
  const [countryCodeValue, setCountryCodeValue] = useState("+91");
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [value, setValues] = useState();
  const [countDownState, setCountDownState] = useState({});
  const [state, setState] = useState(true);

  const getCountries = async () => {
    try {
      const res = await commonServices.countries();
      const { success, data } = res;
      if (success) {
        let arr = [];
        data.map((item) => {
          arr.push({ label: item.countryCode, value: item.countryCode });
        });
        setCountryCodes(arr);
      }
    } catch (error) {
      logger(error);
    }
  };

  const handleChangeSelect = (values) => {
    setCountryCodeValue(values.value);
  };

  useEffect(() => {
    window.initProgressive();
    getCountries();
  }, []);

  const onSubmit = async (values, resetForm) => {
    setEarlyAccessLoading(true);
    try {
      let bodyData = {
        contactNumber: value.contactNumber.toString(),
        contactNumberCountryCode: countryCodeValue.toString(),
      };
      if (countryCodeValue) {
        setErrMsg("");
        const res = await UserServices.earlyAccessService(bodyData);
        const { success, message } = res;
        if (success) {
          // modalNotification({
          //   type: "success",
          //   message,
          // });
          // setConatactModal(true);
          // setMsg(message);
          navigate("/get-early-access", { state: { message } });
          resetForm();
        }
      } else {
        setErrMsg("Please select country code");
      }
    } catch (error) {
      logger(error);
    }
    setEarlyAccessLoading(false);
  };

  const onContactUsSubmit = async (values, resetForm) => {
    setContactUsLoading(true);
    try {
      let phoneNumberValue = "";
      if (values.phoneNumber) {
        let val = values.phoneNumber.toString().substr(2);
        let val1 = val?.slice(0, 3);
        let val2 = val?.slice(3, 6);
        let val3 = val?.slice(6, 10);
        phoneNumberValue = `(${val1})${val2}-${val3}`;
      }
      let bodyData = {
        ...values,
        phoneNumber: phoneNumberValue,
      };
      const res = await UserServices.contactUsService(bodyData);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        resetForm();
        setValues();
      }
    } catch (error) {
      logger(error);
    }
    setContactUsLoading(false);
  };

  // const GetFaqData = async () => {
  //   try {
  //     let queryParams = {
  //       limit: sizePerPage,
  //       offset: (page - 1) * sizePerPage,
  //       type: "promotional",
  //     };
  //     const res = await UserServices.faqService({ queryParams });
  //     const { success, data } = res;
  //     if (success) {
  //       setFaqData(data?.rows);
  //     }
  //   } catch (error) {
  //     logger(error);
  //   }
  // };

  const getlandingPageData = async () => {
    try {
      const res = await UserServices.videoService();
      const { success, data } = res;
      if (success) {
        setLandingPageData(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getTime = () => {
    let countDownDate = new Date(config?.DATE_OF_LAUNCH).getTime();
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setCountDownState({
      days,
      hours,
      minutes,
      seconds,
    });
    if (distance < 0) {
      setCountDownState({});
      setState(false);
    }
  };

  useEffect(() => {
    if (state) {
      const interval = setInterval(getTime, 1000);

      return () => clearInterval(interval);
    }
  }, [state]);

  useEffect(() => {
    // GetFaqData();
    getlandingPageData();
  }, []);

  return (
    <>
      <MetaTags title={t("text.landingPage.metaTitle")} />
      <section className="bannerSection topOffset text-center d-flex align-items-center justify-content-center flex-column position-relative">
        <picture>
          <source
            type="image/webp"
            srcSet={`${config.IMAGE_URL}/home_banner.webp`}
            alt="home_banner"
          />
          <ImageElement
            className="img-fluid bannerSection-BannerImg "
            source="home_banner.jpg"
            alt="home_banner.jpg"
          />
        </picture>

        <div className="bannerSection_cnt">
          <div className="container">
            {Object.entries(countDownState)?.length > 0 && (
              <div className="timer">
                {countDownState?.days !== 0 && (
                  <>
                    <span>{countDownState?.days} </span>
                    {countDownState?.days === 1 ? "Day" : "Days"}{" "}
                  </>
                )}
                <span>
                  {countDownState?.hours === 0 ? "00" : countDownState?.hours}{" "}
                </span>
                Hours{" "}
                <span>
                  {countDownState?.minutes === 0
                    ? "00"
                    : countDownState?.minutes}{" "}
                </span>
                Minutes <span>{countDownState?.seconds}</span> Seconds
              </div>
            )}
            <h1 className="bannerSection-text-1">Authentic American Luxury</h1>
            <h2 className="bannerSection-text-2">Beauty & Skin Care</h2>

            <div className="bannerSection-divider" />

            <p>
              Exclusively Available for purchase in India.
              <br />
              MorLuxury is the only destination for authentic American luxury
              beauty and skincare products
            </p>
            <br />
            <p>
              Pre-launch Perks : Sign up using your mobile number below and
              receive <br className="d-none d-sm-block" />
              complimentary gifts with your purchase.
            </p>

            <EarlyAccessForm
              onSubmit={onSubmit}
              loading={earlyAccessLoading}
              countryCodes={countryCodes}
              handleChangeSelect={handleChangeSelect}
            />
            {errMsg && <span style={{ color: "red" }}>{errMsg}</span>}

            <p className="termsPolicy">
              By using our website, you agree to our{" "}
              <Link to="/terms-of-use">Terms of Use</Link> and our
              <br className="d-lg-block d-none" />
              <Link to="/privacy-policy"> Privacy Policy</Link>
              .©️MorLuxuryDream, LLC. All Rights Reserved.
            </p>

            {landingPageData?.isVideoShow === "0" && (
              <div className="text-center">
                <Fancybox>
                  <a
                    data-fancybox="video"
                    href={landingPageData?.videoBaseUrl}
                    className="watchVideo d-flex align-items-center justify-content-center"
                  >
                    <span className="watchVideo-text">Watch the video</span>
                    <span className="watchVideo-icon">
                      <ImageElement source="/play-btn.svg" alt="" />
                    </span>
                  </a>
                </Fancybox>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pt-110 pb-40 beauty ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-6 mb-3 text-center mb-md-0">
              <div className="overflow-hidden position-relative">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${config.IMAGE_URL}/take-time-for-yourself.webp`}
                    alt="take-time-for-yourself-today"
                  />
                  {/* <source
                    srcSet={`${config.IMAGE_URL}/take-time-for-yourself.jpg`}
                    alt="take-time-for-yourself-today"
                  /> */}

                  <ImageElement
                    className="img-fluid progressive__img progressive--not-loaded"
                    data-progressive={`${config.IMAGE_URL}/take-time-for-yourself.jpg`}
                    source="take-time-for-yourself.jpg"
                    alt="take-time-for-yourself-today"
                  />
                </picture>
              </div>
            </div>
            <div className="col-md-6 col-lg-5 offset-lg-1">
              <div className="heading">
                <h2 className="heading-text-1">beauty</h2>
                <h2 className="heading-text-2">
                  Look and Feel
                  <br className="d-lg-block d-none" />
                  Your Best.
                </h2>
                <div className="heading-divider" />
                <p>
                  MorLuxury is the premiere destination for high-quality
                  American beauty & skincare products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="makeup d-flex align-items-center  position-relative">
        <div className="overflow-hidden position-relative">
          <picture>
            {/* <source
              srcSet={`${config.IMAGE_URL}/eternal-beauty-for-everyone.webp`}
              alt="eternal-beauty-for-everyone"
            />
            <source
              srcSet={`${config.IMAGE_URL}/eternal-beauty-for-everyone.jpg`}
              alt="eternal-beauty-for-everyone"
            /> */}
          </picture>
          <ImageElement
            className="img-fluid makeup_img progressive__img progressive--not-loaded"
            data-progressive={`${config.IMAGE_URL}/eternal-beauty-for-everyone.jpg`}
            source="eternal-beauty-for-everyone.jpg"
            alt="take-time-for-yourself-today"
          />
        </div>
        <div className="container makeup_cnt">
          <div className="row align-items-center ">
            <div className="col-lg-12">
              <div className="heading">
                <h2 className="heading-text-1">makeup</h2>
                <h2 className="heading-text-2">
                  Exclusively Made in America.
                  {/* <br className="d-lg-block d-none" />
                  for Everyone */}
                </h2>

                <div className="heading-divider" />

                <p className="mb-0">
                  MorLuxury is the only beauty and skincare shop that celebrates
                  Indian culture.
                </p>
              </div>
            </div>
            {/* <div className="col-lg-6" /> */}
          </div>
        </div>
      </section>

      <section className="py-110 download">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <div className="heading text-center">
                <h2 className="heading-text-1">download</h2>
                <h2 className="heading-text-2">EXCLUSIVE. BEAUTY. SKINCARE.</h2>

                <div className="heading-divider mx-auto" />
              </div>
            </div>
            <div className="">
              <div className="col-lg-12 text-center store-btn justify-content-center d-flex">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow(true);
                  }}
                  className="store-btn-play-store"
                >
                  <ImageElement source="play-store.png" />
                </Link>
              </div>
              <div className="overflow-hidden position-relative">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${config.IMAGE_URL}/android-app.webp`}
                    alt="android-app"
                  />
                  {/* <source
                    srcSet="<?php echo IMAGES_URL?>/android-app.png"
                    alt="android-app"
                  /> */}
                  <ImageElement
                    className="img-fluid mobile-bg progressive__img progressive--not-loaded"
                    data-progressive={`${config.IMAGE_URL}/android-app.png`}
                    source="android-app.png"
                    alt="take-time-for-yourself-today"
                  />
                </picture>
              </div>
            </div>
            <div className="pt-50 pb-40">
              <div className="col-lg-12 text-center store-btn justify-content-center d-flex">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow(true);
                  }}
                  className="store-btn-app-store"
                >
                  <ImageElement source="app-store.png" />
                </Link>
              </div>
              <div className="overflow-hidden position-relative">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${config.IMAGE_URL}/ios-app.webp`}
                    alt="ios-app"
                  />
                  {/* <source
                    srcSet="<?php echo IMAGES_URL?>/ios-app.png"
                    alt="ios-app"
                  /> */}
                  <ImageElement
                    className="img-fluid mobile-bg progressive__img progressive--not-loaded"
                    data-progressive={`${config.IMAGE_URL}/ios-app.png`}
                    source="ios-app.png"
                    alt="take-time-for-yourself-today"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="pt-80 pb-160 features fancyshape position-relative"> */}
      <section className="features fancyshape position-relative">
        {/* <div className="container">
          <div className="row mb-lg-4 justify-content-center">
            <div className="col-lg-3 col-sm-6 specialitySection mb-3 mb-sm-0">
              <ImageElement className="img-fluid" source="/best-quality.svg" />
              <div className="specialitySection-details">
                <h5>Best Quality</h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 specialitySection">
              <ImageElement
                className="img-fluid"
                source="/cost-effective.svg"
              />
              <div className="specialitySection-details">
                <h5>Cost Effective</h5>
              </div>
            </div>
          </div>
        </div> */}
        <ImageElement
          className="img-fluid w-100 triangle d-lg-block d-none"
          source="triangle-shape.svg"
        />
      </section>

      {/* <section className="pt-60 faq pb-50">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12 mb-5">
              <div className="heading text-center">
                <h2 className="heading-text-1">faq</h2>
                <h2 className="heading-text-2">
                  Frequently Asked
                  <br className="d-lg-block d-none" />
                  Questions
                </h2>

                <div className="heading-divider mx-auto" />
              </div>
            </div>

            <div className="col-lg-6 d-lg-block d-none">
              <div className="overflow-hidden position-relative">
                <picture>
                  <source
                    srcSet={`${config.IMAGE_URL}/faq_img.webp`}
                    alt="faq_img"
                  />
                  <source
                    srcSet={`${config.IMAGE_URL}/faq_img.png`}
                    alt="faq_img"
                  />
                  <ImageElement
                    className="img-fluid progressive__img progressive--not-loaded"
                    data-progressive={`${config.IMAGE_URL}/faq_img.png`}
                    source="/faq_img.png"
                    alt="faq_img"
                  />
                </picture>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 customFaq">
              {faqData.length !== 0 ? (
                <>
                  <AccordionComponent AccordionContent={faqData} />
                  <Link
                    to={routesMap.FAQ.path}
                    className="btn btn-primary ripple-effect flex-shrink-0 w190 mt-4 btn-gradiant"
                  >
                    {t("text.common.seeMore")}
                  </Link>
                </>
              ) : (
                <p className="text-center">No Data Found</p>
              )}
            </div>
          </div>
        </div>
      </section> */}

      <section className="contactUs">
        <div className="greybox py-110">
          <div className="container fancyshape">
            <div className="row ">
              <div className="col-lg-12">
                <div className="heading text-center">
                  <h2 className="heading-text-1">Want to List your Brand?</h2>
                  <h2 className="heading-text-2">Get in touch</h2>

                  <div className="heading-divider mx-auto" />
                </div>
              </div>
              <div className="col-lg-12 contactUs_form">
                <PromotionalContactUsForm
                  onSubmit={onContactUsSubmit}
                  loading={contactUsLoading}
                  setValues={setValues}
                  value={value}
                />
              </div>
            </div>
            <ImageElement
              className="img-fluid w-100 mt-4 triangle d-lg-block d-none"
              source="triangle-shape-reverse.svg"
            />
          </div>
        </div>
      </section>
      <ModalComponent
        modalClassName="comingSoonModal"
        show={show}
        extraTitleClassName="p-0 border-0"
        onHandleCancel={() => {
          setShow(false);
        }}
      >
        {/* <h2>Coming Soon</h2> */}
        <ImageElement source="coming-soon.jpg" alt="Coming Soon" />
      </ModalComponent>
    </>
  );
}

export default LandingPage;
