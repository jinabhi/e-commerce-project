import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  actionFormatter,
  Breadcrumb,
  DataTable,
  ListingHeader,
  MetaTags,
  ModalComponent,
  PageHeader,
  SweetAlert,
  textFormatter,
  UserQueriesFilter,
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
  readMoreTextShow,
  modalNotification,
} from "../../../../utils";

function UserQueries() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { search, pathname } = location;
  const [param, setParam] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [filterData, setFilterData] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);
  const [queryId, setQueryId] = useState();
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

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.contactedUs.title"),
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

  const getUserQueries = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
        ...filterData,
      };
      const res = await ContactedUsServices.getUserQueriesService({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setState(data.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getUserQueries();
  }, [param]);

  function onSubmitData(val) {
    setFilterData(val);
    tableReset();
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
    setFilterVisible(false);
  }

  const onReset = () => {
    setFilterData({});
    tableReset();
    setFilterVisible(false);
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  };

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
  };
  const onConfirmAlert = async () => {
    try {
      const res = await ContactedUsServices.deleteUserQueriesService(queryId);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        tableReset();
        getUserQueries();
        setLoading(true);
        setIsAlertVisible(false);
        return true;
      }
    } catch (error) {
      logger(error);
    }
  };
  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };

  const onCloseDescriptionModal = () => {
    setShowReadMore(false);
    setReadData("");
  };
  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.delete"),
        icon: "icon ni ni-trash",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setQueryId(row?.id);
        },
      },
    ];

    return optionsArr;
  };
  const columns = [
    {
      dataField: "createdAt",
      text: t("text.contactedUs.dateTime"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => dateFormatter(cell, dateTimeFormatWithMonth),
    },
    {
      dataField: "userType",
      text: t("text.contactedUs.userType"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => textFormatter(cell),
    },
    {
      dataField: "fullName",
      text: t("text.contactedUs.userName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        row?.userDetails?.firstName
          ? `${textFormatter(row?.userDetails?.firstName)} ${textFormatter(
              row?.userDetails?.lastName
            )}`
          : "-",
    },
    {
      dataField: "reason",
      text: t("text.contactedUs.reason"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "description",
      text: t("text.common.description"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => readMoreTextShow(cell, showMoreText),
    },
    {
      dataField: "action",
      text: t("text.common.action"),
      headerClasses: "nk-tb-col-tools text-right nosort sorting_disabled",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const arrayOfData = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "seller",
      name: "Seller",
    },
    {
      id: "customer",
      name: "Customer",
    },
  ];

  return (
    <>
      <MetaTags title={t("text.contactedUs.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.contactedUs.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["filter"]}
            popover={
              <UserQueriesFilter
                onSubmit={onSubmitData}
                onReset={onReset}
                arrayOfData={arrayOfData}
                filterData={filterData}
              />
            }
            setVisible={setFilterVisible}
            visible={filterVisible}
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
        searchPlaceholder={t("text.search.userQueries")}
      />
      <SweetAlert
        title={t("text.contactedUs.msg")}
        text={t("text.contactedUs.confirmMsg")}
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        cancelButtonText={t("text.common.no")}
        confirmButtonText={t("text.common.yes")}
        setIsAlertVisible={setIsAlertVisible}
        showLoaderOnConfirm
        loading={loading}
        onConfirmAlert={onConfirmAlert}
      />
      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseDescriptionModal}
        title={t("text.common.description")}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </>
  );
}

export default UserQueries;
