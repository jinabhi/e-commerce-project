import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

import {
  MetaTags,
  PageHeader,
  ListingHeader,
  WinstonLogFilter,
  checkValidData,
  DataTable,
  Select,
} from "../../../components";
import {
  navigateWithParam,
  decodeQueryData,
  readMoreTextShow,
  dateFormatter,
  getSortType,
  logger,
} from "../../../utils";
import { WinstonLogsServices } from "../../../services";
import { dateTimeFormatWithMonth } from "../../../helpers";

function WinstonLog() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { search, pathname } = location;

  const [filterData, setFilterData] = useState();
  const [filterVisible, setFilterVisible] = useState(false);
  const [noOfPage, setNoOfPage] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [winstonLogsData, setWinstonLogsData] = useState([]);
  const [winstonFileData, setWinstonFileData] = useState();
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [fileType, setFileType] = useState("");

  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      if (data?.sortType) {
        const sortData = [
          {
            order: getSortType(data?.sortType),
            dataField: data?.sortBy,
          },
        ];
        setDefaultSort(sortData);
      } else {
        setDefaultSort({
          dataField: "",
          order: "",
        });
      }
    }
  }, [location]);

  const tableReset = () => {
    setTableLoader(true);
    setWinstonLogsData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  function onFilterData(val) {
    setFilterData(val);
    setFilterVisible(false);
    tableReset();
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  }
  const onReset = () => {
    setFilterData({});
    tableReset();
    setFilterVisible(false);
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  };
  const getWinstonFileDropdown = async () => {
    setTableLoader(true);
    try {
      let queryParams = {};
      const res = await WinstonLogsServices.getWinstonFilesDropDownService({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        let arrayData = data?.rows?.map((item) => {
          return { name: item.key, id: item.value };
        });
        setWinstonFileData(arrayData);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };
  const getWinstonLogsList = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        fileName: fileType,
        ...filterData,
      };
      const res = await WinstonLogsServices.getWinstonLogsListService({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setWinstonLogsData(data?.rows);
        setNoOfPage(data?.count > 0 ? Math.ceil(data?.count / sizePerPage) : 1);
        setTotalCount(data?.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  const arrayData = [
    { id: "info", name: "Info" },
    { id: "error", name: "Error" },
  ];
  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  useEffect(() => {
    getWinstonFileDropdown();
    if (fileType && param) {
      getWinstonLogsList();
    }
  }, [param, fileType]);

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
    tableReset();
  };

  const columns = [
    {
      dataField: "level",
      text: t("text.winstonLog.type"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => checkValidData(cell),
    },
    {
      dataField: "message",
      text: t("text.winstonLog.title"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => readMoreTextShow(checkValidData(cell)),
    },
    {
      dataField: "timestamp",
      text: t("text.winstonLog.date"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => dateFormatter(cell, dateTimeFormatWithMonth),
    },
  ];
  const initialValues = { fileType: undefined };

  return (
    <>
      <MetaTags title={t("text.winstonLog.winstonLogsPageTitle")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.winstonLog.winstonLogsPageTitle")} />
          <ListingHeader
            btnArray={["filter"]}
            popover={
              <WinstonLogFilter
                onSubmit={onFilterData}
                filterData={filterData}
                onReset={onReset}
                arrayOfData={arrayData}
              />
            }
            setVisible={setFilterVisible}
            visible={filterVisible}
          />
        </div>
      </div>
      <Formik initialValues={{ ...initialValues }}>
        {(props) => (
          <Form className="w-100 pb-4">
            <div className="d-flex justify-content-between flex-wrap flex-lg-nowrap w-100 mt-3">
              <div className="form-group">
                <Select
                  style={{
                    width: "400px",
                  }}
                  id="fileType"
                  name="fileType"
                  disabled={false}
                  variant="standard"
                  arrayOfData={winstonFileData}
                  placeholder="Select"
                  setFieldValue={props.handleChange}
                  onSelect={(e) => {
                    if (setFileType) {
                      setFileType(e ? `${e}` : "");
                    }
                  }}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={winstonLogsData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerPage}
        tableLoader={tableLoader}
        tableReset={tableReset}
        header={false}
      />
    </>
  );
}
export default WinstonLog;
