import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  SellerDataTable,
  MetaTags,
  PageHeader,
  CommonButton,
  productsImageFormatter,
  sellerActionFormatter,
  ModalComponent,
  linkFormatter,
  checkValidData,
  sellerStatusFormatter,
  currencyFormatter,
} from "../../../../components";
import routesMap from "../../../../routeControl/sellerRoutes";
import { SellerProductServices } from "../../../../services";

import {
  commasFormatter,
  decodeQueryData,
  getSortType,
  logger,
  modalNotification,
  readMoreTextShow,
  // navigateWithParam,
} from "../../../../utils";

function Products() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const [productData, setProductData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [param, setParam] = useState({});
  const [noOfPage, setNoOfPage] = useState(0);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerView] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [tableLoader, setTableLoader] = useState(false);
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "createdAt",
      order: "desc",
    },
  ]);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectMessage, setRejectMessage] = useState("");
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

  const getProductsData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
      };
      const res = await SellerProductServices.getAllProduct({ queryParams });
      if (res?.success) {
        setProductData(res.data.rows);
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

  useEffect(() => {
    getProductsData();
  }, [param, sizePerPage]);

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

  const productStatusUpdate = async (id, status) => {
    try {
      let productStatus = "";
      if (status === "active") {
        productStatus = "inactive";
      } else {
        productStatus = "active";
      }

      let bodyData = { status: productStatus };
      const res = await SellerProductServices.updateStatus(id, bodyData);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });

        getProductsData();
        return true;
      }
    } catch (error) {
      logger(error);
    }
  };

  const options = (row) => {
    const { id, status } = row;
    let optionsArr = [
      {
        name: t("text.common.viewDetails"),
        icon: "icon ni ni-package",
        path: `${routesMap.PRODUCT_DETAIL.path}/${row.id}`,
        action: "redirect",
      },
    ];
    if (status !== "pending") {
      optionsArr.push({
        name: t("text.common.edit"),
        icon: "icon ni ni-eye",
        path: `${routesMap.EDIT_PRODUCT.path}/${row.id}`,
        action: "redirect",
      });
    }
    if (status === "active") {
      optionsArr.push({
        name: t("text.common.deactivate"),
        onClickHandle: () => {
          productStatusUpdate(id, status);
        },
        action: "confirm",
      });
    }
    if (status === "inactive") {
      optionsArr.push({
        name: t("text.common.activate"),
        onClickHandle: () => {
          productStatusUpdate(id, status);
        },
        action: "confirm",
      });
    }
    return optionsArr;
  };

  const productStatusFormatter = (cell, row) => {
    return (
      <Link
        to="#"
        onClick={() => {
          setRejectModalVisible(true);
          setRejectMessage(row?.rejectMessage || "");
        }}
        className="badge badge-danger"
      >
        {t("text.common.rejected")}
      </Link>
    );
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
      headerClasses: "w_70 sorting",
      formatter: (cell, row) =>
        productsImageFormatter(row?.productImage[0]?.productImageUrl),
    },
    {
      dataField: "productId",
      text: t("text.sellerProductDetails.productID"),
      headerClasses: "w_70 sorting",

      formatter: (cell, row) =>
        linkFormatter(
          cell,
          `${routesMap.PRODUCT_DETAIL.path}/${row?.id}`,
          "text-primary"
        ),
    },

    {
      dataField: "productName",
      text: t("text.sellerProductDetails.productName"),
      headerClasses: "w_70 sorting",
      formatter: (cell, row) =>
        readMoreTextShow(cell, () =>
          showMoreText(
            row?.productName,
            t("text.sellerProductDetails.productName")
          )
        ),
    },
    {
      dataField: "brandName",
      text: t("text.sellerProductDetails.brandName"),
      headerClasses: "w_70 sorting",

      formatter: (cell, row) => row?.Brand?.name || "",
    },
    {
      dataField: "categoryName",
      text: t("text.sellerProductDetails.category"),
      headerClasses: "w_70 sorting",

      formatter: (cell, row) => checkValidData(row?.categoryDetails?.name),
    },
    {
      dataField: "variantName",
      text: t("text.productVariant.variants"),
      headerClasses: "w_70 sorting",
      formatter: (cell, row) =>
        row?.sellerProductVariantDetails?.length >= 0
          ? readMoreTextShow(
              commasFormatter(
                row?.sellerProductVariantDetails.map((item) =>
                  item?.ProductVariantAttribute?.attributeNames
                    ? item?.ProductVariantAttribute?.attributeNames
                    : "-"
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
                  t("text.productVariant.variants")
                )
            )
          : "-",
    },
    {
      dataField: "price",
      text: t("text.sellerProductDetails.price"),
      headerClasses: "w_70 sorting",

      formatter: (cell, row) => currencyFormatter(row?.price, "USD"),
    },

    {
      dataField: "status",
      text: t("text.common.status"),
      headerClasses: "w_70 sorting",
      formatter: (cell, row) => {
        return (
          <>
            {row?.status === "rejected"
              ? productStatusFormatter(cell, row)
              : sellerStatusFormatter(cell, row)}
          </>
        );
      },
    },
    {
      dataField: "action",
      text: t("text.common.action"),
      headerClasses: "text-end no-sort",
      formatter: (cell, row) => sellerActionFormatter(options(row)),
    },
  ];

  const onAddNewButtonClick = () => {
    navigate(routesMap.ADD_PRODUCT.path);
  };

  const onBulkUploadButtonClick = () => {
    navigate(routesMap.BULK_UPLOAD.path);
  };

  return (
    <>
      <MetaTags title={t("text.sellerProductDetails.metaTitle")} />
      <PageHeader heading={t("text.sellerProductDetails.metaTitle")} />
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
        getSearchValue={getSearchValue}
        tableReset={tableReset}
        searchPlaceholder={t(
          "text.sellerProductDetails.placeHolders.searchPlaceholder"
        )}
      >
        <div className="d-flex flex-wrap justify-content-end">
          <CommonButton
            onClick={onBulkUploadButtonClick}
            className="btn btn-primary-outline d-inline-flex align-items-center mb-2 mb-sm-0"
          >
            <em className="icon-bulk-upload" />{" "}
            {t("text.sellerProductDetails.bulkUpload")}
          </CommonButton>
          <CommonButton
            onClick={onAddNewButtonClick}
            className="ms-3 btn btn-primary d-inline-flex align-items-center btn-gradiant mb-2 mb-sm-0"
          >
            + {t("text.sellerProductDetails.addNewProduct")}
          </CommonButton>
        </div>
      </SellerDataTable>
      <ModalComponent
        show={rejectModalVisible}
        onHandleCancel={() => {
          setRejectModalVisible(false);
          setRejectMessage("");
        }}
        title=""
      >
        <h2 className="mt-0 text-white">{t("text.common.rejectionReason")}</h2>
        <p>{rejectMessage}</p>
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

export default Products;
