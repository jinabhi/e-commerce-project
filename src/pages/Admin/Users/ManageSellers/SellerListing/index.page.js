import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  DataTable,
  ListingHeader,
  MetaTags,
  ModalComponent,
  PageHeader,
  SweetAlert,
  actionFormatter,
  nameImageFormatter,
  statusFormatter,
  RejectionForm,
  ManageSellerFilter,
  phoneNumberFormatter,
  checkValidData,
} from "../../../../../components";
import routesMap from "../../../../../routeControl/adminRoutes";
import { commonServices } from "../../../../../services";
import { classicDataTimeFormate } from "../../../../../helpers";
import { ManageSellerServices } from "../../../../../services/Admin/Users/ManageSeller/index.service";
import {
  filterDateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
  modalNotification,
} from "../../../../../utils";

function ManageSellers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [status, setStatus] = useState("active");
  const [show, setShow] = useState(false);
  const [noOfPage, setNoOfPage] = useState();
  const [loading, setLoading] = useState(false);
  const [sellerList, setSellerList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [visible, setVisible] = useState(false);
  const [sizePerPage, setSizePerView] = useState(10);
  const [tableLoader, setTableLoader] = useState(false);
  const [filterData, setFilterData] = useState("");
  const [sellerId, setSellerId] = useState();
  const [sellerName, setSellerName] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [stateLoader, setStateLoader] = useState(false);
  const [cityLoader, setCityLoader] = useState(false);
  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryLoader, setCountryLoader] = useState(false);

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

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const tableReset = () => {
    setTableLoader(true);
    setSellerList([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
    tableReset();
  };

  async function getSellerList() {
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
      const res = await ManageSellerServices.manageSeller({ queryParams });
      const { success, data } = res;
      if (success) {
        setSellerList(data.rows);
        setNoOfPage(data?.count > 0 ? Math.ceil(data?.count / sizePerPage) : 1);
        setTotalCount(data?.count);
        setTableLoader(false);
      }
    } catch (error) {
      logger(error);
    }
  }

  const getCountryList = async () => {
    setCountryLoader(true);
    try {
      let res = await commonServices.countries();
      if (res.success) {
        let country = res.data.map((item) => {
          return { name: item.country, id: item.id };
        });
        setCountries(country);

        setCountryLoader(false);
      }
    } catch (error) {
      logger(error);
      setCountryLoader(false);
    }
  };

  const getStates = async (id) => {
    setStateLoader(true);
    try {
      let queryParams = {
        countryId: id,
      };
      let res = await commonServices.states({ queryParams });
      if (res.success) {
        let stateData = res.data.map((item) => {
          return { name: item.stateName, id: item.id };
        });
        setStates(stateData);
        setStateLoader(false);
      }
    } catch (error) {
      logger(error);
      setStateLoader(false);
    }
  };

  const getCityList = async (id) => {
    setCityLoader(true);
    try {
      let queryParams = {
        stateId: id,
      };
      let res = await commonServices.cities({ queryParams });
      if (res.success) {
        let city = res.data.map((item) => {
          return { name: item.city, id: item.id };
        });
        if (stateId) {
          setCities(city);
          setCityLoader(false);
        }
      }
    } catch (error) {
      logger(error);
      setCityLoader(false);
    }
  };

  useEffect(() => {
    getSellerList();
  }, [param, filterData]);

  const onHandleShow = () => {
    setShow(true);
  };

  const onConfirmAlert = async (Id) => {
    try {
      setLoading(true);
      let bodyData = { status };
      const res = sellerId
        ? await ManageSellerServices.updateSellerStatus(sellerId, bodyData)
        : await ManageSellerServices.updateSellerStatus(Id, bodyData);
      const { success, message } = res;
      if (success) {
        setLoading(false);
        setIsAlertVisible(false);
        setStatus("active");
        setSellerId(0);
        tableReset();
        getSellerList();
        modalNotification({
          type: "success",
          message,
        });
        return true;
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.view"),
        icon: "icon ni ni-eye",
        path: `${routesMap?.SELLER_DETAILS?.path}/${row?.id}`,
        action: "redirect",
      },
    ];
    if (row.status === "pendingApproval") {
      optionsArr.push(
        {
          name: t("text.common.approve"),
          icon: "icon ni ni-check-circle",
          path: "#addForm",
          action: "confirm",
          onClickHandle: () => {
            onConfirmAlert(row?.id);
          },
        },
        {
          name: t("text.common.reject"),
          icon: "icon ni ni-cross-circle",
          path: "#addForm",
          action: "confirm",
          onClickHandle: () => {
            onHandleShow();
            setStatus(row);
          },
        }
      );
    }
    if (row.status === "active") {
      optionsArr.push({
        name: t("text.common.deactivate"),
        icon: "icon ni ni-cross-circle",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setStatus("inactive");
          setSellerId(row?.id);
          setSellerName(row?.firstName);
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
          setSellerId(row?.id);
          setSellerName(row?.firstName);
        },
      });
    }
    return optionsArr;
  };

  const columns = [
    {
      dataField: "name",
      text: `${t("text.manageSellers.sellerInfo")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        nameImageFormatter(
          `${row?.firstName} ${row?.lastName}`,
          row?.profilePictureUrl,
          `${routesMap.SELLER_DETAILS.path}/${row?.id}`,
          row.email
        ),
    },
    {
      dataField: "phoneNumber",
      text: `${t("text.manageSellers.mobileNumber")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: phoneNumberFormatter,
    },
    {
      dataField: "storName",
      text: `${t("text.manageSellers.storeName")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      formatter: (cell, row) =>
        checkValidData(row?.sellerBrandDetail?.storeName),
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "brandName",
      text: `${t("text.manageSellers.brandName")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      formatter: (cell, row) => checkValidData(row?.sellerBrandDetail?.name),
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "country",
      text: `${t("text.manageSellers.country")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      formatter: (cell, row) =>
        checkValidData(row?.userAddressDetails[0]?.Country?.country),

      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "state",
      text: `${t("text.manageSellers.states")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      formatter: (cell, row) =>
        checkValidData(row?.userAddressDetails[0]?.State?.stateName),
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "city",
      text: `${t("text.manageSellers.city")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      formatter: (cell, row) =>
        checkValidData(row?.userAddressDetails[0]?.City?.city),
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },

    {
      dataField: "lastLoginDate",
      text: `${t("text.manageSellers.lastLogin")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,

      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => filterDateFormatter(cell, classicDataTimeFormate),
    },
    {
      dataField: "createdAt",
      text: `${t("text.manageSellers.registeredOn")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,

      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => filterDateFormatter(cell, classicDataTimeFormate),
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
      text: `${t("text.common.action")}`,
      headerClasses: "nk-tb-col-tools text-right nosort sorting_disabled",
      sort: true,
      headerSortingClasses,
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
      name: t("text.manageSellers.manageSellers"),
    },
  ];
  const onRejectSeller = async (values) => {
    let bodyData = {
      message: values.rejectMessage,
    };
    setShow(false);
    try {
      const res = await ManageSellerServices.rejectManageSeller(
        bodyData,
        status?.id
      );
      const { success, message } = res;
      if (success) {
        setStatus("active");
        modalNotification({
          type: "success",
          message,
        });
      }
      tableReset();
      getSellerList();
    } catch (error) {
      logger(error);
    }
  };

  const handleFilterSubmit = (val) => {
    setLoading(true);

    try {
      let dataFilter = { ...val };
      let data = { ...param };
      data.page = 1;
      setFilterData(dataFilter);
      const searchParams = new URLSearchParams(data).toString();
      setParam(searchParams);
      navigate(`${location.pathname}?${searchParams}`);
      setVisible(false);
      tableReset();
      setLoading(false);
    } catch (error) {
      logger(error);
      setLoading(false);
    }
    setVisible(false);
  };
  const onReset = () => {
    setFilterData({});
    tableReset();
  };

  const onSelectCountry = async (setFieldValue, e) => {
    try {
      setFieldValue("stateId", undefined);
      setFieldValue("cityId", undefined);
      setCities([]);
      setCountryId(e);
    } catch (error) {
      logger(error);
    }
  };
  const onSelectState = async (setFieldValue, e) => {
    try {
      setFieldValue("cityId", undefined);
      setStateId(e);
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getCountryList();
  }, []);
  useEffect(() => {
    if (countryId) {
      getStates(countryId);
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      getCityList(stateId);
    }
  }, [stateId]);

  return (
    <>
      <MetaTags title={t("text.manageSellers.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageSellers.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnArray={["filter"]}
            popover={
              <ManageSellerFilter
                onSubmit={handleFilterSubmit}
                loading={loading}
                onReset={onReset}
                filterData={filterData}
                onSelectCountry={onSelectCountry}
                onSelectState={onSelectState}
                statesList={states}
                countryList={countries}
                cityList={cities}
                cityLoader={cityLoader}
                stateLoader={stateLoader}
                countryLoader={countryLoader}
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
        tableData={sellerList}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.manageSellers")}
      />

      <ModalComponent
        extraClassName="modal-md"
        show={show}
        onHandleCancel={() => {
          setShow(false);
        }}
        title={t("text.common.rejectionReason")}
      >
        <RejectionForm onSubmit={onRejectSeller} />
      </ModalComponent>
      <SweetAlert
        title={t("text.common.sure")}
        text={
          status === "active"
            ? `${t("text.common.activateAlertMessage")}${sellerName}${"?"}`
            : `${t("text.common.deactivateAlertMessage")}${sellerName}${"?"}`
        }
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        confirmButtonText={t("text.common.yes")}
        cancelButtonText={t("text.common.no")}
        setIsAlertVisible={setIsAlertVisible}
        showLoaderOnConfirm
        loading={loading}
        onConfirmAlert={onConfirmAlert}
      />
    </>
  );
}

export default ManageSellers;
