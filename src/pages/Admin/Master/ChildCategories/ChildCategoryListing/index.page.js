import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AddEditChildCategory } from "../../..";
import {
  actionFormatter,
  Breadcrumb,
  checkValidCount,
  checkValidData,
  DataTable,
  imageFormatter,
  ListingHeader,
  MetaTags,
  ModalComponent,
  PageHeader,
  statusFormatter,
  SweetAlert,
} from "../../../../../components";
import routesMap from "../../../../../routeControl/adminRoutes";
import { ChildCategoryServices } from "../../../../../services";
import {
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
} from "../../../../../utils";

function ChildCategories() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const { pathname, search } = location;
  const [childCategoryData, setChildCategoryData] = useState([]);
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState(0);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [categoryId, setCategoryId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);

  async function getChildCategoryData() {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
      };
      const res = await ChildCategoryServices.getChildCategoryService({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setChildCategoryData(data?.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
        setTableLoader(false);
      }
    } catch (error) {
      logger(error);
      setTableLoader(false);
    }
  }
  useEffect(() => {
    getChildCategoryData();
  }, [param]);

  async function deleteChildCategory(id) {
    try {
      const res = await ChildCategoryServices.deleteChildCategoryService(id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        getChildCategoryData();
      }
    } catch (error) {
      logger(error);
    }
  }

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
    setChildCategoryData([]);
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

  const onConfirmAlert = () => {
    deleteChildCategory(categoryId);
    setLoading(true);
    setIsAlertVisible(false);
    return true;
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

    if (row.totalProduct <= 0) {
      optionsArr.push({
        name: t("text.common.delete"),
        icon: "icon ni ni-trash",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setCategoryId(row.id);
          setCategoryName(row?.name);
        },
      });
    }
    return optionsArr;
  };

  const columns = [
    {
      dataField: "childCategoryImageUrl",
      text: t("text.child.image"),
      formatter: (cell, row) =>
        imageFormatter(
          row?.childCategoryImageUrl,
          t("text.child.childCategoryImage")
        ),
      sort: false,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "name",
      text: t("text.child.name"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "subCategoryName",
      text: t("text.child.subCategory"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      formatter: (cell, row) => checkValidData(row?.SubCategory?.name),
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "categoryName",
      text: t("text.child.category"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.Category?.name),
    },
    {
      dataField: "totalProduct",
      text: t("text.child.product"),
      headerClasses: "sorting",
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
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.child.childCategories"),
    },
  ];

  return (
    <div>
      <MetaTags title={t("text.child.childCategories")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.child.childCategories")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            heading={t("text.child.childCategories")}
            btnText={t("text.child.add")}
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
        tableData={childCategoryData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.childCategories")}
      />
      <ModalComponent
        onHandleCancel={() => setShow(false)}
        show={show}
        title={rowData?.id ? t("text.child.update") : t("text.child.add")}
      >
        <AddEditChildCategory
          onHandleHide={() => {
            setShow(false);
          }}
          getChildCategoryData={getChildCategoryData}
          row={rowData}
          tableReset={tableReset}
        />
      </ModalComponent>
      <SweetAlert
        reverseButtons
        title={t("text.child.msg")}
        text={categoryName}
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

export default ChildCategories;
