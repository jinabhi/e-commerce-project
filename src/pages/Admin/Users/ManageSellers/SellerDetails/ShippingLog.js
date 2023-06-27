import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  ApproveShippingLogForm,
  checkValidCount,
  checkValidData,
  checkValidDateFormatter,
  DataTable,
  ModalComponent,
  statusFormatter,
  SweetAlert,
  // textFormatter,
} from "../../../../../components";
import { dateTimeFormatWithMonth } from "../../../../../helpers";
import { ShippingLogServices } from "../../../../../services/Admin/ManageInventory/ShippingLog/index.service";
import {
  dateFormatter,
  decodeQueryData,
  logger,
  readMoreTextShow,
} from "../../../../../utils";

function ShippingLogs({ sellerId }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { search } = location;
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [state, setState] = useState([]);
  const [shippingLogId, setShippingLogId] = useState(0);
  const [show, setShow] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [param, setParam] = useState({});
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
    }
  }, [location]);

  const getShippingLogData = async (id) => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sellerId: id,
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
    if (sellerId) {
      getShippingLogData(sellerId);
    }
  }, [param, sellerId]);

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
      text: t("text.shippingLog.shippedOn"),
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
        ),
    },
    {
      dataField: "productName",
      text: t("text.manageSellers.productName"),
      formatter: (cell, row) =>
        readMoreTextShow(row?.Product?.productName, showMoreText),
    },
    {
      dataField: "shippingQuantity",
      text: t("text.shippingLog.shippedQuantity"),
      formatter: (cell) => checkValidCount(cell),
    },
    {
      dataField: "deliveryDate",
      text: t("text.shippingLog.deliveredOn"),
      formatter: (cell) =>
        checkValidDateFormatter(
          cell,
          dateFormatter(cell, dateTimeFormatWithMonth)
        ),
    },
    {
      dataField: "acceptedQuantity",
      text: t("text.shippingLog.acceptedQuantity"),
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
    },
    {
      dataField: "shippingCarrier",
      text: t("text.shippingLog.shippingCarrier"),
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
      formatter: checkValidData,
    },
  ];

  const tableReset = () => {
    setTableLoader(true);
    setState([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

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
        setFormLoader(false);
        getShippingLogData(sellerId);
      }
    } catch (error) {
      logger(error);
      setFormLoader(false);
    }
    setFormLoader(false);
  };

  return (
    <>
      <div className="card-inner">
        {/* <div className="tab-content"> */}
        <div className="tab-pane" id="shippingLog">
          <div className="row">
            <div className="col-12">
              <div className="common-table table-responsive">
                <DataTable
                  hasLimit
                  noOfPage={noOfPage}
                  header={false}
                  sizePerPage={sizePerPage}
                  page={page}
                  count={totalCount}
                  tableData={state}
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
        </div>
        <ModalComponent
          extraClassName="modal-md"
          show={show}
          onHandleCancel={() => {
            setShow(false);
          }}
          title={t("text.shippingLog.acceptedQuantityFull")}
        >
          <ApproveShippingLogForm
            onSubmit={onFormSubmit}
            loading={formLoader}
          />
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
          onHandleCancel={onCloseProductNameModal}
          title={t("text.manageCustomers.product")}
        >
          <p className="text-break">{readData}</p>
        </ModalComponent>
      </div>
    </>
  );
}

export default ShippingLogs;
