import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  actionFormatter,
  Breadcrumb,
  checkValidCount,
  checkValidData,
  DataTable,
  ListingHeader,
  logoFormatter,
  MetaTags,
  ModalComponent,
  PageHeader,
  statusFormatter,
} from "../../../../components";
import routesMap from "../../../../routeControl/adminRoutes";
import { SubCategoryServices } from "../../../../services";

import {
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
} from "../../../../utils";
import AddEditSubCategory from "./AddEditSubCategory/index.page";

function SubCategories() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [noOfPage, setNoOfPage] = useState();
  const [sizePerPage, setSizePerView] = useState(10);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [tableLoader, setTableLoader] = useState(false);
  const [rowData, setRowData] = useState();
  const [show, setShow] = useState(false);

  async function getSubCategoryData() {
    try {
      setTableLoader(true);
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        name: searchName,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
      };
      const res = await SubCategoryServices.getSubCategoryService({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setSubCategoryData(data.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  }

  useEffect(() => {
    getSubCategoryData();
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

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const tableReset = () => {
    setTableLoader(true);
    setSubCategoryData([]);
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
  const onHandleShow = (data) => {
    setRowData(data);
    setShow(true);
  };

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.edit"),
        icon: "icon ni ni-pen",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => onHandleShow(row),
      },
    ];

    // if (row.totalProduct <= 0) {
    //   optionsArr.push({
    //     name: t("text.common.edit"),
    //     icon: "icon ni ni-pen",
    //     path: "#addForm",
    //     action: "confirm",
    //     onClickHandle: () => onHandleShow(row),
    //   });
    // }
    return optionsArr;
  };

  const columns = [
    {
      dataField: "subCategoryImageUrl",
      text: t("text.subCategories.subCategoriesLogo"),
      sort: false,
      formatter: logoFormatter,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "name",
      text: t("text.subCategories.subCategoryName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.name),
    },
    {
      dataField: "categoryName",
      text: t("text.subCategories.category"),
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.Category?.name),
    },
    {
      dataField: "totalProduct",
      text: t("text.subCategories.noOfProducts"),
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidCount(row?.totalProduct),
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
      classes: "text-right",
      formatter: (cell, row) =>
        row?.totalProduct > 0
          ? statusFormatter("assigned")
          : actionFormatter(options(row)),
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: `${t("text.common.dashboard")}`,
    },
    {
      path: "#",
      name: `${t("text.subCategories.title")}`,
    },
  ];

  return (
    <>
      <MetaTags title={t("text.subCategories.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.subCategories.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnText={t("text.subCategories.add")}
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
        tableData={subCategoryData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.subCategories")}
      />
      <ModalComponent
        onHandleCancel={() => setShow(false)}
        show={show}
        title={
          rowData?.id
            ? t("text.subCategories.update")
            : t("text.subCategories.add")
        }
      >
        <AddEditSubCategory
          onHandleHide={() => {
            setShow(false);
          }}
          getSubCategoryData={getSubCategoryData}
          row={rowData}
          tableReset={tableReset}
        />
      </ModalComponent>
    </>
  );
}

export default SubCategories;
