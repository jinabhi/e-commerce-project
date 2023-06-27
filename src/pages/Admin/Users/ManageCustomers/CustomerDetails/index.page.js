import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import {
  Breadcrumb,
  checkValidData,
  checkValidDateFormatter,
  DataTable,
  FormContainer,
  GeneralText,
  ImageField,
  linkFormatter,
  MetaTags,
  mobileFormatter,
  ModalComponent,
  PageHeader,
  statusFormatter,
  textFormatter,
} from "../../../../../components";
import {
  classicDataTimeFormate,
  classicDateFormat,
  dateTimeFormatWithMonth,
} from "../../../../../helpers";
import routesMap from "../../../../../routeControl/adminRoutes";
import {
  ManageCustomerServices,
  OrdersServices,
} from "../../../../../services";
import {
  commasFormatter,
  dateFormatter,
  decodeQueryData,
  logger,
  readMoreTextShow,
} from "../../../../../utils";

function CustomerDetails({ t }) {
  const params = useParams();
  const customerId = params?.id;
  const location = useLocation();

  const { search } = location;

  const [basicData, setBasicData] = useState();
  const [tableLoader, setTableLoader] = useState(false);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [param, setParam] = useState({});
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [noOfPage, setNoOfPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [modalTitle, setModalTitle] = useState("");

  const getCustomerDetails = async (id) => {
    try {
      const res = await ManageCustomerServices.customerDetailsServices(id);
      const { data, success } = res;
      if (success) {
        setBasicData(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getOrdersList = async (id) => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        customerId: id,
      };
      const res = await OrdersServices.getOrdersServices({ queryParams });
      const { success, data } = res;
      if (success) {
        setOrderList(data?.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  useEffect(() => {
    if (customerId) {
      getCustomerDetails(parseInt(customerId));
      getOrdersList(customerId);
    }
  }, [customerId, param]);

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
    }
  }, [location]);

  const showMoreText = (data, text) => {
    setShowReadMore(true);
    setReadData(data);
    setModalTitle(text);
  };

  const onCloseModal = () => {
    setShowReadMore(false);
    setReadData("");
    setModalTitle("");
  };

  const tableReset = () => {
    setTableLoader(true);
    setOrderList([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const columns = [
    {
      dataField: "orderId",
      text: t("text.manageCustomers.orderId"),
      formatter: (cell, row) =>
        linkFormatter(
          row?.orderId,
          `${routesMap.ACTIVE_ORDER_Details.path}/${row?.id}`
        ),
    },
    {
      dataField: "createdAt",
      text: t("text.manageCustomers.dateAndTime"),
      formatter: (cell) => dateFormatter(cell, dateTimeFormatWithMonth),
    },
    {
      dataField: "productsName",
      text: t("text.manageCustomers.productsName"),
      formatter: (cell, row) =>
        readMoreTextShow(
          commasFormatter(
            row?.orderDetails?.map((item) => item?.Product?.productName)
          ),
          () =>
            showMoreText(
              commasFormatter(
                row?.orderDetails?.map((item) => item?.Product?.productName)
              ),
              t("text.manageCustomers.productsName")
            )
        ),
    },
    {
      dataField: "quantity",
      text: t("text.manageCustomers.quantity"),
      formatter: (cell, row) =>
        linkFormatter(
          row?.orderDetails?.length,
          `${routesMap.ACTIVE_ORDER_Details.path}/${row?.id}`
        ),
      classes: "text-center",
    },
    {
      dataField: "orderTotal",
      text: t("text.manageCustomers.orderTotal"),
      formatter: (cell, row) => row?.AmountWithTax,
    },
    {
      dataField: "address",
      text: t("text.manageCustomers.address"),
      formatter: (cell, row) =>
        readMoreTextShow(
          checkValidData(`${row?.Address?.address} ${row?.Address?.landmark} `),
          () =>
            showMoreText(
              checkValidData(
                `${row?.Address?.address} ${row?.Address?.landmark} `
              ),
              t("text.manageCustomers.address")
            )
        ),
    },
    {
      dataField: "status",
      text: t("text.manageCustomers.orderStatus"),
      formatter: (cell, row) => statusFormatter(row?.status),
    },
  ];
  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.common.dashboard"),
    },

    {
      path: "#",
      name: t("text.manageCustomers.manageCustomer"),
    },
    {
      path: "#",
      name: t("text.manageCustomers.details"),
    },
  ];
  return (
    <div>
      <MetaTags title={t("text.manageCustomers.details")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.manageCustomers.details")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <FormContainer>
        <ImageField
          title={t("text.manageCustomers.personalInfo")}
          imagePath={`${basicData?.profilePictureUrl}`}
        />
        <div className="row mb-5">
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.manageCustomers.fullName")}
            value={`${textFormatter(basicData?.firstName)} ${textFormatter(
              basicData?.lastName
            )}`}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.manageCustomers.mobile")}
            value={mobileFormatter(
              basicData?.phoneNumberCountryCode,
              basicData?.phoneNumber
            )}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.manageCustomers.email")}
            value={checkValidData(basicData?.email)}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.manageCustomers.registerOn")}
            value={checkValidDateFormatter(
              basicData?.createdAt,
              dateFormatter(basicData?.createdAt, classicDateFormat)
            )}
          />
          <GeneralText
            extraClassName="col-sm-4 col-xxl-3"
            label={t("text.manageCustomers.lastLogin")}
            value={checkValidDateFormatter(
              basicData?.lastLoginDate,
              dateFormatter(basicData?.lastLoginDate, classicDataTimeFormate)
            )}
          />
        </div>

        <div className="row">
          <div className="col-12">
            <h5 className="title mb-3">{t("text.manageCustomers.history")}</h5>
          </div>
          <div className="col-12">
            <div className="common-table table-responsive">
              <DataTable
                hasLimit
                noOfPage={noOfPage}
                header={false}
                sizePerPage={sizePerPage}
                page={page}
                count={totalCount}
                tableData={orderList}
                tableColumns={columns}
                param={param}
                setSizePerPage={setSizePerPage}
                tableLoader={tableLoader}
                tableReset={tableReset}
                bordered
              />
            </div>
          </div>
        </div>

        <ModalComponent
          show={showReadMore}
          onHandleCancel={onCloseModal}
          title={modalTitle}
        >
          <p>{readData}</p>
        </ModalComponent>
      </FormContainer>
    </div>
  );
}

export default withTranslation()(CustomerDetails);
