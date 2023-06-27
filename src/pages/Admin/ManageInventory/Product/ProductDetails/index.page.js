import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ApproveShippingLogForm,
  Breadcrumb,
  checkValidCount,
  checkValidData,
  checkValidDateFormatter,
  DataTable,
  FormContainer,
  GeneralText,
  GlobalLoader,
  ImageMapField,
  MetaTags,
  ModalComponent,
  PageHeader,
  RatingReview,
  statusFormatter,
  SweetAlert,
  Tabs,
} from "../../../../../components";
import { dateTimeFormatWithMonth } from "../../../../../helpers";
import { selectUserData } from "../../../../../redux/AuthSlice/index.slice";
import moduleRoutesMap from "../../../../../routeControl";
import { commonServices, ProductServices } from "../../../../../services";
import { ShippingLogServices } from "../../../../../services/Admin/ManageInventory/ShippingLog/index.service";
import {
  dateFormatter,
  decodeQueryData,
  logger,
  stringToHTML,
} from "../../../../../utils";

function CustomerDetails() {
  const { t } = useTranslation();
  const userData = useSelector(selectUserData);
  const params = useParams();
  const { dataKey, productId } = params;
  const [productData, setProductData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [shippingLogId, setShippingLogId] = useState(0);
  const [show, setShow] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewRatingData, setReviewRatingData] = useState([]);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [showLessButton, setShowLessButton] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [ratingCount, setRatingCount] = useState();
  const initialLimit = 3;
  const [limit] = useState(initialLimit);
  const [concatArray, setConcatArray] = useState([]);
  const [manageArray, setManageArray] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const location = useLocation();
  const { search } = location;
  const [param, setParam] = useState({});
  const bottomRef = useRef(null);

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
    }
  }, [location]);

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
  const tabContent = [
    {
      name: t("text.productDetails.productOverview"),
      key: "Product Overview",
      content: (
        <div className="tab-pane active">
          <p>{stringToHTML(productData?.overview || "-")}</p>
        </div>
      ),
    },
    {
      name: t("text.productDetails.specifications"),
      key: "Specifications",
      content: (
        <div className="tab-pane ">
          <p>{stringToHTML(productData?.specification || "-")}</p>
        </div>
      ),
    },
  ];
  const breadcrumb = [
    {
      path: moduleRoutesMap[userData?.userRole].PRODUCT.path,
      name: t("text.product.pageTitle"),
    },
    {
      path: "#",
      name: t("text.productDetails.pageTitle"),
    },
  ];

  if (userData.userRole === "admin") {
    breadcrumb.unshift({
      path: moduleRoutesMap[userData?.userRole].DASHBOARD.path,
      name: t("text.common.dashboard"),
    });
  }

  const getReviewRatingDetail = async (productRatingId) => {
    setReviewLoading(true);
    try {
      let queryParams = {
        productId: productRatingId,
        offset: (pageCount - 1) * limit,
        limit: initialLimit,
      };
      const res = await commonServices.getReviewRatingService({ queryParams });
      if (res?.success) {
        setReviewRatingData(res?.data);
        setRatingCount(Math.ceil(res?.data?.count / initialLimit));
        if (manageArray) {
          setConcatArray(concatArray?.concat(res?.data?.rows));
        } else {
          let modulesOfArray = concatArray.length % initialLimit;
          if (modulesOfArray === 0) {
            let sliceArray = concatArray.slice(
              0,
              concatArray?.length - res?.data?.rows?.length
            );
            setConcatArray(sliceArray);
          } else {
            let sliceArray = concatArray.slice(
              0,
              concatArray?.length - modulesOfArray
            );
            setConcatArray(sliceArray);
          }
        }
        if (res?.data?.count > initialLimit) {
          if (pageCount === ratingCount) {
            setShowMoreButton(false);
          } else {
            setShowMoreButton(true);
          }
        }
        if (pageCount === 1) {
          setShowLessButton(false);
        }
        setReviewLoading(false);
      }
    } catch (error) {
      logger(error);
      setReviewLoading(false);
    }
  };

  const getProductDetail = async (id) => {
    setLoading(true);
    try {
      const res = await ProductServices.getProductDetailService(id);
      const { data, success } = res;
      if (success) {
        setProductData(data);
        setLoading(false);
        setTimeout(() => {
          const offsetTop = document.querySelector("#shippingLog");
          if (dataKey === "shippingLog") {
            window.scrollTo({
              top: offsetTop?.offsetTop,
              behavior: "smooth",
            });
          }
        }, 500);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const getShippingLogData = async (id) => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        productId: id,
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
    if (productId) {
      getProductDetail(parseInt(productId));
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      getShippingLogData(productId);
    }
  }, [param, productId]);

  useEffect(() => {
    if (productId) {
      getReviewRatingDetail(productId);
    }
  }, [productId, pageCount]);

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
        getShippingLogData(productId);
      }
    } catch (error) {
      logger(error);
      setFormLoader(false);
    }
    setFormLoader(false);
  };

  const showMoreDocuments = () => {
    if (pageCount < ratingCount) {
      setPageCount((previous) => previous + 1);
      setShowLessButton(true);

      setManageArray(true);
    }
  };
  const showLessDocument = () => {
    if (pageCount > 1) {
      setPageCount((previous) => previous - 1);

      setManageArray(false);
    }
  };

  return (
    <>
      <MetaTags title={t("text.productDetails.pageTitle")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.productDetails.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      {loading ? (
        <GlobalLoader />
      ) : (
        <FormContainer>
          <div className="row mb-5 text-capitalize">
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.productId")}
              value={checkValidData(productData?.productId)}
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.productName")}
              value={checkValidData(productData?.productName)}
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.brandName")}
              value={checkValidData(productData?.Brand?.name)}
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.category")}
              value={checkValidData(productData?.categoryDetails?.name)}
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.subCategory")}
              value={checkValidData(productData?.subCategoryDetails?.name)}
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.childCategory")}
              value={checkValidData(productData?.childCategoryDetails?.name)}
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.price")}
              value={checkValidCount(productData?.price)}
              currency="$"
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.availableQty")}
              value={checkValidCount(productData?.quantity)}
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.totalSold")}
              value={checkValidCount(productData?.totalSold)}
            />
            <GeneralText
              extraClassName="col-sm-6 col-lg-4 col-xxl-3"
              label={t("text.productDetails.sellerName")}
              value={`${productData?.Brand?.sellerDetails?.firstName || "-"} ${
                productData?.Brand?.sellerDetails?.lastName || ""
              }`}
            />
            {productData?.sellerProductVariantDetails?.length >= 1 &&
              productData?.sellerProductVariantDetails.map((item, key) => {
                return (
                  <GeneralText
                    extraClassName="col-sm-6 col-lg-4 col-xxl-3"
                    label={item?.ProductVariant?.name || ""}
                    value={item?.ProductVariantAttribute?.attributeNames}
                    key={key}
                  />
                );
              })}
          </div>
          <div className="row categoryRow mb-5">
            <ImageMapField
              data={productData?.productImage ?? []}
              heading={t("text.productDetails.productImage")}
            />
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <h5 className="title mb-3">
                {t("text.productDetails.orderHistory")}
              </h5>
            </div>
            <div className="col-12">
              <Tabs tabContent={tabContent} visible border={false} />
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <h5 className="title mb-3">{t("text.ratingReview.title")}</h5>
            </div>
            <RatingReview
              reviewRatingData={concatArray}
              avgRating={reviewRatingData.avgRating}
              total={reviewRatingData.count}
              showMoreDocuments={showMoreDocuments}
              showLessDocument={showLessDocument}
              showMoreButton={showMoreButton}
              showLessButton={showLessButton}
              loading={reviewLoading}
            />
          </div>
          <div className="row" id="shippingLog" ref={bottomRef}>
            <div className="col-12">
              <h5 className="title mb-3">
                {t("text.productDetails.tableTitle")}
              </h5>
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
          </div>
        </FormContainer>
      )}
    </>
  );
}

export default CustomerDetails;
