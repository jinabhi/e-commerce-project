import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  DataTable,
  ListingHeader,
  MetaTags,
  PageHeader,
  SweetAlert,
  actionFormatter,
  nameImageFormatter,
  statusFormatter,
  ManageCustomerFilter,
  phoneNumberFormatter,
  textFormatter,
} from "../../../../../components";
import { classicDateFormat, timeFormatA } from "../../../../../helpers";
import routesMap from "../../../../../routeControl/adminRoutes";
import { ManageCustomerServices } from "../../../../../services";
import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
} from "../../../../../utils";

function ManageCustomers() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [param, setParam] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [visible, setVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [searchName, setSearchName] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [noOfPage, setNoOfPage] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [filterData, setFilterData] = useState({});

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

  const tableReset = () => {
    setTableLoader(true);
    setCustomerData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const getCustomerList = async () => {
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
      const res = await ManageCustomerServices.manageCustomer({ queryParams });
      const { success, data } = res;
      if (success) {
        setCustomerData(data.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getCustomerList();
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

  const onConfirmAlert = async () => {
    try {
      setLoading(true);
      let bodyData = { status };
      const res = await ManageCustomerServices.customerStatusUpdate(
        customerId,
        bodyData
      );
      const { success, message } = res;
      if (success) {
        setIsAlertVisible(false);
        setStatus("");
        setCustomerId(0);
        getCustomerList();
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

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.view"),
        icon: "icon ni ni-eye",
        path: `${routesMap.CUSTOMER_DETAILS.path}/${row?.id}`,
        action: "redirect",
      },
    ];
    if (row.status === "active") {
      optionsArr.push({
        name: t("text.common.deactivate"),
        icon: "icon ni ni-cross-circle",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setStatus("inactive");
          setCustomerId(row.id);
          setCustomerName(row?.firstName);
        },
      });
    }
    if (row.status === "inactive") {
      optionsArr.push({
        name: t("text.common.activate"),
        icon: "icon ni ni-check-circle",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setStatus("active");
          setCustomerId(row.id);
          setCustomerName(row?.firstName);
        },
      });
    }

    return optionsArr;
  };

  const columns = [
    {
      dataField: "name",
      text: `${t("text.manageCustomers.customerInfo")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },

      formatter: (cell, row) =>
        nameImageFormatter(
          row?.firstName &&
            `${textFormatter(row?.firstName)} ${textFormatter(row?.lastName)}`,
          row?.profilePictureUrl,
          `${routesMap.CUSTOMER_DETAILS.path}/${row?.id}`,
          textFormatter(row?.email)
        ),
    },
    {
      dataField: "phoneNumber",
      text: `${t("text.manageCustomers.mobileNumber")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: phoneNumberFormatter,
    },
    {
      dataField: "lastLoginDate",
      text: `${t("text.manageCustomers.lastLogin")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        cell
          ? dateFormatter(cell, `${classicDateFormat}, ${timeFormatA}`)
          : "-",
    },
    {
      dataField: "createdAt",
      text: `${t("text.manageCustomers.registeredOn")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        cell
          ? dateFormatter(cell, `${classicDateFormat}, ${timeFormatA}`)
          : "-",
    },
    {
      dataField: "status",
      text: `${t("text.common.status")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: statusFormatter,
    },
    {
      dataField: "action",
      headerClasses: "text-right nosort sorting_disabled",
      text: `${t("text.common.action")}`,
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
      name: t("text.manageCustomers.title"),
    },
  ];
  const handleFilterSubmit = (val) => {
    setFilterData(val);
    tableReset();
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
    setVisible(false);
  };
  const handleResetFiled = () => {
    setFilterData({});
    tableReset();
    setVisible(false);
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  };

  const arrayOfData = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "active",
      name: "Active",
    },
    {
      id: "inactive",
      name: "Inactive",
    },
  ];

  return (
    <>
      <MetaTags title={t("text.manageCustomers.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageCustomers.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["filter"]}
            popover={
              <ManageCustomerFilter
                onSubmit={handleFilterSubmit}
                onReset={handleResetFiled}
                arrayOfData={arrayOfData}
                filterData={filterData}
              />
            }
            setVisible={setVisible}
            visible={visible}
          />
        </div>
      </div>
      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={customerData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.manageCustomers")}
      />
      <SweetAlert
        title={t("text.staff.sure")}
        text={
          status === "active"
            ? `${t("text.common.activateAlertMessage")}${customerName}${"?"}`
            : `${t("text.common.deactivateAlertMessage")}${customerName}${"?"}`
        }
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
    </>
  );
}

export default ManageCustomers;
