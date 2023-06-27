import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  categoryFormatter,
  DataTable,
  ListingHeader,
  MetaTags,
  ModalComponent,
  PageHeader,
  statusFormatter,
  DiscountOfferFilter,
  checkValidData,
  DiscountProductList,
  textFormatter,
} from "../../../../components";
import { dateFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/adminRoutes";
import {
  CategoryServices,
  ChildCategoryServices,
  commonServices,
  DiscountServices,
  SubCategoryServices,
} from "../../../../services";
import {
  decodeQueryData,
  getSortType,
  logger,
  momentUtcFormatter,
  navigateWithParam,
} from "../../../../utils";

function DiscountOffer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname, search } = location;
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [show, setShowModal] = useState(false);
  const [productListData, setProductListData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [discountData, setDiscountData] = useState([]);
  const [noOfPage, setNoOfPage] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [filterData, setFilterData] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [sellerName, setSellerName] = useState([]);
  const [categoryId, setCategoryid] = useState();
  const [subCategoryId, setSubCategoryid] = useState();
  const [childCategoryLoading, setChildCategoryLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      if (data?.sortType) {
        const sortData = [
          {
            dataField: data?.sortBy,
            order: getSortType(data?.sortType),
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
    setDiscountData([]);
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

  const getCategories = async () => {
    setCategoryLoading(true);
    try {
      let queryParams = { scope: "activeCategory" };
      let res = await CategoryServices.getCategoryService({ queryParams });

      if (res.success) {
        setCategories([...res.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
    setCategoryLoading(false);
  };

  async function getSubCategory(id) {
    setSubCategoryLoading(true);
    try {
      let queryParams = { scope: "activeSubCategory", categoryId: id };

      let res = await SubCategoryServices.getSubCategoryService({
        queryParams,
      });
      if (res.success) {
        setSubCategory([...res.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
    setSubCategoryLoading(false);
  }

  const getChildCategory = async (subCategoresId, categoriesId) => {
    setChildCategoryLoading(true);
    try {
      let queryParams = {
        scope: "activeChildCategory",
        subCategoryId: subCategoresId,
        categoryId: categoriesId,
      };
      let res = await ChildCategoryServices.getChildCategoryService({
        queryParams,
      });
      let { success } = res;
      if (success) {
        setChildCategory([...res.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
    setChildCategoryLoading(false);
  };

  const getSellerName = async () => {
    try {
      let queryParams = { scope: "activeUser" };
      let res = await commonServices.adminAndSeller({ queryParams });
      let { success } = res;
      if (success) {
        setSellerName([...res.data.rows]);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getDiscountData = async () => {
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
      const res = await DiscountServices.getDiscountService({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setDiscountData(data.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
        setTableLoader(false);
      }
    } catch (error) {
      logger(error);
      setTableLoader(false);
    }
  };

  const onSelectCategory = async (setFieldValue, e) => {
    try {
      setFieldValue("subCategoryId", undefined);
      setFieldValue("childCategoryId", undefined);
      setCategoryid(e);
      setSubCategoryLoading(false);
      setChildCategoryLoading(false);
    } catch (error) {
      logger(error);
    }
  };

  const onSelectSubCategory = async (setFieldValue, e) => {
    try {
      setFieldValue("childCategoryId", undefined);
      setSubCategoryid(e);
      setSubCategoryLoading(false);
      setChildCategoryLoading(false);
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getDiscountData();
  }, [param]);

  useEffect(() => {
    if (categoryId) {
      getSubCategory(categoryId);
      getChildCategory(categoryId);
    } else {
      getCategories();
      getSubCategory();
      getChildCategory();
      getSellerName();
    }
  }, [categoryId]);

  useEffect(() => {
    if (subCategoryId) {
      getChildCategory(subCategoryId);
    } else {
      getChildCategory();
    }
  }, [subCategoryId]);

  const showModal = (data) => {
    setShowModal(true);
    setProductListData(data?.data);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const columns = [
    {
      dataField: "name",
      text: `${t("text.discountOffers.sellerName")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        `${textFormatter(row?.sellerDetails?.firstName)} ${textFormatter(
          row?.sellerDetails?.lastName
        )}`,
    },
    {
      dataField: "discountPercent",
      text: `${t("text.discountOffers.discount")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "categoryName",
      text: `${t("text.discountOffers.category")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.categoryDetails?.name),
    },
    {
      dataField: "subCategoryName",
      text: `${t("text.discountOffers.SubCategoryName")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.subCategoryDetails?.name),
    },
    {
      dataField: "childCategoryName",
      text: `${t("text.discountOffers.childCategory")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.childCategoryDetails?.name),
    },
    {
      dataField: "totalProduct",
      text: `${t("text.discountOffers.noOfProduct")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        categoryFormatter(row?.productDiscountDetails, showModal),
    },
    {
      dataField: "startDate",
      text: `${t("text.discountOffers.startDate")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => momentUtcFormatter(cell, dateFormatWithMonth),
    },
    {
      dataField: "endDate",
      text: `${t("text.discountOffers.endDate")}`,
      headerClasses: " sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => momentUtcFormatter(cell, dateFormatWithMonth),
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
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: `${t("text.common.dashboard")}`,
    },
    {
      path: "#",
      name: `${t("text.discountOffers.title")}`,
    },
  ];

  const onSubmitData = (val) => {
    setFilterData(val);
    tableReset();
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
    setVisible(false);
    setLoading(false);
  };

  const onReset = () => {
    setFilterData({});
    tableReset();
    setVisible(false);
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  };

  return (
    <>
      <MetaTags title={t("text.discountOffers.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.discountOffers.discountHeading")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            heading={t("text.child.childCategories")}
            btnArray={["filter"]}
            popover={
              <DiscountOfferFilter
                onSubmit={onSubmitData}
                loading={loading}
                filterData={filterData}
                categories={categories}
                subCategory={subCategory}
                childCategory={childCategory}
                sellerName={sellerName}
                onReset={onReset}
                onSelectCategory={onSelectCategory}
                onSelectSubCategory={onSelectSubCategory}
                childCategoryLoading={childCategoryLoading}
                getCategories={getCategories}
                getSubCategory={getSubCategory}
                getChildCategory={getChildCategory}
                categoryLoading={categoryLoading}
                subCategoryLoading={subCategoryLoading}
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
        tableData={discountData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        tableLoader={tableLoader}
        tableReset={tableReset}
        setSizePerPage={setSizePerView}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.discount")}
      />

      <ModalComponent
        show={show}
        onHandleCancel={onCloseModal}
        title={t("text.discountOffers.product")}
      >
        <DiscountProductList data={productListData} />
      </ModalComponent>
    </>
  );
}
export default DiscountOffer;
