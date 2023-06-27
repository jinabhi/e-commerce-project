import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  DataTable,
  ListingHeader,
  MetaTags,
  PageHeader,
  // textFormatter,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/adminRoutes";
import { ContactedUsServices } from "../../../../services/Admin/ContactedUs/index.service";
import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
  PhoneNumber,
} from "../../../../utils";

function GetEarlyAccess() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { search, pathname } = location;
  const [param, setParam] = useState({});
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [csvData, setCsvData] = useState([]);
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
      // setSearchName(data?.name)
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

  const getCsvData = (data) => {
    const dataCsv = data.map((item) => {
      return {
        Date: dateFormatter(item?.createdAt, dateTimeFormatWithMonth),
        "Contact Number": `${
          item?.contactNumber
            ? `${item?.contactNumberCountryCode} ${item?.contactNumber}`
            : "-"
        }`,
      };
    });
    setCsvData(dataCsv);
  };

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.getEarlyAccess.title"),
    },
  ];

  const tableReset = () => {
    setTableLoader(true);
    setState([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const getEarlyAccess = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
      };
      const res = await ContactedUsServices.getEarlyAccessService({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setState(data.rows);
        getCsvData(data?.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getEarlyAccess();
  }, [param]);

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
    tableReset();
  };

  const columns = [
    {
      dataField: "createdAt",
      text: t("text.getEarlyAccess.dateTime"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => dateFormatter(cell, dateTimeFormatWithMonth),
    },
    {
      dataField: "contactNumber",
      text: t("text.getEarlyAccess.contactNumber"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        PhoneNumber({
          countryCode: row?.contactNumberCountryCode,
          contactNumber: row?.contactNumber,
        }),
    },
  ];

  return (
    <>
      <MetaTags title={t("text.getEarlyAccess.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.getEarlyAccess.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["csvExport"]}
            csvData={csvData}
            fileName="Contact List"
          />
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={state}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerPage}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.earlyAccess")}
      />
    </>
  );
}

export default GetEarlyAccess;
