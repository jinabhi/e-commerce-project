import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  checkValidDateFormatter,
  DataTable,
  MetaTags,
  PageHeader,
} from "../../../components";
import { dateTimeFormatWithMonth } from "../../../helpers";
import routesMap from "../../../routeControl/adminRoutes";
import { commonServices } from "../../../services";

import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
} from "../../../utils";

export default function Notification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;
  const [notificationData, setNotificationData] = useState([]);
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [tableLoader, setTableLoader] = useState(false);
  const [noOfPage, setNoOfPage] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [searchName, setSearchName] = useState("");

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

  const getNotificationData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        message: searchName,
      };
      const res = await commonServices.getNotificationList({ queryParams });
      const { success, data } = res;
      if (success) {
        setNotificationData(data.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getNotificationData();
  }, [param]);

  const tableReset = () => {
    setTableLoader(true);
    setNotificationData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  // const headerSortingClasses = (sortOrder) =>
  //   sortOrder === "asc" ? "sorting_asc" : "sorting_desc";

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
      dataField: "message",
      text: t("text.notification.message"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "createdAt",
      text: t("text.common.date"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
        ),
    },
  ];
  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.dashboard.name"),
    },
    {
      path: "#",
      name: t("text.notification.name"),
    },
  ];

  return (
    <>
      <MetaTags title={t()} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.notification.name")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>

      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={notificationData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        tableLoader={tableLoader}
        setSizePerPage={setSizePerView}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.notification")}
      />
    </>
  );
}
