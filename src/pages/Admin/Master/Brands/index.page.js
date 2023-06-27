import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { EditCommission } from "../..";

import {
  Breadcrumb,
  checkValidCount,
  checkValidData,
  commissionFormatter,
  DataTable,
  logoFormatter,
  MetaTags,
  ModalComponent,
  PageHeader,
} from "../../../../components";
import routesMap from "../../../../routeControl/adminRoutes";
import { BrandsServices } from "../../../../services";

import {
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
} from "../../../../utils";

function Brands({ t }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [state, setState] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [showCommission, setShowCommission] = useState(false);
  const [value, setValue] = useState(false);
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

  const changeCommision = (data) => {
    setShowCommission(true);
    setValue(data.data);
  };

  const onCloseModal = () => {
    setShowCommission(false);
  };

  const getBrandsData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
      };
      const res = await BrandsServices.getBrandsService({ queryParams });
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
    getBrandsData();
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
      dataField: "brandImageUrl",
      text: t("text.brands.logo"),
      formatter: (cell, row) =>
        logoFormatter(row?.brandImageUrl, t("text.brands.brandImageLogo")),
      sort: false,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "name",
      text: t("text.brands.name"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.name),
    },
    {
      dataField: "storeName",
      text: t("text.brands.store"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.storeName),
    },
    {
      dataField: "totalProduct",
      text: t("text.brands.product"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidCount(row?.totalProduct),
    },
    {
      dataField: "commission",
      text: t("text.brands.commission"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => commissionFormatter(row, changeCommision),
    },
  ];
  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.brands.brands"),
    },
  ];
  return (
    <div>
      <MetaTags title={t("text.brands.brands")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.brands.brands")}>
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
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.brands")}
      />
      <ModalComponent
        show={showCommission}
        onHandleCancel={() => {
          onCloseModal();
        }}
        title={t("text.brands.commissionTitle")}
      >
        <EditCommission
          value={value}
          onCloseModal={onCloseModal}
          getBrandsData={getBrandsData}
        />
      </ModalComponent>
    </div>
  );
}

export default withTranslation()(Brands);
