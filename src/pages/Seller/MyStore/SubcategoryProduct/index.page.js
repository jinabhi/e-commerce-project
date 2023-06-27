import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  MetaTags,
  SearchInput,
  SellerBreadcrumb,
} from "../../../../components";
import routesMap from "../../../../routeControl/sellerRoutes";
import {
  ChildCategoryServices,
  SellerProductServices,
} from "../../../../services";
import { logger } from "../../../../utils";
import ProductList from "./productList";

function SubCategoryProduct() {
  const { t } = useTranslation();
  const [productData, setProductData] = useState([]);
  const [totalCount, setCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [searchName, setSearchName] = useState("");
  const [childCategoryData, setChildCategoryData] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const getProductData = async (id) => {
    setLoading(true);
    try {
      let queryParams = {
        childCategoryId: id,
        name: searchName,
        scope: "activeProduct",
      };
      const res = await SellerProductServices.getAllProduct({ queryParams });
      const { success, data } = res;
      if (success) {
        setProductData(data.rows);
        setCount(data.count);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  const getSingleChildCategory = async (id) => {
    setLoadingData(true);
    try {
      let res = await ChildCategoryServices.getChildCategoryByIdService(id);
      let { success, data } = res;
      if (success) {
        setChildCategoryData(data);
      }
    } catch (error) {
      logger(error);
    }
    setLoadingData(false);
  };
  useEffect(() => {
    getProductData(param.id);
    getSingleChildCategory(param.id);
  }, [searchName]);

  const getSearchValue = (val) => {
    setSearchName(val);
  };

  const breadcrumb = [
    {
      path: routesMap.MY_STORE.path,
      name: t("text.myStore.title"),
    },
    {
      path: routesMap.MY_STORE.path,
      name: childCategoryData?.SubCategory?.name,
    },
    {
      path: "#",
      name: childCategoryData?.name,
    },
  ];
  return (
    <>
      <MetaTags title={t("text.myStore.subCategoryMetatitle")} />
      <div className="mb-30">
        {loadingData ? "" : <SellerBreadcrumb breadcrumb={breadcrumb} />}
        <div className="d-flex align-items-center justify-content-between">
          <SearchInput
            extraClassName="form-group form-group-search w-100 mb-0"
            getSearchValue={getSearchValue}
            searchPlaceholder={t("text.myStore.productSearchPlaceHolder")}
          />
          <div className="total-product flex-shrink-0 ps-2">
            <p className="mb-0 font-md">({`${totalCount}`} Products)</p>
          </div>
        </div>
        <ProductList productData={productData} loading={loading} />
      </div>
    </>
  );
}

export default SubCategoryProduct;
