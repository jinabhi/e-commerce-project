import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { EarningsList, EarningsGraph } from "../../..";
import {
  CommonButton,
  EarningFilter,
  ExportButton,
  MetaTags,
} from "../../../../components";

function Earnings() {
  const { t } = useTranslation();
  const [earningList, setEarningList] = useState(true);
  const [earningGraph, setEarningGraph] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const currentYear = new Date().getFullYear();
  const [selection, setSelection] = useState(currentYear);

  return (
    <>
      <MetaTags title={t("text.earnings.earnings")} />
      <div className="common-heading">
        <h1 className="common-heading_title text-white">
          {t("text.earnings.earnings")}
        </h1>
      </div>
      <div className="commontable">
        <div className="customTabs">
          <div className="row mt-3 justify-content-between">
            <div className="col-sm-12 col-lg-8">
              <EarningFilter
                setFromDate={setFromDate}
                setToDate={setToDate}
                setSelection={setSelection}
                selection={selection}
                currentYear={currentYear}
              />
            </div>
            <div className="col-sm-12 col-lg-4">
              <div className="d-flex justify-content-end align-items-center tabBar">
                <ExportButton
                  data={csvData}
                  fileName="Earning List.csv"
                  extraClassName={`btn btn-gradiant d-inline-flex align-items-center ${
                    csvData?.length > 0 ? "" : "disabled"
                  } `}
                >
                  <em className="icon-bulk-upload" />{" "}
                  {t("text.common.csvExports")}
                </ExportButton>
                <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <CommonButton
                      className="nav-link active"
                      id="activeOffer-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#activeOffer"
                      type="button"
                      onClick={() => {
                        setEarningList(true);
                        setEarningGraph(false);
                      }}
                      role="tab"
                      aria-controls="edit"
                      aria-selected="true"
                    >
                      <span className="icon-list-view" />
                    </CommonButton>
                  </li>
                  <li className="nav-item" role="presentation">
                    <CommonButton
                      className="nav-link"
                      id="expiredOffer-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#expiredOffer"
                      type="button"
                      role="tab"
                      onClick={() => {
                        setEarningList(false);
                        setEarningGraph(true);
                      }}
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      <span className="icon-graph" />
                    </CommonButton>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {earningList && (
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show" id="activeOffer" />

            <EarningsList
              setCsvData={setCsvData}
              registeredFrom={fromDate}
              registeredTo={toDate}
              Year={selection}
            />
          </div>
        )}

        {earningGraph && (
          <div className="tab-pane fade show" id="expiredOffer">
            <div className="card earningGraph bg-850">
              <EarningsGraph
                registeredFrom={fromDate}
                registeredTo={toDate}
                Year={selection}
                id="earningChart"
                height="400"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Earnings;
