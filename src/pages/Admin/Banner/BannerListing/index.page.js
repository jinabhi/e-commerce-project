import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AddBanner } from "../..";

import {
  actionFormatter,
  Breadcrumb,
  checkValidData,
  DataTable,
  ListingHeader,
  logoFormatter,
  MetaTags,
  ModalComponent,
  PageHeader,
  statusFormatter,
  SweetAlert,
} from "../../../../components";
import routesMap from "../../../../routeControl/adminRoutes";
import { BannerServices } from "../../../../services";

import {
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
} from "../../../../utils";

function Banner() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;
  const [searchName, setSearchName] = useState("");
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bannerId, setBannerId] = useState(false);
  const [bannerTitle, setBannerTitle] = useState("");

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name ?? "");
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

  const getBannerData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
      };
      const res = await BannerServices.getBannerListService({ queryParams });
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
    getBannerData();
  }, [param]);

  const tableReset = () => {
    setTableLoader(true);
    setState([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const onConfirmAlert = async () => {
    try {
      const res = await BannerServices.deleteBannerService(bannerId);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        tableReset();
        getBannerData();
        setLoading(true);
        setIsAlertVisible(false);
        return true;
      }
    } catch (error) {
      logger(error);
    }
  };

  const bannerStatusUpdate = async (id, status) => {
    try {
      let bannerStatus = "";
      if (status === "active") {
        bannerStatus = "inactive";
      } else {
        bannerStatus = "active";
      }

      let bodyData = { status: bannerStatus };
      const res = await BannerServices.updateBannerStatusService(id, bodyData);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });

        getBannerData();
        return true;
      }
    } catch (error) {
      logger(error);
    }
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const onHandleShow = () => {
    setShow(true);
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

  const options = (row) => {
    const { id, status } = row;
    const optionsArr = [
      {
        name: t("text.common.delete"),
        icon: "icon ni ni-trash",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setBannerId(row?.id);
          setBannerTitle(row?.title);
        },
      },
    ];
    if (status === "active") {
      optionsArr.push({
        name: t("text.common.deactivate"),
        icon: "icon ni ni-cross-circle",
        onClickHandle: () => {
          bannerStatusUpdate(id, status);
        },
        action: "confirm",
      });
    }
    if (status === "inactive") {
      optionsArr.push({
        name: t("text.common.activate"),
        icon: "icon ni ni-check-circle",
        onClickHandle: () => {
          bannerStatusUpdate(id, status);
        },
        action: "confirm",
      });
    }

    return optionsArr;
  };

  const columns = [
    {
      dataField: "bannerImage",
      text: t("text.banner.bannerImage"),
      formatter: (cell, row) =>
        logoFormatter(row?.bannerImageUrl, t("text.banner.bannerImage")),
      sort: false,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "title",
      text: t("text.banner.title"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.title),
    },
    {
      dataField: "description",
      text: t("text.banner.description"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.description),
    },
    {
      dataField: "status",
      text: t("text.banner.status"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: statusFormatter,
    },
    {
      dataField: "action",
      text: t("text.child.action"),
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
      name: t("text.banner.banner"),
    },
  ];
  return (
    <div>
      <MetaTags title={t("text.banner.banner")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.banner.banner")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnText={t("text.banner.add")}
            onHandleShow={(e) => {
              e.preventDefault();
              onHandleShow();
            }}
            btnArray={["create"]}
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
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.banner")}
      />
      <ModalComponent
        onHandleCancel={() => setShow(false)}
        show={show}
        title={t("text.banner.add")}
      >
        <AddBanner
          onHandleHide={() => {
            setShow(false);
          }}
          tableReset={tableReset}
          getBannerData={getBannerData}
        />
      </ModalComponent>
      <SweetAlert
        reverseButtons
        title={t("text.banner.deleteMassage")}
        text={bannerTitle}
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

export default Banner;
