import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AddEditProductVariants } from "../../..";
import {
  Breadcrumb,
  DataTable,
  ListingHeader,
  MetaTags,
  PageHeader,
  ModalComponent,
  actionFormatter,
  SweetAlert,
  checkValidData,
  checkValidCount,
} from "../../../../../components";
import routesMap from "../../../../../routeControl/adminRoutes";
import { ProductVariantsServices } from "../../../../../services/Admin/Master/ProductVariants/index.service";
import {
  logger,
  decodeQueryData,
  getSortType,
  navigateWithParam,
  modalNotification,
  commasFormatter,
  readMoreTextShow,
} from "../../../../../utils";

function ProductVariants(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = props;
  const { pathname, search } = location;
  const [searchName, setSearchName] = useState("");
  const [show, setShow] = useState(false);
  const [param, setParam] = useState({});
  const [productId, setProductId] = useState();
  const [rowData, setRowData] = useState();
  const [noOfPage, setNoOfPage] = useState(0);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sizePerPage, setSizePerView] = useState(10);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [productName, setProductName] = useState("");
  const [showReadMore, setShowReadMore] = useState(false);
  const [readData, setReadData] = useState();
  const [defaultSort, setDefaultSort] = useState([
    {
      dataField: "",
      order: "",
    },
  ]);
  const [productVariantData, setProductVariantData] = useState([]);

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

  const getProductVariantData = async () => {
    setTableLoader(true);
    try {
      let queryParams = {
        offset: (page - 1) * sizePerPage,
        limit: sizePerPage,
        sortBy: param?.sortBy,
        sortType: param?.sortType,
        name: searchName,
      };
      const res = await ProductVariantsServices.getProductVariant({
        queryParams,
      });
      const { success, data } = res;
      if (success) {
        setProductVariantData(data.rows);
        setNoOfPage(data.count > 0 ? Math.ceil(data.count / sizePerPage) : 1);
        setTotalCount(data.count);
        setTableLoader(false);
      }
    } catch (error) {
      logger(error);
      setTableLoader(false);
    }
  };

  useEffect(() => {
    getProductVariantData();
  }, [param]);

  const deleteProductVariant = async (id) => {
    setLoading(true);
    try {
      const res = await ProductVariantsServices.deleteProductVariantService(id);
      const { success, message } = res;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setLoading(false);
        getProductVariantData();
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const onConfirmAlert = () => {
    setLoading(false);
    deleteProductVariant(productId);

    setIsAlertVisible(false);
    return true;
  };

  const onHandleShow = (data) => {
    setShow(true);
    setRowData(data);
  };
  const onHideModal = () => {
    setShow(false);
  };

  const headerSortingClasses = (column, sortOrder) => {
    return sortOrder === "asc" ? "sorting_asc" : "sorting_desc";
  };

  const options = (row) => {
    const optionsArr = [];

    optionsArr.push(
      {
        name: t("text.common.edit"),
        icon: "icon ni ni-pen",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => onHandleShow(row),
      },
      row.totalProduct <= 0 && {
        name: t("text.common.delete"),
        icon: "icon ni ni-trash",
        path: "#addForm",
        action: "confirm",
        onClickHandle: () => {
          setIsAlertVisible(true);
          setProductId(row.id);
          setProductName(row?.name);
        },
      }
    );

    return optionsArr;
  };

  const showMoreText = (data) => {
    setShowReadMore(true);
    setReadData(data.data);
  };

  const onCloseDescriptionModal = () => {
    setShowReadMore(false);
    setReadData("");
  };

  const tableReset = () => {
    setTableLoader(true);
    setProductVariantData([]);
    setNoOfPage(0);
    setTotalCount(0);
  };

  const getSearchValue = (val) => {
    setSearchName(val);
    if (val) {
      tableReset();
    }
  };

  const onSortColumn = (field, order) => {
    const data = { ...param };
    data.sortBy = field;
    data.sortType = order === "asc" ? "ASC" : "DESC";
    navigateWithParam(data, navigate, pathname);
    tableReset();
  };

  const columns = [
    {
      dataField: "name",
      text: t("text.productVariant.variantName"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidData(row?.name),
      style: {
        textTransform: "capitalize",
      },
    },
    {
      dataField: "attributeNames",
      text: t("text.productVariant.attribute"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) =>
        readMoreTextShow(
          commasFormatter(
            row?.productVariantAttributeDetail?.map(
              (item) => item.attributeNames
            )
          ),
          showMoreText
        ),

      style: {
        textTransform: "capitalize",
      },
    },
    {
      dataField: "totalProduct",
      text: t("text.productVariant.productNo"),
      headerClasses: "sorting",
      sort: true,
      headerSortingClasses,
      onSort: (field, order) => {
        onSortColumn(field, order);
      },
      formatter: (cell, row) => checkValidCount(row?.totalProduct),
    },
    {
      headerClasses: "nk-tb-col-tools text-right nosort sorting_disabled",
      dataField: "action",
      text: t("text.productVariant.action"),
      classes: "text-right",
      formatter: (cell, row) => actionFormatter(options(row)),
    },
  ];

  const breadcrumb = [
    {
      path: routesMap.DASHBOARD.path,
      name: t("text.dashboard.name"),
    },
    {
      path: "#",
      name: t("text.productVariant.pageTitle"),
    },
  ];
  return (
    <div>
      <MetaTags title={t("text.productVariant.pageTitle")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.productVariant.pageTitle")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
          <ListingHeader
            btnText={t("text.productVariant.createbtn")}
            onHandleShow={onHandleShow}
            btnArray={["create"]}
          />
        </div>
      </div>
      <ModalComponent
        show={show}
        title={
          rowData?.id
            ? t("text.productVariant.edit")
            : t("text.productVariant.addVariant")
        }
        onHandleShow={onHandleShow}
        onHandleCancel={() => {
          onHideModal();
        }}
      >
        <AddEditProductVariants
          onHandleCancel={onHideModal}
          rowData={rowData}
          getProductVariantData={getProductVariantData}
          tableReset={tableReset}
        />
      </ModalComponent>

      <DataTable
        hasLimit
        noOfPage={noOfPage}
        sizePerPage={sizePerPage}
        page={page}
        count={totalCount}
        tableData={productVariantData}
        tableColumns={columns}
        param={param}
        defaultSort={defaultSort}
        setSizePerPage={setSizePerView}
        tableLoader={tableLoader}
        tableReset={tableReset}
        getSearchValue={getSearchValue}
        searchPlaceholder={t("text.search.productVariants")}
      />
      <SweetAlert
        reverseButtons
        title={t("text.productVariant.msg")}
        text={productName}
        show={isAlertVisible}
        icon="warning"
        showCancelButton
        cancelButtonText={t("text.common.no")}
        confirmButtonText={t("text.common.yes")}
        setIsAlertVisible={setIsAlertVisible}
        showLoaderOnConfirm
        loading={loading}
        onConfirmAlert={onConfirmAlert}
      />
      <ModalComponent
        show={showReadMore}
        onHandleCancel={onCloseDescriptionModal}
        title={t("text.productVariant.attribute")}
      >
        <p>{readData}</p>
      </ModalComponent>
    </div>
  );
}
export default withTranslation()(ProductVariants);
