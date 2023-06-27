import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  checkValidData,
  checkValidDateFormatter,
  DataTable,
  MetaTags,
  ModalComponent,
  PageHeader,
  showLinkFormatter,
  textFormatter,
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
} from "../../../../utils";

function GetPromotionalContactUs() {
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
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [showReadMoreSubject, setShowReadMoreSubject] = useState(false);
  const [readSubject, setReadSubject] = useState();
  const [showReadMoreMessage, setShowReadMoreMessage] = useState(false);
  const [readMessage, setReadMessage] = useState();

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
      name: t("text.getPromotionalContactus.title"),
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

  const getPromotionalContactus = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
      };
      const res = await ContactedUsServices.getPromotionalContactusService({
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
    getPromotionalContactus();
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

  const showMoreSubject = (data) => {
    setShowReadMoreSubject(true);
    setReadSubject(data.data);
  };

  const onCloseModalSubject = () => {
    setShowReadMoreSubject(false);
    setReadSubject("");
  };

  const showMoreMessage = (data) => {
    setShowReadMoreMessage(true);
    setReadMessage(data.data);
  };

  const onCloseModalMessage = () => {
    setShowReadMoreMessage(false);
    setReadMessage("");
  };

  const columns = [
    {
      dataField: "firstName",
      text: t("text.getPromotionalContactus.name"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        textFormatter(`${row?.firstName} ${row?.lastName}`),
    },
    {
      dataField: "email",
      text: t("text.getPromotionalContactus.email"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => checkValidData(cell),
    },
    {
      dataField: "phoneNumber",
      text: t("text.getPromotionalContactus.contactNumber"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => checkValidData(cell),
    },
    {
      dataField: "subject",
      text: t("text.getPromotionalContactus.subject"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        readMoreTextShow(checkValidData(cell), showMoreSubject),
    },
    {
      dataField: "message",
      text: t("text.getPromotionalContactus.message"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        readMoreTextShow(checkValidData(cell), showMoreMessage),
    },
    {
      dataField: "companyUrl",
      text: t("text.getPromotionalContactus.companyUrl"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => showLinkFormatter(row?.companyUrl),
    },
    {
      dataField: "createdAt",
      text: t("text.getPromotionalContactus.dateTime"),
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

  return (
    <>
      <MetaTags title={t("text.getPromotionalContactus.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.getPromotionalContactus.title")}>
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
        tableData={state}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerPage}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.enquiry")}
      />
      <ModalComponent
        show={showReadMoreSubject}
        onHandleCancel={onCloseModalSubject}
        title={t("text.getPromotionalContactus.subject")}
      >
        <p className="text-break">{readSubject}</p>
      </ModalComponent>
      <ModalComponent
        show={showReadMoreMessage}
        onHandleCancel={onCloseModalMessage}
        title={t("text.getPromotionalContactus.message")}
      >
        <p className="text-break">{readMessage}</p>
      </ModalComponent>
    </>
  );
}

export default GetPromotionalContactUs;
