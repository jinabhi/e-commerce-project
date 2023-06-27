import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddEditDiscount,
  MetaTags,
  SellerBreadcrumb,
} from "../../../../components";
import {
  dateFormateWithSlash,
  // payloadDateTimeFormat,
} from "../../../../helpers";
import { selectUserData } from "../../../../redux/AuthSlice/index.slice";
import routesMap from "../../../../routeControl/sellerRoutes";
import {
  CategoryServices,
  ChildCategoryServices,
  SellerDiscountServices,
  SubCategoryServices,
} from "../../../../services";
import { logger, modalNotification } from "../../../../utils";

export default function AddEditSellerDiscount() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const userData = useSelector(selectUserData);

  const discountId = params.id;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [notDiscountedProducts, setNotDiscountedProducts] = useState([]);

  // field loaders
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [subCategoryLoader, setSubCategoryLoader] = useState(false);
  const [childCategoryLoader, setChildCategoryLoader] = useState(false);
  const [productLoader, setProductLoader] = useState(false);

  const [initialValues, setInitialValues] = useState({
    discountPercent: "",
    categoryId: undefined,
    subCategoryId: undefined,
    childCategoryId: undefined,
    startDate: "",
    endDate: "",
    productIds: [],
  });

  const getNotDiscountedProducts = async (childCategoryId) => {
    try {
      const response = await SellerDiscountServices.getDiscountedProducts({
        childCategoryId,
      });
      if (response.success) {
        let productArray = response.data.rows.map((item) => {
          return {
            id: item.id,
            name: item.productName,
          };
        });
        setNotDiscountedProducts([...productArray]);
      }
      setProductLoader(false);
    } catch (error) {
      setProductLoader(false);
      logger(error);
    }
  };

  const getCategories = async () => {
    try {
      let queryParams = {
        scope: "activeCategory",
      };
      const response = await CategoryServices.getCategoryService({
        queryParams,
      });
      if (response.success) {
        setCategories([...response.data.rows]);
      }
      setCategoryLoader(false);
    } catch (error) {
      logger(error);
      setCategoryLoader(false);
    }
  };

  const fetchSubCategory = async (id) => {
    try {
      let queryParams = {
        categoryId: id,
        scope: "activeSubCategory",
      };
      const response = await SubCategoryServices.getSubCategoryService({
        queryParams,
      });
      if (response.success) {
        setSubCategories([...response.data.rows]);
      }
      setSubCategoryLoader(false);
    } catch (error) {
      logger(error);
      setSubCategoryLoader(false);
    }
  };

  const fetchChildCategory = async (id) => {
    try {
      let queryParams = {
        subCategoryId: id,
        scope: "activeChildCategory",
      };
      const response = await ChildCategoryServices.getChildCategoryService({
        queryParams,
      });
      if (response.success) {
        setChildCategories([...response.data.rows]);
        setChildCategoryLoader(false);
      }
    } catch (error) {
      setChildCategoryLoader(false);
      logger(error);
    }
  };

  const onCategorySelect = async (setFieldValue, e) => {
    try {
      setSubCategoryLoader(true);
      setFieldValue("subCategoryId", undefined);
      setFieldValue("childCategoryId", undefined);
      setFieldValue("productIds", []);
      fetchSubCategory(e);
    } catch (error) {
      logger(error);
    }
  };

  const onSubCategorySelect = async (setFieldValue, e) => {
    try {
      setChildCategoryLoader(true);
      setFieldValue("childCategoryId", undefined);
      setFieldValue("productIds", []);
      fetchChildCategory(e);
    } catch (error) {
      logger(error);
    }
  };

  const onChildCategorySelect = async (setFieldValue, e) => {
    try {
      setProductLoader(true);
      setFieldValue("productIds", []);
      getNotDiscountedProducts(e);
    } catch (error) {
      logger(error);
    }
  };

  const getDiscountDetails = async () => {
    try {
      setProductLoader(true);
      setSubCategoryLoader(true);
      setChildCategoryLoader(true);
      const response = await SellerDiscountServices.getDiscountDetail(
        discountId
      );
      const { success, data } = response;
      if (data === null) {
        navigate(routesMap.DISCOUNTS_OFFERS.path);
      }
      if (success) {
        fetchSubCategory(data?.categoryId);
        fetchChildCategory(data?.subCategoryId);
        if (data?.productDiscountDetails) {
          const res = await SellerDiscountServices.getDiscountedProducts({
            childCategoryId: data.childCategoryId,
          });
          if (res.success) {
            let productArray = res.data.rows.map((item) => {
              return {
                id: item.id,
                name: item.productName,
              };
            });
            if (data?.productDiscountDetails) {
              data?.productDiscountDetails.map((item) => {
                productArray.push({
                  id: item.productId,
                  name: item?.Product?.productName || "",
                });
              });
            }
            setNotDiscountedProducts([...productArray]);
          }
        }
        let tempInitial = {
          discountPercent: data?.discountPercent || "",
          categoryId: data?.categoryId || undefined,
          subCategoryId: data?.subCategoryId || undefined,
          childCategoryId: data?.childCategoryId || undefined,
          startDate: moment(data.startDate, dateFormateWithSlash) || undefined,
          endDate: moment(data.endDate, dateFormateWithSlash) || undefined,
          productIds:
            (data?.productDiscountDetails &&
              data?.productDiscountDetails.map((item) => {
                return item.productId;
              })) ||
            [],
        };
        setInitialValues({ ...tempInitial });
        setProductLoader(false);
      }
    } catch (error) {
      logger(error);
      navigate(routesMap.DISCOUNTS_OFFERS.path);
    }
  };

  useEffect(() => {
    setCategoryLoader(true);
    getCategories();
    if (discountId) {
      getDiscountDetails();
    }
  }, []);

  const onSubmit = async (value) => {
    try {
      setLoading(true);
      let bodyData = { ...value };
      bodyData.userId = userData.id;
      let timeZoneOffset = new Date().getTimezoneOffset();
      bodyData.startDate = moment(bodyData.startDate, "YYYY-MM-DD hh:mm:ss")
        .subtract(timeZoneOffset, "minutes")
        .format("YYYY-MM-DD hh:mm:ss");
      if (bodyData.endDate instanceof moment) {
        bodyData.endDate = moment(bodyData.endDate).format("YYYY-MM-DD");
      }
      bodyData.endDate = `${bodyData.endDate} 23:59:59`;
      let response;
      if (discountId) {
        response = await SellerDiscountServices.updateDiscount(
          discountId,
          bodyData
        );
      } else {
        response = await SellerDiscountServices.addDiscount(bodyData);
      }
      if (response.success) {
        modalNotification({
          type: "success",
          message: response?.message || "",
        });
        navigate(routesMap.DISCOUNTS_OFFERS.path);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  };

  const breadCrumb = [
    {
      name: t("text.sellerDiscountOffer.discount"),
      path: routesMap.DISCOUNTS_OFFERS.path,
    },
    {
      name: discountId
        ? t("text.sellerDiscountOffer.editDiscount")
        : t("text.sellerDiscountOffer.addNewDiscount"),
      path: "#",
    },
  ];

  return (
    <>
      <MetaTags
        title={
          discountId
            ? t("text.sellerDiscountOffer.editDiscount")
            : t("text.sellerDiscountOffer.addNewDiscount")
        }
      />
      <main className="main-content addProduct pb">
        <div className="container">
          <SellerBreadcrumb breadcrumb={breadCrumb} />
          <section className="myAccount pb">
            <div className="addProduct_inner bg-850 p-30 radius-20">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <AddEditDiscount
                    initialValues={initialValues}
                    loading={loading}
                    categories={categories}
                    subCategories={subCategories}
                    childCategories={childCategories}
                    onSubmit={onSubmit}
                    onCategorySelect={onCategorySelect}
                    onSubCategorySelect={onSubCategorySelect}
                    onChildCategorySelect={onChildCategorySelect}
                    notDiscountedProducts={notDiscountedProducts}
                    discountId={discountId}
                    categoryLoader={categoryLoader}
                    subCategoryLoader={subCategoryLoader}
                    childCategoryLoader={childCategoryLoader}
                    productLoader={productLoader}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
