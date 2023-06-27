import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { ShipToMor } from "../..";

import {
  SellerDataTable,
  MetaTags,
  PageHeader,
  productsImageFormatter,
  sellerActionFormatter,
  ModalComponent,
  checkValidData,
  quantityFormatter,
  linkFormatter,
  sellerStatusFormatter,
  currencyFormatter,
} from "../../../../components";
import config from "../../../../config";
import routesMap from "../../../../routeControl/sellerRoutes";
import { MorInventoryServices } from "../../../../services";

import {
  commasFormatter,
  decodeQueryData,
  getSortType,
  logger,
  navigateWithParam,
  readMoreTextShow,
} from "../../../../utils";

function MorInventory() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, search } = location;
  const [productData, setProductData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState();
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "createdAt",
      order: "desc",
    },
  ]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    if (search) {
      const data = decodeQueryData(search);
      setParam(data);
      setPage(data?.page ?? 1);
      // setSearchName(data?.name ?? "");
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

  const getInventoryData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
        type: "inventory",
      };
      const res = await MorInventoryServices.getAllInventoryService({
        queryParams,
      });
      if (res?.success) {
        setProductData(res.data.rows);
        setNoOfPage(
          res.data.count > 0 ? Math.ceil(res.data.count / sizePerPage) : 1
        );
        setTotalCount(res.data.count);
        setTableLoader(false);
      }
    } catch (error) {
      logger(error);
      setTableLoader(false);
    }
  };

  useEffect(() => {
    getInventoryData();
  }, [param, sizePerPage]);

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
  };

  const onHandleHide = () => {
    setShow(false);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const options = (row) => {
    let optionsArr = [
      {
        name: t("text.morInventory.shipToMor"),
        icon: "",
        path: "#shipMor",
        action: "confirm",
        onClickHandle: () => {
          setShow(true);
          setProductDetails(row);
        },
      },
      {
        name: t("text.morInventory.view"),
        icon: "",
        path: `${routesMap.VIEW_SHIPPING_LOG.path}/${row?.id}`,
        action: "redirect",
      },
    ];

    return optionsArr;
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
      dataField: "productImage",
      text: "",
      headerClasses: "w_70",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        productsImageFormatter(
          row?.productImage[0]?.productImageUrl,
          t("text.morInventory.image")
        ),
    },
    {
      dataField: "id",
      text: t("text.morInventory.productId"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        linkFormatter(
          row?.productId,
          `${routesMap.PRODUCT_DETAIL.path}/${row?.id}`,
          "text-primary"
        ),
    },
    {
      dataField: "productName",
      text: t("text.morInventory.productName"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        readMoreTextShow(cell, () =>
          showMoreText(row?.productName, t("text.morInventory.productName"))
        ),
    },
    {
      dataField: "brandName",
      text: t("text.morInventory.brandName"),
      headerClasses: "w_70",
      formatter: (cell, row) => checkValidData(row?.Brand?.name),
    },
    {
      dataField: "categoryName",
      text: t("text.morInventory.categoryName"),
      headerClasses: "w_70",
      formatter: (cell, row) => checkValidData(row?.categoryDetails?.name),
    },
    {
      dataField: "variantName",
      text: t("text.morInventory.variantName"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        readMoreTextShow(
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
              t("text.morInventory.variantName")
            )
        ),
    },
    {
      dataField: "price",
      text: t("text.morInventory.price"),
      headerClasses: "w_70",
      formatter: (cell) => currencyFormatter(cell, "USD"),
    },

    {
      dataField: "quantity",
      text: t("text.morInventory.quantity"),
      headerClasses: "w_70",
      formatter: (cell, row) =>
        quantityFormatter(row?.productStatus, row?.quantity),
    },

    {
      dataField: "productStatus",
      text: t("text.common.status"),
      headerClasses: "w_70",
      formatter: sellerStatusFormatter,
    },
    {
      dataField: "action",
      text: t("text.common.action"),
      headerClasses: "text-end no-sort",
      formatter: (cell, row) => sellerActionFormatter(options(row)),
    },
  ];

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
  return (
    <>
      <MetaTags title={t("text.morInventory.morInventory")} />
      <PageHeader
        heading={t("text.morInventory.morInventory")}
        userType="seller"
      />
      <SellerDataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={productData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t(
          "text.sellerProductDetails.placeHolders.searchPlaceholder"
        )}
      />
      <ModalComponent
        extraClassName="modal-md inventoryModal"
        show={show}
        onHandleCancel={() => {
          setShow(false);
        }}
      >
        <ShipToMor
          productDetails={productDetails}
          onHandleCancel={() => onHandleHide()}
          tableReset={tableReset}
          getInventoryData={getInventoryData}
        />
      </ModalComponent>

      <ModalComponent
        show={showAlert}
        onHandleCancel={() => {
          setShowAlert(false);
        }}
        closeButton
      >
        <img
          src={`${config.IMAGE_URL}/success.svg`}
          className="img-fluid"
          alt="morluxury"
        />
        <h2 className="text-white">{t("text.common.shippedSuccessfully")}</h2>
        <p className="text-break">{`${productDetails?.productName} ${t(
          "text.morInventory.markedAsShipped"
        )} `}</p>
      </ModalComponent>
      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseDescriptionModal}
        title=""
      >
        <h2 className="mt-0 text-white">{modalTitle}</h2>
        <p className="text-break">{readData}</p>
      </ModalComponent>
    </>
  );
}

export default MorInventory;
