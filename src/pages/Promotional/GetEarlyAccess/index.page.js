/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ImageElement, MetaTags } from "../../../components";
import { stringToHTML } from "../../../utils";

function GetEarlyAccess() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { message } = state;

  return (
    <>
      <MetaTags title={t("text.landingPage.metaTitle")} />
      <section className="getEarlyAccess position-relative">
        <div className="getEarlyAccess_box">
          <ImageElement
            source="get-early-access.jpg"
            className="img-fluid d-none d-md-block"
          />
          <ImageElement
            source="get-early-access-mobile.jpg"
            className="img-fluid d-block d-md-none"
          />
          <Container>
            <div className="getEarlyAccess_box_cnt">
              {stringToHTML(message)}
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}

export default GetEarlyAccess;
