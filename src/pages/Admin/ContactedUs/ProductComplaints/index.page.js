import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  actionFormatter,
  Breadcrumb,
  checkValidCount,
  CreditUserForm,
  currencyFormatter,
  DataTable,
  imageFormatter,
  MetaTags,
  ModalComponent,
  PageHeader,
  statusFormatter,
  textFormatter,
} from "../../../../components";
import { dateTimeFormatWithMonth } from "../../../../helpers";
import routesMap from "../../../../routeControl/adminRoutes";
import { ContactedUsServices } from "../../../../services/Admin/ContactedUs/index.service";
import {
  dateFormatter,
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../utils";

function ProductComplaints() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { search, pathname } = location;
  const [param, setParam] = useState({});
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [tableLoader, setTableLoader] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [show, setShow] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState({});
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name)
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

  const getProductComplaints = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        search: searchName,
      };
      const res = await ContactedUsServices.getProductComplaintsService({
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
    getProductComplaints();
  }, [param]);

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.productComplaints.title"),
    },
  ];

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const onHandleShow = (row) => {
    setShow(!show);
    setSelectedComplaint(row);
  };

  const options = (row) => {
    const optionsArr = [
      {
        name: t("text.common.view"),
        icon: "icon ni ni-eye",
        path: `${routesMap.PRODUCT_COMPLAINTS_DETAILS.path}/${row.id}`,
        action: "redirect",
        onClickHandle: () => {},
      },
    ];
    if (row.productComplaintStatus === "accepted") {
      optionsArr.push({
        name: t("text.productComplaints.creditUser"),
        icon: "icon ni ni-user-add",
        action: "confirm",
        onClickHandle: () => {
          onHandleShow(row);
        },
      });
    }
    return optionsArr;
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
  };

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data?.data);
  };

  const onCloseProductNameModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  const columns = [
    {
      dataField: "createdAt",
      text: t("text.productComplaints.dateTime"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell) => dateFormatter(cell, dateTimeFormatWithMonth),
    },
    {
      dataField: "userName",
      text: t("text.productComplaints.customerName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        row?.userDetails?.firstName
          ? `${textFormatter(row?.userDetails?.firstName)} ${textFormatter(
              row?.userDetails?.lastName
            )}`
          : "-",
    },
    {
      dataField: "productName",
      text: t("text.productComplaints.productName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        row?.productDetails?.productName
          ? readMoreTextShow(row?.productDetails?.productName, showMoreText)
          : "-",
    },
    {
      dataField: "productImage",
      text: t("text.productComplaints.productImage"),
      formatter: (cell, row) =>
        imageFormatter(row?.damageProductImage?.[0]?.damageImageUrl),
    },
    {
      dataField: "price",
      text: t("text.productComplaints.price"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        currencyFormatter(row?.productDetails?.price, "USD"),
    },
    {
      dataField: "quantity",
      text: t("text.productComplaints.quantity"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidCount(row?.orderQuantity),
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
      formatter: (cell, row) => statusFormatter(row?.productComplaintStatus),
    },
    {
      dataField: "action",
      headerClasses: "nk-tb-col-tools text-right nosort sorting_disabled",
      text: t("text.common.action"),
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const onHandelCanel = () => {
    setShow(false);
    setSelectedComplaint({});
  };

  const onCreditSubmit = async (val) => {
    setFormLoader(true);
    try {
      let bodyData = {
        ...val,
        userId: selectedComplaint.userId,
        productComplainId: selectedComplaint.id,
      };
      const res = await ContactedUsServices.addProductComplaintCreditService(
        bodyData
      );
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        onHandelCanel();
        tableReset();
        getProductComplaints();
      }
    } catch (error) {
      logger(error);
    }
    setFormLoader(false);
  };

  return (
    <>
      <MetaTags title={t("text.productComplaints.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.productComplaints.title")}>
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
        searchPlaceholder={t("text.search.productComplaints")}
      />

      <ModalComponent
        extraClassName="modal-md"
        show={show}
        onHandleCancel={() => {
          onHandelCanel();
        }}
        title={t("text.common.creditPoints")}
      >
        <CreditUserForm onSubmit={onCreditSubmit} loading={formLoader} />
      </ModalComponent>
      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseProductNameModal}
        title={t("text.manageCustomers.product")}
      >
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </>
  );
}

export default ProductComplaints;
