import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  checkValidData,
  CommonButton,
  MetaTags,
  ModalComponent,
  PageHeader,
  sellerActionFormatter,
  SellerDataTable,
  SellerDiscountOfferFilter,
  SellerFilterButton,
  sellerStatusFormatter,
  // SweetAlert,
} from "../../../components";
import { dateFormatWithMonth } from "../../../helpers";
import routesMap from "../../../routeControl/sellerRoutes";
import { SellerDiscountServices } from "../../../services";

import {
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  navigateWithParam,
  momentUtcFormatter,
} from "../../../utils";
import ProductList from "./productList";

export default function SellerDiscountOffer() {
  const [searchName, setSearchName] = useState("");
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [tableLoader, setTableLoader] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [productListData, setProductListData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [discountData, setDiscountData] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [selectedDiscountStatus, setSelectedDiscountStatus] = useState("");
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "createdAt",
      order: "desc",
    },
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const { t } = useTranslation();

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      if (data?.sortType) {
        const sortData = [
          {
            dataField: getSortType(data?.sortType),
            order: data?.sortBy,
          },
        ];
        setDefaultSort(sortData);
      } else {
        setDefaultSort([
          {
            dataField: "createdAt",
            order: "desc",
          },
        ]);
      }
    }
  }, [location]);

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

      const res = await SellerDiscountServices.getDiscountList({ queryParams });
      if (res?.success) {
        setDiscountData(res.data.rows);
        setNoOfPage(
          res.data.count > 0 ? Math.ceil(res.data.count / sizePerPage) : 1
        );
        setTotalCount(res.data.count);
      }
    } catch (error) {
      logger(error);
    }
    setTableLoader(false);
  };

  const onReset = () => {
    setFilterData({});
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
  };

  const tableReset = () => {
    setTableLoader(true);
    setDiscountData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const handleFilterSubmit = (values) => {
    setFilterData(values);
    tableReset();
    const newParams = { ...param };
    newParams.page = 1;
    navigateWithParam(newParams, navigate, pathname);
    setFilterVisible(false);
  };

  useEffect(() => {
    getDiscountData();
  }, [param, sizePerPage, filterData]);

  const discountStatusUpdate = async (id, status) => {
    try {
      let discountStatus = "";
      if (status === "active") {
        discountStatus = "inactive";
      } else {
        discountStatus = "active";
      }

      let bodyData = { status: discountStatus };
      const res = await SellerDiscountServices.updateStatus(id, bodyData);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        getDiscountData();
        return true;
      }
    } catch (error) {
      logger(error);
    }
  };

  const onCloseModal = () => {
    setShowDiscountModal(false);
    setSelectedDiscountStatus("");
    setProductListData([]);
    getDiscountData();
  };

  const options = (row) => {
    let optionsArr = [
      row?.status === "expired"
        ? " "
        : {
            name: t("text.common.edit"),
            icon: "icon ni ni-eye",
            path: `${routesMap.DISCOUNTS_EDIT.path}/${row.id}`,
            action: "redirect",
          },
      {
        name: t("text.common.delete"),
        action: "confirm",
        onClickHandle: () => {
          setDeleteId(row.id);
          setIsAlertVisible(true);
        },
      },
    ];
    if (row.status === "active") {
      optionsArr.push({
        name: t("text.common.deactivate"),
        action: "confirm",
        onClickHandle: () => {
          discountStatusUpdate(row.id, row.status);
        },
      });
    }
    if (row.status === "inactive") {
      optionsArr.push({
        name: t("text.common.activate"),
        action: "confirm",
        onClickHandle: () => {
          discountStatusUpdate(row.id, row.status);
        },
      });
    }
    return optionsArr;
  };

  const deleteDiscount = async (id) => {
    try {
      setLoading(true);
      const response = await SellerDiscountServices.deleteDiscount(id);
      if (response.success) {
        modalNotification({
          type: "success",
          message: response.message || "",
        });
        setLoading(false);
        setIsAlertVisible(false);
        getDiscountData();
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  };

  const columns = [
    {
      dataField: "discountPercent",
      headerClasses: "w_70 sorting",
      text: t("text.sellerDiscountOffer.discountPercent"),
    },
    {
      dataField: "category",
      text: t("text.sellerDiscountOffer.category"),
      headerClasses: "w_70 sorting",
      formatter: (cell, row) => checkValidData(row?.categoryDetails?.name),
    },
    {
      dataField: "subCategory",
      text: t("text.sellerDiscountOffer.subCategory"),
      headerClasses: "w_70 sorting",
      formatter: (cell, row) => checkValidData(row?.subCategoryDetails?.name),
    },
    {
      dataField: "childCategory",
      text: t("text.sellerDiscountOffer.childCategories"),
      headerClasses: "w_70 sorting",
      formatter: (cell, row) => checkValidData(row?.childCategoryDetails?.name),
    },
    {
      dataField: "productDiscountDetails",
      text: t("text.sellerDiscountOffer.noOfProducts"),
      headerClasses: "w_70 sorting",
      formatter: (cell, row) => {
        return (
          <Link
            to="#"
            className="link"
            onClick={() => {
              setProductListData(row?.productDiscountDetails || []);
              setShowDiscountModal(true);
              setSelectedDiscountStatus(row?.status || "");
            }}
          >
            {row?.productDiscountDetails.length || 0}
          </Link>
        );
      },
    },
    {
      dataField: "startDate",
      text: t("text.sellerDiscountOffer.startDate"),
      headerClasses: "w_70 sorting",
      formatter: (cell) => momentUtcFormatter(cell, dateFormatWithMonth),
    },
    {
      dataField: "endDate",
      text: t("text.sellerDiscountOffer.endDate"),
      headerClasses: "w_70 sorting",
      formatter: (cell) => momentUtcFormatter(cell, dateFormatWithMonth),
    },
    {
      dataField: "status",
      text: t("text.common.status"),
      headerClasses: "w_70 sorting",
      formatter: sellerStatusFormatter,
    },
    {
      dataField: "action",
      text: t("text.common.action"),
      headerClasses: "text-end no-sort",
      formatter: (cell, row) => sellerActionFormatter(options(row)),
    },
  ];

  const changeProductDiscountStatus = async (e, discountId, productId) => {
    try {
      let bodyData = { status: e ? "active" : "inactive" };
      const response = await SellerDiscountServices.productDiscountStatusUpdate(
        discountId,
        productId,
        bodyData
      );
      if (response.success) {
        modalNotification({
          type: "success",
          message: response.message || "",
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  const getSearchValue = (val) => {
    setSearchName(val);
  };

  return (
    <>
      <MetaTags title={t("text.sellerDiscountOffer.title")} />
      <PageHeader heading={t("text.sellerDiscountOffer.title")} />
      <SellerDataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={discountData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        getSearchValue={getSearchValue}
        tableReset={tableReset}
        searchPlaceholder={t(
          "text.sellerDiscountOffer.placeholder.searchPlaceholder"
        )}
      >
        <div className="d-flex flex-wrap justify-content-end">
          <div className="dropdown filter">
            <SellerFilterButton
              setVisible={setFilterVisible}
              visible={filterVisible}
              popover={
                <SellerDiscountOfferFilter
                  onSubmit={handleFilterSubmit}
                  // loading={loading}
                  onReset={onReset}
                  filterData={filterData}
                />
              }
            />
          </div>
          <Link
            id="addOfferBtn"
            to={routesMap.DISCOUNTS_ADD.path}
            className="ms-3 btn btn-primary btn-gradiant"
          >
            {t("text.sellerDiscountOffer.addDiscountOffer")}
          </Link>
        </div>
      </SellerDataTable>

      <ModalComponent show={showDiscountModal} onHandleCancel={onCloseModal}>
        <ProductList
          productListData={productListData}
          changeProductDiscountStatus={changeProductDiscountStatus}
          selectedDiscountStatus={selectedDiscountStatus}
        />
      </ModalComponent>
      <ModalComponent
        show={isAlertVisible}
        onHandleCancel={() => {
          setIsAlertVisible(false);
        }}
        closeButton={false}
      >
        <CommonButton
          type="button"
          className="btn-close"
          onClick={() => {
            setIsAlertVisible(false);
          }}
        />
        <h2 className="mt-0 text-white">
          {t("text.sellerDiscountOffer.deleteDiscount")}
        </h2>
        <p>
          {t("text.sellerDiscountOffer.areYouWanttodelete")}{" "}
          <br className="d-none d-sm-block" />
          {t("text.sellerDiscountOffer.deleteThisOffer")}
        </p>
        <div className="mt-4">
          <CommonButton
            className="btn btn-primary-outline me-3 w150"
            onClick={() => {
              setIsAlertVisible(false);
            }}
          >
            {t("text.common.cancel")}
          </CommonButton>
          <CommonButton
            className="btn btn-gradiant w150"
            onClick={() => deleteDiscount(deleteId)}
            loading={loading}
          >
            {t("text.common.delete")}
          </CommonButton>
        </div>
      </ModalComponent>
    </>
  );
}
