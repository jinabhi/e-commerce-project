import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  actionFormatter,
  Breadcrumb,
  checkValidCount,
  checkValidData,
  currencyFormatter,
  DataTable,
  imageFormatter,
  linkFormatter,
  ListingHeader,
  ManageProductFilter,
  MetaTags,
  ModalComponent,
  PageHeader,
  statusFormatter,
  SweetAlert,
} from "../../../../../components";
import { selectUserData } from "../../../../../redux/AuthSlice/index.slice";
import moduleRoutesMap from "../../../../../routeControl";
import { ProductServices } from "../../../../../services";
import {
  commasFormatter,
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../../utils";

function Product(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = props;
  const { pathname, search } = location;
  const userData = useSelector(selectUserData);
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [productData, setProductData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [productId, setProductId] = useState();
  const [filterVisible, setFilterVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [filterData, setFilterData] = useState({});
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [modalTitle, setModalTitle] = useState("");

  const statusPayload = [
    { name: "All", id: "all" },
    { name: "Active", id: "active" },
    { name: "Inactive", id: "inactive" },
  ];

  const productStatusPayload = [
    { name: "All", id: "all" },
    { name: "In Stock", id: "instock" },
    { name: "Low Inventory", id: "lowInventory" },
    { name: "Out of Stock", id: "outofstock" },
  ];

  const onReset = () => {
    setFilterData({});
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  };

  const tableReset = () => {
    setTableLoader(true);
    setProductData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  function onSubmitData(val) {
    setFilterData(val);
    tableReset();
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
    setFilterVisible(false);
  }

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

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

  const getProductList = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
        ...filterData,
      };
      const res = await ProductServices.getProductService({ queryParams });
      const { success, data } = res;
      if (success) {
        setProductData(data?.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getProductList();
  }, [param, filterData]);

  const onConfirmAlert = async () => {
    try {
      setLoading(true);
      let bodyData = { status };
      const res = await ProductServices.updateProductStatus(
        productId,
        bodyData
      );
      const { success, message } = res;
      if (success) {
        setIsAlertVisible(false);
        setStatus("");
        setProductId(0);
        getProductList();
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

  const showMoreText = (data, text) => {
    setShowReadMore(true);
    setReadData(data);
    setModalTitle(text);
  };

  const onCloseVariantModal = () => {
    setShowReadMore(false);
    setReadData("");
    setModalTitle("");
  };

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.view"),
        icon: "icon ni ni-eye",
        path: `${moduleRoutesMap[userData?.userRole].PRODUCT_DETAILS.path}/${
          row.id
        }`,
        action: "redirect",
      },
      {
        name: t("text.common.shippingLog"),
        icon: "icon ni ni-package",
        path: `${
          moduleRoutesMap[userData?.userRole].PRODUCT_DETAILS.path
        }/${"shippingLog"}/${row?.id}`,
        action: "redirect",
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
          setIsAlertVisible(true);
          setStatus(row.status === "inactive" ? "active" : "inactive");
          setProductId(row.id);
          setProductName(row?.productName);
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
  };

  const columns = [
    {
      dataField: "productId",
      text: t("text.product.id"),
      formatter: (cell, row) =>
        linkFormatter(
          cell,
          `${moduleRoutesMap[userData?.userRole].PRODUCT_DETAILS.path}/${
            row?.id
          }`
        ),
    },

    {
      dataField: "productName",
      text: t("text.product.productName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        readMoreTextShow(cell, () =>
          showMoreText(row?.productName, t("text.product.productName"))
        ),
    },
    {
      dataField: "productImage",
      text: t("text.product.image"),
      formatter: (cell) => imageFormatter(cell?.[0]?.productImageUrl),
    },
    {
      dataField: "brandName",
      text: t("text.product.brandName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.Brand?.name),
    },
    {
      dataField: "categoryName",
      text: t("text.product.category"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.categoryDetails?.name),
    },
    {
      dataField: "variantName",
      text: t("text.product.variant"),
      formatter: (cell, row) =>
        row?.sellerProductVariantDetails?.length <= 0
          ? "-"
          : readMoreTextShow(
              commasFormatter(
                row?.sellerProductVariantDetails.map(
                  (item) => item?.ProductVariantAttribute?.attributeNames
                )
              ),
              () =>
                showMoreText(
                  commasFormatter(
                    row?.sellerProductVariantDetails.map((item) =>
                      item?.ProductVariantAttribute?.attributeNames
                        ? item?.ProductVariantAttribute?.attributeNames
                        : "-"
                    )
                  ),
                  t("text.product.variant")
                )
            ),
    },
    {
      dataField: "price",
      text: t("text.product.price"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => currencyFormatter(row?.price, "USD"),
    },
    {
      dataField: "quantity",
      text: t("text.product.availableQty"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn("quantity", order);
      },
      formatter: (cell) => checkValidCount(cell),
    },
    {
      dataField: "productStatus",
      text: t("text.product.productStatus"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn("productStatus", order);
      },
      formatter: (cell) => (cell ? statusFormatter(cell) : "-"),
    },
    {
      dataField: "status",
      text: t("text.product.status"),
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
      text: t("text.product.action"),
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const breadcrumb = [
    {
      path: "#",
      name: t("text.product.manageInventoryName"),
    },
    {
      path: "#",
      name: t("text.product.pageTitle"),
    },
  ];

  if (userData.userRole === "admin") {
    breadcrumb.unshift({
      path: moduleRoutesMap[userData?.userRole].DASHBOARD.path,
      name: t("text.dashboard.name"),
    });
  }

  return (
    <div>
      <MetaTags title={t("text.product.pageTitle")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.product.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnText={t("text.productVariant.createbtn")}
            btnArray={["filter"]}
            setVisible={setFilterVisible}
            visible={filterVisible}
            popover={
              <ManageProductFilter
                onSubmit={onSubmitData}
                onReset={onReset}
                filterData={filterData}
                statusPayload={statusPayload}
                productStatusPayload={productStatusPayload}
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
        tableData={productData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerPage}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.product")}
      />
      <SweetAlert
        title={t("text.common.sure")}
        text={
          status === "active"
            ? `${t("text.product.activate")}${productName}${"?"}`
            : `${t("text.product.deactivate")}${productName}${"?"}`
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
      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseVariantModal}
        title={modalTitle}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </div>
  );
}
export default withTranslation()(Product);
