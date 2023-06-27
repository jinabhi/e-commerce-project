import React, { useEffect, useState } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
import SellerPagination from "../SellerPagination";
import { navigateWithParam } from "../../utils";
import { GlobalLoader } from "../UiElement";
import { AntTooltip } from "..";

function SellerDataTable(props) {
  const {
    pagination = true,
    hasLimit,
    handleLimitChange,
    noOfPage,
    sizePerPage,
    page,
    count,
    children,
    tableData,
    tableColumns,
    param,
    defaultSort,
    header = true,
    bordered = false,
    setSizePerPage,
    tableLoader = false,
    noPad = false,
    searchPlaceholder = "",
    getSearchValue,
    tableReset,
  } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [search, setSearch] = useState("");
  const [firstTimeFetch, setFirstTimeFetch] = useState(false);

  useEffect(() => {
    const element = document.getElementsByClassName("datatable-wrap")?.[0];
    element.classList.remove("react-bootstrap-table");
  }, [tableData]);

  const goToPage = (pageNo) => {
    const newParams = { ...param };
    if (pageNo) {
      newParams.page = pageNo;
    }
    navigateWithParam(newParams, navigate, pathname);
    tableReset();
  };

  const handleSelect = (e) => {
    setSizePerPage(e.target.value);
    goToPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if ((search.length >= 3 || search.length === 0) && firstTimeFetch) {
        getSearchValue(search);
        goToPage(1);
      }
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    setFirstTimeFetch(true);
  }, []);

  function handleSearchValue(val) {
    setSearch(val);
  }

  const options = {
    page,
    sizePerPage,
  };

  const indicationLoading = () => <GlobalLoader />;

  const indicationNoRecords = () => {
    return <div className="text-center text-capitalize">{t("text.common.noRecordFound")}</div>;
  };

  return (
    <div className={!noPad ? "commontable" : "commontable p-0"}>
      {children}
      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
        {header && (
          <div className="row gx-2 py-3 py-lg-4">
            <div className="col-8 col-sm-6 text-start">
              <div id="DataTables_Table_0_filter" className="dataTables_filter">
                {searchPlaceholder ? (
                  <AntTooltip
                    placement="topLeft"
                    promptText={searchPlaceholder}
                  >
                    <label>
                      <input
                        type="search"
                        className="form-control form-control-sm border-3"
                        placeholder="Type 3 or more characters"
                        aria-controls="DataTables_Table_0"
                        onChange={(e) => handleSearchValue(e.target.value)}
                        value={search}
                      />
                    </label>
                  </AntTooltip>
                ) : (
                  <label>
                    <input
                      type="search"
                      className="form-control form-control-sm border-3"
                      placeholder="Type 3 or more characters"
                      aria-controls="DataTables_Table_0"
                      onChange={(e) => handleSearchValue(e.target.value)}
                      value={search}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="col-4 col-sm-6 text-end">
              <div className="datatable-filter">
                <div
                  className="dataTables_length"
                  id="DataTables_Table_0_length"
                >
                  <label>
                    <span className="d-none d-sm-inline-block">Show</span>{" "}
                    <select
                      name="DataTables_Table_0_length"
                      aria-controls="DataTables_Table_0"
                      className="form-select form-select-sm"
                      onChange={handleSelect}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <BootstrapTable
          classes="table dataTable mb-0"
          keyField="id"
          data={tableData}
          options={options}
          columns={tableColumns}
          defaultSorted={defaultSort}
          bordered={bordered}
          wrapperClasses="datatable-wrap"
          loading={tableLoader}
          noDataIndication={
            tableLoader ? indicationLoading : indicationNoRecords()
          }
        />
        {pagination && (
          <SellerPagination
            count={count}
            page={parseInt(page)}
            sizePerPage={sizePerPage}
            noOfPage={noOfPage}
            goToPage={goToPage}
            handleLimitChange={handleLimitChange}
            hasLimit={hasLimit}
          />
        )}
      </div>
    </div>
  );
}

export default SellerDataTable;
