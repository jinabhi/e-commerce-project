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
} from "../../../../../components";
import routesMap from "../../../../../routeControl/adminRoutes";
import { FAQsServices } from "../../../../../services";
import {
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  stringToHTML,
} from "../../../../../utils";
import AddEditFAQs from "../AddEditFAQs/index.page";

function ManageCms() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState();
  const [faqData, setFaqData] = useState(false);
  const { pathname, search } = location;
  const [sizePerPage, setSizePerView] = useState(10);
  const [page, setPage] = useState(1);
  const [param, setParam] = useState({});
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [FAQsList, setFAQsList] = useState([]);
  const [tableLoader, setTableLoader] = useState(false);
  const [noOfPage, setNoOfPage] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [faqsId, setFAQsId] = useState();

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name)
      if (data?.sortType) {
        const sortData = [
          {
            dataField: getSortType(data?.sortType),
            order: data?.sortBy,
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

  const getFAQsData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        type: "all",
        search: searchName,
      };
      const res = await FAQsServices.getFAQsService({ queryParams });
      const { success, data } = res;
      if (success) {
        setFAQsList(data?.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getFAQsData();
  }, [param]);

  const deleteFAQs = async (id) => {
    setLoading(true);
    try {
      const res = await FAQsServices.deleteFAQsService(id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setLoading(false);
        getFAQsData();
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const tableReset = () => {
    setTableLoader(true);
    setFAQsList([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

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

  const onHandleShow = (data) => {
    setShow(true);
    setRowData(data);
  };

  const onHideModal = () => {
    setShow(false);
  };

  const onHandleView = (data) => {
    setFaqData(true);
    setRowData(data);
  };

  const onHideView = () => {
    setFaqData(false);
  };

  const onConfirmAlert = () => {
    setLoading(false);
    deleteFAQs(faqsId);
    setIsAlertVisible(false);
    return true;
  };
  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.view"),
        icon: "icon ni ni-eye",
        action: "confirm",
        onClickHandle: () => onHandleView(row),
      },
      {
        name: t("text.common.edit"),
        icon: "icon ni ni-edit",
        action: "confirm",
        onClickHandle: () => onHandleShow(row),
      },
      {
        name: t("text.common.delete"),
        icon: "icon ni ni-trash",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setFAQsId(row.id);
        },
      },
    ];

    return optionsArr;
  };

  const columns = [
    {
      dataField: "question",
      text: t("text.faqs.question"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "type",
      text: t("text.faqs.typeOfFaq"),
      headerClasses: "sorting_desc",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      style: {
        textTransform: "capitalize",
      },
    },
    {
      dataField: "Action",
      text: t("text.common.action"),
      headerClasses: "text-right no-sort",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: routesMap.MANAGE_CMS.path,
      name: t("text.manageCms.pageTitle"),
    },
    {
      path: "#",
      name: t("text.faqs.pathName"),
    },
  ];

  return (
    <>
      <MetaTags title={t("text.faqs.pathName")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.faqs.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnText={t("text.faqs.createbtn")}
            onHandleShow={(e) => {
              e.preventDefault();
              onHandleShow();
            }}
            btnArray={["create"]}
          />
        </div>
      </div>

      <ModalComponent
        show={show}
        title={rowData?.id ? t("text.faqs.editTitle") : t("text.faqs.addTitle")}
        onHandleShow={onHandleShow}
        onHandleCancel={() => {
          onHideModal();
        }}
      >
        <AddEditFAQs
          onHandleCancel={() => {
            onHideModal(false);
          }}
          rowData={rowData}
          getFAQsData={getFAQsData}
        />
      </ModalComponent>

      <ModalComponent
        title={t("text.faqs.pathName")}
        onHandleShow={(e) => {
          e.preventDefault();
          onHandleView();
        }}
        show={faqData}
        onHandleCancel={() => {
          onHideView();
        }}
      >
        <div className="faqView">
          <h6 className="title mb-3">{rowData?.question}</h6>
          <p>
            <strong>{t("text.faqs.typeOfFaq")} :</strong>
            <span className="badge badge-dim badge-primary text-capitalize">
              {rowData?.type}
            </span>
          </p>
          <p>{stringToHTML(String(rowData?.answer))}</p>
        </div>
      </ModalComponent>

      <SweetAlert
        title={t("text.faqs.massage")}
        text={t("text.faqs.text")}
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
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={FAQsList}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        tableLoader={tableLoader}
        setSizePerPage={setSizePerView}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.FAQs")}
      />
    </>
  );
}

export default ManageCms;
