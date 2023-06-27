import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  actionFormatter,
  Breadcrumb,
  checkValidData,
  currencyFormatter,
  DataTable,
  imageFormatter,
  MetaTags,
  ModalComponent,
  nameFormatter,
  PageHeader,
  statusFormatter,
} from "../../../../../components";
import { dateTimeFormatWithMonth } from "../../../../../helpers";
import { selectUserData } from "../../../../../redux/AuthSlice/index.slice";
import moduleRoutesMap from "../../../../../routeControl";
import { ProductRequestServices } from "../../../../../services";
import {
  commasFormatter,
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../../utils";
import RejectForm from "../RejectForm/index.page";

function ProductRequest({ t }) {
  const location = useLocation();
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [tableLoader, setTableLoader] = useState(false);
  const [show, setShow] = useState(false);
  // const [status, setStatus] = useState("");
  const [noOfPage, setNoOfPage] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [productData, setProductData] = useState([]);
  const [requestId, setRequestId] = useState();
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [modalTitle, setModalTitle] = useState("");

  const getProductRequestData = async () => {
    try {
      setTableLoader(true);
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
      };
      const res = await ProductRequestServices.getProductRequestService({
        queryParams,
      });
      const { success, data } = res;

      if (success) {
        setProductData(data.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    getProductRequestData();
  }, [param, sizePerPage]);

  const onHandleShow = (data) => {
    setShow(!show);
    setRequestId(data?.id);
  };

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

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
  };

  async function approveProductRequest(id) {
    try {
      const res = await ProductRequestServices.approveRequestService(id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        getProductRequestData();
      }
    } catch (error) {
      logger(error);
    }
  }

  const onApprove = (data) => {
    approveProductRequest(data?.id);
  };

  const options = (row) => {
    const optionsArr = [];
    if (row.status === "pending") {
      optionsArr.push(
        {
          name: t("text.common.approve"),
          icon: "icon ni ni-check-circle",
          action: "confirm",
          onClickHandle: () => onApprove(row),
        },
        {
          name: t("text.common.reject"),
          icon: "icon ni ni-cross-circle",
          action: "confirm",
          onClickHandle: () => onHandleShow(row),
        }
      );
    }
    return optionsArr;
  };

  const tableReset = () => {
    setTableLoader(true);
    setProductData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const showMoreText = (data, text) => {
    setShowReadMore(true);
    setReadData(data);
    setModalTitle(text);
  };

  const onCloseDescriptionModal = () => {
    setShowReadMore(false);
    setReadData("");
    setModalTitle("");
  };
  const columns = [
    {
      dataField: "createdAt",
      text: t("text.productRequest.request"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => dateFormatter(cell, dateTimeFormatWithMonth),
    },
    {
      dataField: "sellerName",
      text: t("text.productRequest.seller"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        nameFormatter(
          row?.Brand?.sellerDetails?.firstName,
          row?.Brand?.sellerDetails?.lastName
        ),
    },
    {
      dataField: "storeName",
      text: t("text.productRequest.store"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.Brand?.storeName),
    },
    {
      dataField: "productName",
      text: t("text.productRequest.productName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        readMoreTextShow(cell, () =>
          showMoreText(row?.productName, t("text.productRequest.productName"))
        ),
    },
    {
      dataField: "productImage",
      text: t("text.productRequest.image"),
      sort: false,
      formatter: (cell, row) =>
        imageFormatter(
          row?.productImage[0]?.productImageUrl,
          t("text.productRequest.image")
        ),
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "brandName",
      text: t("text.productRequest.brandName"),
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
      text: t("text.productRequest.category"),
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
      text: t("text.productRequest.variant"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
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
                    row?.sellerProductVariantDetails.map(
                      (item) => item?.ProductVariantAttribute?.attributeNames
                    )
                  ),
                  t("text.productRequest.variant")
                )
            ),
    },
    {
      dataField: "price",
      text: t("text.productRequest.price"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => currencyFormatter(row?.price, "USD"),
    },
    {
      dataField: "action",
      text: t("text.product.action"),
      classes: "text-right",
      headerClasses: "text-right nosort sorting_disabled",
      formatter: (cell, row) => {
        return (
          <>
            {row?.status === "rejected"
              ? statusFormatter(row?.status)
              : actionFormatter(options(row))}
          </>
        );
      },
    },
  ];

  const breadcrumb = [
    {
      path: "#",
      name: t("text.productRequest.manageInventory"),
    },
    {
      path: "#",
      name: t("text.productRequest.productRequest"),
    },
  ];

  if (userData.userRole === "admin") {
    breadcrumb.unshift({
      path: moduleRoutesMap[userData?.userRole].DASHBOARD.path,
      name: t("text.common.dashboard"),
    });
  }

  return (
    <div>
      <MetaTags title={t("text.productRequest.productRequest")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.productRequest.productRequest")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <DataTable
        hasLimit
        sizePerPage={sizePerPage}
        noOfPage={noOfPage}
        page={page}
        count={totalCount}
        tableData={productData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        tableReset={tableReset}
        tableLoader={tableLoader}
        setSizePerPage={setSizePerView}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.productRequests")}
      />

      <ModalComponent
        extraClassName="modal-md"
        show={show}
        onHandleCancel={() => {
          setShow(false);
        }}
        title={t("text.common.rejectionReason")}
      >
        <RejectForm
          onHandleHide={() => {
            setShow(false);
          }}
          requestId={requestId}
          getProductRequestData={getProductRequestData}
          tableReset={tableReset}
        />
      </ModalComponent>
      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseDescriptionModal}
        title={modalTitle}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </div>
  );
}
export default withTranslation()(ProductRequest);
