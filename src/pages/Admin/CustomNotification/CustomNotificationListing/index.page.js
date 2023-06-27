import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AddCustomNotification } from "../..";
import {
  actionFormatter,
  Breadcrumb,
  CustomNotificationFilter,
  DataTable,
  ListingHeader,
  MetaTags,
  ModalComponent,
  PageHeader,
  SweetAlert,
  textFormatter,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/adminRoutes";
import { CustomNotificationServices } from "../../../../services";
import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../utils";

function CustomNotification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;
  const [show, setShow] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readData, setReadData] = useState();
  const [searchName, setSearchName] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [notificationId, setNotificationId] = useState();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);

  const [state, setState] = useState([]);
  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name);
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

  const getCustomNotification = async () => {
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
      const res = await CustomNotificationServices.getCustomNotificationService(
        { queryParams }
      );
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
    getCustomNotification();
  }, [param]);

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

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };

  const onCloseDescriptionModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  const onShowModal = () => {
    setShow(true);
  };

  const onHideModal = () => {
    setShow(false);
  };

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

  // const onReadDataShow = () => {
  //   setRead(!read);
  // };
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
      const res =
        await CustomNotificationServices.deleteCustomNotificationService(
          notificationId
        );
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        tableReset();
        getCustomNotification();
        setLoading(true);
        setIsAlertVisible(false);
        return true;
      }
    } catch (error) {
      logger(error);
    }
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
          setNotificationId(row.id);
        },
      },
    ];

    return optionsArr;
  };
  const columns = [
    {
      dataField: "createdAt",
      text: t("text.customNotification.dateTime"),
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
      text: t("text.customNotification.userType"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => textFormatter(cell),
    },
    {
      dataField: "title",
      text: t("text.customNotification.title"),
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
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.dashboard.name"),
    },
    {
      path: "#",
      name: t("text.customNotification.pageTitle"),
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
    <div>
      <MetaTags title={t("text.customNotification.pageTitle")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.customNotification.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            onHandleShow={onShowModal}
            btnText={t("text.customNotification.createbtn")}
            btnArray={["create", "filter"]}
            popover={
              <CustomNotificationFilter
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
      <ModalComponent
        show={show}
        title={t("text.customNotification.add")}
        onHandleCancel={() => {
          onHideModal();
        }}
      >
        <AddCustomNotification
          onHandleHide={() => {
            setShow(false);
          }}
          getNotificationData={getCustomNotification}
          tableReset={tableReset}
          arrayOfData={arrayOfData}
        />
      </ModalComponent>

      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseDescriptionModal}
        title={t("text.common.description")}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
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
        searchPlaceholder={t("text.search.customNotification")}
      />
      <SweetAlert
        title={t("text.customNotification.msg")}
        text={t("text.customNotification.confirmMsg")}
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
    </div>
  );
}
export default CustomNotification;
