import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ApproveShippingLogForm,
  Breadcrumb,
  checkValidCount,
  checkValidData,
  checkValidDateFormatter,
  currencyFormatter,
  DataTable,
  linkFormatter,
  MetaTags,
  ModalComponent,
  PageHeader,
  statusFormatter,
  SweetAlert,
} from "../../../../components";
import { dateAndTimeFormateWithSlash } from "../../../../helpers";
import { selectUserData } from "../../../../redux/AuthSlice/index.slice";
import moduleRoutesMap from "../../../../routeControl";
import { ShippingLogServices } from "../../../../services/Admin/ManageInventory/ShippingLog/index.service";
import {
  commasFormatter,
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../utils";

function ShippingLog(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const userData = useSelector(selectUserData);
  const { t } = props;
  const { pathname, search } = location;
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [shippingLogId, setShippingLogId] = useState(0);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [state, setState] = useState([]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [modalTitle, setModalTitle] = useState("");

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

  const getShippingLogData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
        productId,
      };
      const res = await ShippingLogServices.getShippingLogListService({
        queryParams,
      });
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
    getShippingLogData();
  }, [param, productId]);

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

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
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

  const columns = [
    {
      dataField: "id",
      text: t("text.shippingLog.id"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        row?.Product?.id
          ? linkFormatter(
              row?.Product?.productId,
              `${moduleRoutesMap[userData?.userRole].PRODUCT_DETAILS.path}/${
                row?.Product?.id
              }`
            )
          : "-",
    },
    {
      dataField: "productName",
      text: t("text.shippingLog.productName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        readMoreTextShow(row?.Product?.productName, () =>
          showMoreText(
            row?.Product?.productName,
            t("text.shippingLog.productName")
          )
        ),
    },
    {
      dataField: "brandName",
      text: t("text.shippingLog.brandName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.Product?.Brand?.name),
    },
    {
      dataField: "categoryName",
      text: t("text.shippingLog.category"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        checkValidData(row?.Product?.categoryDetails?.name),
    },
    {
      dataField: "variantName",
      text: t("text.shippingLog.variant"),
      // headerClasses: "sorting",
      // sort: true,
      // headerSortingClasses,
      // onSort: (field, order) => {
      //   onSortColumn(field, order);
      // },
      formatter: (cell, row) =>
        readMoreTextShow(
          commasFormatter(
            row?.Product?.sellerProductVariantDetails.map(
              (item) => item?.ProductVariantAttribute?.attributeNames
            )
          ),
          () =>
            showMoreText(
              commasFormatter(
                row?.Product?.sellerProductVariantDetails.map(
                  (item) => item?.ProductVariantAttribute?.attributeNames
                )
              ),
              t("text.shippingLog.variant")
            )
        ),
    },
    {
      dataField: "price",
      text: t("text.shippingLog.price"),
      // headerClasses: "sorting",
      // sort: true,
      // headerSortingClasses,
      // onSort: (field, order) => {
      //   onSortColumn(field, order);
      // },
      formatter: (cell, row) => currencyFormatter(row?.Product?.price, "USD"),
    },
    {
      dataField: "createdAt",
      text: t("text.shippingLog.shippedOn"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateAndTimeFormateWithSlash)
        ),
    },
    {
      dataField: "shippingQuantity",
      text: t("text.shippingLog.shippedQuantity"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => checkValidCount(cell),
    },
    {
      dataField: "deliveryDate",
      text: t("text.shippingLog.deliveredOn"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateAndTimeFormateWithSlash)
        ),
    },
    {
      dataField: "acceptedQuantity",
      text: t("text.shippingLog.acceptedQuantity"),
      // headerClasses: "sorting",
      // sort: true,
      // headerSortingClasses,
      // onSort: (field, order) => {
      //   onSortColumn(field, order);
      // },
      formatter: (cell, row) => checkValidCount(row?.acceptedQuantity),
    },
    {
      dataField: "shippingStatus",
      text: t("text.shippingLog.status"),
      formatter: (cell, row) => {
        let data = statusFormatter(cell);
        if (cell === "shipped") {
          return (
            <>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShow(true);
                  setShippingLogId(row?.id);
                }}
              >
                {data}
              </Link>
            </>
          );
        } else {
          return data;
        }
      },
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
    },
    {
      dataField: "shippingCarrier",
      text: t("text.shippingLog.shippingCarrier"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => {
        if (row.isShippingType) {
          return "Shipped Manually";
        } else {
          return checkValidData(cell);
        }
      },
    },
    {
      dataField: "trackingId",
      text: t("text.shippingLog.trackingId"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: checkValidData,
    },
  ];

  const breadcrumb = [
    {
      path: "#",
      name: t("text.shippingLog.mangaeInventoryName"),
    },
    {
      path: "#",
      name: t("text.shippingLog.pageTitle"),
    },
  ];
  if (userData.userRole === "admin") {
    breadcrumb.unshift({
      path: moduleRoutesMap[userData?.userRole].DASHBOARD.path,
      name: t("text.dashboard.name"),
    });
  }

  const onFormSubmit = async (val) => {
    setFormLoader(true);
    try {
      let bodyData = { ...val };
      const res = await ShippingLogServices.updateShippingLogStatusService(
        shippingLogId,
        bodyData
      );
      const { success } = res;
      if (success) {
        setShow(false);
        setIsAlertVisible(true);
        tableReset();
        getShippingLogData();
      }
    } catch (error) {
      logger(error);
    }
    setFormLoader(false);
  };

  return (
    <div>
      <MetaTags title={t("text.shippingLog.pageTitle")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.shippingLog.pageTitle")}>
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
        setSizePerPage={setSizePerPage}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.shippingLog")}
      />
      <ModalComponent
        extraClassName="modal-md"
        show={show}
        onHandleCancel={() => {
          setShow(false);
        }}
        title={t("text.shippingLog.acceptedQuantityFull")}
      >
        <ApproveShippingLogForm onSubmit={onFormSubmit} loading={formLoader} />
      </ModalComponent>
      <SweetAlert
        title={t("text.shippingLog.deliveredSuccessfully")}
        show={isAlertVisible}
        icon="success"
        showConfirmButton={false}
        timer={1500}
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
export default withTranslation()(ShippingLog);
