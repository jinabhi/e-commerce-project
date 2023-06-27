import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AddEditStaff } from "../../..";
import {
  Breadcrumb,
  DataTable,
  ListingHeader,
  MetaTags,
  nameImageFormatter,
  ModalComponent,
  PageHeader,
  statusFormatter,
  actionFormatter,
  SweetAlert,
  phoneNumberFormatter,
  textFormatter,
  checkValidData,
} from "../../../../../components";
import { ManageStaffFilter } from "../../../../../components/Filter/Admin";
import routesMap from "../../../../../routeControl/adminRoutes";
import { ManageStaffServices } from "../../../../../services";
import {
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../../utils";

function ManageStaff({ t }) {
  const [show, setShow] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [tableLoader, setTableLoader] = useState(false);
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState(0);
  const [sizePerPage, setSizePerView] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [staffId, setStaffId] = useState();
  const [searchName, setSearchName] = useState("");
  const [isStatusAlert, setIsStatusAlert] = useState(false);
  const [statusId, setStatusId] = useState(0);
  const [staffName, setStaffName] = useState();
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [status, setStatus] = useState("");
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();

  const tableReset = () => {
    setTableLoader(true);
    setStaffData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  async function getStaffData() {
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
      const res = await ManageStaffServices.getStaffListing({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setStaffData(data?.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  }
  useEffect(() => {
    getStaffData();
  }, [param]);

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

  const onHandleShow = (data) => {
    setShow(true);
    setStaffId(data?.id);
  };
  const onStatusConfirm = async () => {
    try {
      let bodyData = { status };
      const res = await ManageStaffServices.changeStaffStatus(
        bodyData,
        statusId
      );
      const { success, message } = res;
      if (success) {
        setIsStatusAlert(false);
        setStatus("");
        setStaffId(0);
        getStaffData();
        modalNotification({
          type: "success",
          message,
        });
        return true;
      }
    } catch (error) {
      logger(error);
    }
  };

  const onHandleHide = () => {
    setShow(false);
    setStaffId("");
  };

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };

  const onConfirmAlert = () => {
    if (staffId) {
      modalNotification({
        type: "success",
        message: t("text.staff.editStaffProcessDiscard"),
      });
    } else {
      modalNotification({
        type: "success",
        message: t("text.staff.addStaffProcessDiscard"),
      });
    }
    setIsAlertVisible(false);
    setShow(false);
    setLoading(false);
    return true;
  };

  const onHandleCancel = () => {
    setIsAlertVisible(true);
    setStatus("cancel");
  };

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.edit"),
        icon: "icon ni ni-edit",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => {
          onHandleShow(row);
        },
      },
      {
        name:
          row.status === "active"
            ? t("text.common.deactivate")
            : t("text.common.activate"),
        icon:
          row.status === "active"
            ? "icon ni ni-cross-circle"
            : "icon ni ni-check-circle",
        action: "confirm",
        onClickHandle: () => {
          setIsStatusAlert(true);
          setStatus(row.status === "inactive" ? "active" : "inactive");
          setStatusId(row?.id);
          setStaffName(row?.firstName);
        },
      },
    ];

    return optionsArr;
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

  const columns = [
    {
      dataField: "name",
      text: t("text.staff.staffInfo"),
      headerClasses: "sorting",
      sort: true,
      formatter: (cell, row) =>
        nameImageFormatter(
          row.firstName &&
            `${textFormatter(row.firstName)} ${textFormatter(row.lastName)}`,
          row.profilePictureUrl,
          `${routesMap.STAFF_DETAILS.path}/${row.id}`,
          textFormatter(row?.email)
        ),
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "phoneNumber",
      text: t("text.staff.phone"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: phoneNumberFormatter,
    },
    {
      dataField: "address",
      text: t("text.staff.address"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        readMoreTextShow(
          checkValidData(`${row?.userAddressDetails[0]?.address} `),
          showMoreText
        ),
    },
    {
      dataField: "status",
      text: t("text.staff.status"),
      headerClasses: "sorting",
      sort: true,
      formatter: (cell, row) => statusFormatter(row?.status),
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "action",
      text: t("text.staff.action"),
      headerClasses: "nk-tb-col-tools text-right nosort sorting_disabled",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },

    {
      path: "#",
      name: t("text.staff.manageStaff"),
    },
  ];

  const statusPayload = [
    { name: "All", id: "all" },
    { name: "Active", id: "active" },
    { name: "Inactive", id: "inactive" },
  ];

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

  const onCloseModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  return (
    <div>
      <MetaTags title={t("text.staff.manageStaff")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.staff.manageStaff")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            onHandleShow={(e) => {
              e.preventDefault();
              onHandleShow();
            }}
            btnText={t("text.staff.add")}
            btnArray={["filter", "create"]}
            setVisible={setFilterVisible}
            visible={filterVisible}
            popover={
              <ManageStaffFilter
                onSubmit={onSubmitData}
                onReset={onReset}
                statusPayload={statusPayload}
                filterData={filterData}
              />
            }
          />
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={staffData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.manageStaff")}
      />
      <ModalComponent
        extraClassName="modal-lg"
        onHandleVisible={onHandleHide}
        onHandleCancel={onHandleCancel}
        show={show}
        title={staffId ? t("text.staff.edit") : t("text.staff.add")}
      >
        <AddEditStaff
          onHandleShowAlert={onHandleCancel}
          onHandleHide={onHandleHide}
          staffId={staffId}
          getStaffData={getStaffData}
          tableReset={tableReset}
        />
      </ModalComponent>
      <SweetAlert
        title={t("text.staff.sure")}
        text={staffId ? t("text.staff.editStaff") : t("text.staff.discard")}
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        confirmButtonText={t("text.staff.yes")}
        cancelButtonText={t("text.staff.no")}
        setIsAlertVisible={setIsAlertVisible}
        showLoaderOnConfirm
        loading={loading}
        onConfirmAlert={onConfirmAlert}
      />
      <SweetAlert
        title={t("text.staff.sure")}
        text={
          status === "active"
            ? `${t("text.staff.activate")}${staffName} ${"?"}`
            : `${t("text.staff.deactivate")}${staffName} ${"?"}`
        }
        show={isStatusAlert}
        icon="warning"
        showCancelButton
        confirmButtonText={t("text.staff.yes")}
        cancelButtonText={t("text.staff.no")}
        setIsAlertVisible={setIsStatusAlert}
        showLoaderOnConfirm
        loading={loading}
        onConfirmAlert={onStatusConfirm}
      />

      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseModal}
        title={t("text.staff.address")}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </div>
  );
}
export default withTranslation()(ManageStaff);
