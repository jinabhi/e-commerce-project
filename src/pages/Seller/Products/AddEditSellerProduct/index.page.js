import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AddEditProduct from "../../../../components/Form/Seller/AddEditProduct/index.form";
import { logger, modalNotification } from "../../../../utils";
import {
  CategoryServices,
  ChildCategoryServices,
  ProductVariantsServices,
  SellerRegisterServices,
  SubCategoryServices,
  SellerProductServices,
} from "../../../../services";
import routesMap from "../../../../routeControl/sellerRoutes";
import { selectUserData } from "../../../../redux/AuthSlice/index.slice";
import { SellerMedia } from "../../../../apiEndPoints";
import { MetaTags, SellerBreadcrumb } from "../../../../components";

function AddEditSellerProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const userData = useSelector(selectUserData);
  const productId = params.id;
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [sellerBrand, setSellerBrand] = useState({
    brandName: "",
    brandId: 0,
  });
  const [variantArray, setVariantArray] = useState([]);
  const [initialValues, setInitialValues] = useState({
    productImage: "",
    productName: "",
    categoryId: undefined,
    subCategoryId: undefined,
    childCategoryId: undefined,
    price: "",
    weight: "",
    unit: undefined,
    variantId: undefined,
    attributeId: undefined,
    overview: "",
    specification: "",
    productVideo: "",
  });
  const [productVideo, setProductVideo] = useState(null);
  const [selectedPrimaryVariant, setSelectedPrimaryVariant] = useState(null);
  const [selectedExtraVariant, setSelectedExtraVariant] = useState([]);

  // product form field Loaders
  const [categoryLoader, setCategoryLoader] = useState(false);
  const [subCategoryLoader, setSubCategoryLoader] = useState(false);
  const [childCategoryLoader, setChildCategoryLoader] = useState(false);
  const [variantLoader, setVariantLoader] = useState(false);
  const [attributeLoader, setAttributeLoader] = useState(false);

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
        setCategoryLoader(false);
      }
    } catch (error) {
      logger(error);
      setCategoryLoader(false);
    }
  };

  const getSellerBrandDetails = async () => {
    try {
      const response = await SellerRegisterServices.getSellerDetails(
        userData.id
      );
      if (response.success) {
        setSellerBrand({
          brandName: response.data.sellerBrandDetail.name,
          brandId: response.data.sellerBrandDetail.id,
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  const getVariants = async () => {
    try {
      const response = await ProductVariantsServices.getProductVariant({});
      if (response.success) {
        let data = response.data.rows;
        data.map((item) => {
          item.disabled = false;
        });
        setVariants([...data]);
      }
      setVariantLoader(false);
    } catch (error) {
      logger(error);
    }
  };

  const fetchVariantsAttributes = async (id) => {
    try {
      const response = await ProductVariantsServices.getVariantDetails(id);
      if (response.success) {
        let tempArr = response.data.productVariantAttributeDetail;
        tempArr.map((item) => {
          item.name = item.attributeNames;
        });
        setAttribute([...tempArr]);
      }
      setAttributeLoader(false);
    } catch (error) {
      logger(error);
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
        setSubCategoryLoader(false);
      }
    } catch (error) {
      setSubCategoryLoader(false);
      logger(error);
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
      }
      setChildCategoryLoader(false);
    } catch (error) {
      logger(error);
    }
  };

  const getProductDetails = async () => {
    try {
      setVariantLoader(true);
      setChildCategoryLoader(true);
      setSubCategoryLoader(true);
      setAttributeLoader(true);
      const response = await SellerProductServices.getProductDetail(
        parseInt(productId)
      );
      const { success, data } = response;
      if (success) {
        fetchSubCategory(response.data?.categoryId);
        fetchChildCategory(response.data?.subCategoryId);
        if (!data?.sellerProductVariantDetails?.length <= 0) {
          fetchVariantsAttributes(
            response.data?.sellerProductVariantDetails[0]?.productVariantId
          );
        }

        let initialVariants;
        if (data?.sellerProductVariantDetails) {
          let temp = data.sellerProductVariantDetails.map((val) => {
            return val.productVariantId;
          });
          //----------------------------------
          const res = await ProductVariantsServices.getProductVariant({});
          if (res.success) {
            initialVariants = res.data.rows;
            initialVariants.map((item) => {
              item.disabled = false;
            });
            if (temp.length > 0) {
              temp.map((val) => {
                initialVariants[
                  initialVariants.findIndex((i) => i.id === val)
                ].disabled = true;
              });
            }
            setVariants([...initialVariants]);
          }
          //----------------------------------
        }
        let tempInitial = {
          productImage:
            data?.productImage && data.productImage[0]?.productImage,
          productName: data?.productName || "",
          categoryId: data?.categoryId || undefined,
          subCategoryId: data?.subCategoryId || undefined,
          childCategoryId: data?.childCategoryId || undefined,
          price: parseInt(data?.price) || "",
          weight: data?.weight || "",
          unit: data?.unit || undefined,
          variantId:
            data?.sellerProductVariantDetails &&
            data?.sellerProductVariantDetails[0]?.productVariantId,
          attributeId:
            data?.sellerProductVariantDetails &&
            data?.sellerProductVariantDetails[0]?.productVariantAttributeId,
          overview: data?.overview || "",
          specification: data?.specification || "",
        };
        setSelectedPrimaryVariant(
          data?.sellerProductVariantDetails &&
            data?.sellerProductVariantDetails[0]?.productVariantId
        );
        let tempArray = [];
        data.productImage.map((item) => {
          if (item.fileType === "image") {
            tempArray.push({
              basePath: item.productImage,
              baseUrl: item.productImageUrl,
              id: item.id,
              fileType: item.fileType,
            });
          } else if (item.fileType === "video") {
            setProductVideo({
              basePath: item.productImage,
              baseUrl: item.productImageUrl,
              id: item.id,
              fileType: item.fileType,
            });
          }
        });
        const variantResponseArray = data?.sellerProductVariantDetails || [];
        variantResponseArray.shift();
        let tempVariantArray = variantResponseArray.map((item, index) => {
          let identifier = Date.now() + index;
          const variantAttributesList =
            item?.ProductVariant?.productVariantAttributeDetail || [];
          let attributeArr = [];
          if (variantAttributesList.length > 0) {
            variantAttributesList.map((value) => {
              value.name = value.attributeNames;
              delete value.attributeNames;
              attributeArr.push(value);
            });
          }
          tempInitial[`variantId${identifier}`] = item?.productVariantId;
          tempInitial[`attributeId${identifier}`] =
            item?.productVariantAttributeId;
          let finalValue = {
            extraVariantIdFieldName: `variantId${identifier}`,
            extraAttributeIdFieldName: `attributeId${identifier}`,
            [`variantId${identifier}`]: [...initialVariants],
            [`attributeId${identifier}`]: [...attributeArr],
            identifier,
          };
          return finalValue;
        });
        setInitialValues({ ...tempInitial });
        if (tempVariantArray.length > 0) {
          let tempSelectedArr = tempVariantArray.map((val) => {
            return val[`attributeId${val.identifier}`][0].productVariantId;
          });
          setSelectedExtraVariant([...tempSelectedArr]);
          setVariantArray([...tempVariantArray]);
        }
        setImageArray([...tempArray]);
        setVariantLoader(false);
        setAttributeLoader(false);
      }
    } catch (error) {
      setVariantLoader(false);
      logger(error);
    }
  };

  useEffect(() => {
    setVariantLoader(true);
    setCategoryLoader(true);
    getCategories();
    getSellerBrandDetails();
    if (productId) {
      getProductDetails();
    } else {
      getVariants();
    }
  }, []);

  useEffect(() => {
    // reload component on variant select
  }, [variants]);

  useEffect(() => {
    // reload component on add extra variant
  }, [variantArray]);

  const onSelectVariant = async (setFieldValue, e) => {
    try {
      setAttributeLoader(true);
      if (e) {
        setFieldValue("attributeId", undefined);
        if (selectedPrimaryVariant) {
          let variantsData = variants;
          variantsData.map((item) => {
            if (item.id.toString() === selectedPrimaryVariant.toString()) {
              item.disabled = false;
            }
          });
        }
        setSelectedPrimaryVariant(e);
        fetchVariantsAttributes(e);
        let data = variants;
        data.map((item) => {
          if (item.id.toString() === e.toString()) {
            item.disabled = true;
          }
        });
        setVariants([...data]);
      } else {
        setAttribute([]);
      }
    } catch (error) {
      logger(error);
    }
  };

  const onCategorySelect = async (setFieldValue, e) => {
    try {
      setSubCategoryLoader(true);
      setFieldValue("subCategoryId", undefined);
      setFieldValue("childCategoryId", undefined);
      fetchSubCategory(e);
    } catch (error) {
      logger(error);
    }
  };

  const onSubCategorySelect = async (setFieldValue, e) => {
    try {
      setChildCategoryLoader(true);
      setFieldValue("childCategoryId", undefined);
      fetchChildCategory(e);
    } catch (error) {
      logger(error);
    }
  };

  const mediaUrl = (data) => {
    let tempArray = imageArray;
    const { basePath, baseUrl, id } = data;
    tempArray.push({ basePath, baseUrl, id, fileType: "image" });
    setImageArray([...tempArray]);
  };

  const removeProductImage = (setFieldValue, index) => {
    let tempArray = imageArray;
    tempArray.splice(index, 1);
    if (tempArray.length === 0) {
      setFieldValue("productImage", "");
    }
    setImageArray([...tempArray]);
  };

  const addNewVariant = () => {
    try {
      let tempArr = variantArray;
      let tempSelectedVar = selectedExtraVariant;
      let identifier = Date.now();
      let tempValues = {
        extraVariantIdFieldName: `variantId${identifier}`,
        extraAttributeIdFieldName: `attributeId${identifier}`,
        [`variantId${identifier}`]: [...variants],
        [`attributeId${identifier}`]: [],
        identifier,
      };
      tempSelectedVar.push(null);
      tempArr.push(tempValues);
      setSelectedExtraVariant([...tempSelectedVar]);
      setVariantArray([...tempArr]);
    } catch (error) {
      logger(error);
    }
  };

  const removeVariant = (index) => {
    let tempArr = variantArray;
    let tempAttributeArray =
      tempArr[index][`attributeId${tempArr[index].identifier}`];
    if (tempAttributeArray.length > 0) {
      let data = variants;
      data.map((item) => {
        if (
          item.id.toString() ===
          tempAttributeArray[0].productVariantId.toString()
        ) {
          item.disabled = false;
        }
      });
      setVariants([...data]);
    }
    if (tempArr.length >= index + 1) {
      tempArr.splice(index, 1);
    }
    let tempSelectedVar = selectedExtraVariant;
    tempSelectedVar.splice(index, 1);
    setSelectedExtraVariant([...tempSelectedVar]);
  };

  const fetchAttributesOfVariants = async (
    id,
    attributeId,
    setFieldValue,
    extraVariantIndex
  ) => {
    try {
      setFieldValue(attributeId, undefined);
      let temp = variants;
      let tempSelectedVariantsArray = selectedExtraVariant;
      temp.map((item) => {
        if (item.id.toString() === id.toString()) {
          item.disabled = true;
        }
      });
      if (tempSelectedVariantsArray[extraVariantIndex]) {
        temp.map((item) => {
          if (
            item.id.toString() ===
            tempSelectedVariantsArray[extraVariantIndex].toString()
          ) {
            item.disabled = false;
          }
        });
      }
      tempSelectedVariantsArray.splice(extraVariantIndex, 1, id);
      setVariants([...temp]);
      setSelectedExtraVariant([...tempSelectedVariantsArray]);
      const response = await ProductVariantsServices.getVariantDetails(id);
      let tempArr = response.data.productVariantAttributeDetail;
      tempArr.map((item) => {
        item.name = item.attributeNames;
      });
      if (response.success) {
        const variantList = variantArray.map((item) => {
          if (item.extraAttributeIdFieldName === attributeId) {
            item[item.extraAttributeIdFieldName] = tempArr || [];
          }
          return item;
        });
        setVariantArray([...variantList]);
      }
    } catch (error) {
      logger(error);
    }
  };

  const onSubmit = async (value) => {
    try {
      setLoading(true);
      let productVariantArr = [];
      if (value.variantId && value.attributeId) {
        productVariantArr.push({
          productVariantId: value.variantId,
          productVariantAttributeId: value.attributeId,
        });
      }
      if (variantArray.length > 0) {
        variantArray.map((item) => {
          if (
            value[`variantId${item.identifier}`] &&
            value[`attributeId${item.identifier}`]
          ) {
            productVariantArr.push({
              productVariantId: value[`variantId${item.identifier}`],
              productVariantAttributeId: value[`attributeId${item.identifier}`],
            });
          }
        });
      }
      if (productVariantArr.length > 0) {
        value.productVariant = productVariantArr;
      }
      let productImagesArray = [];
      if (imageArray.length > 0) {
        imageArray.map((item) => {
          productImagesArray.push({
            basePath: item.basePath,
          });
        });
      } else {
        modalNotification({
          type: "error",
          message: t("validation.sellerProductDetails.atLeastOneImageRequired"),
        });
        setLoading(false);
        return false;
      }
      if (value.productVideo) {
        productImagesArray.push({
          basePath: value.productVideo,
        });
      }
      let bodyData = {
        productName: value.productName,
        price: value.price,
        brandId: sellerBrand.brandId,
        categoryId: value.categoryId,
        childCategoryId: value.childCategoryId,
        subCategoryId: value.subCategoryId,
        specification: value.specification,
        overview: value.overview,
        weight: value.weight,
        unit: value.unit,
        productVariant: value.productVariant,
        productImages: productImagesArray,
      };

      let response;
      if (productId) {
        response = await SellerProductServices.updateProduct(
          parseInt(productId),
          bodyData
        );
      } else {
        response = await SellerProductServices.addProduct(bodyData);
      }
      if (response.success) {
        modalNotification({
          type: "success",
          message: response.message,
        });
        setLoading(false);
        navigate(routesMap.PRODUCTS.path);
      }
    } catch (error) {
      setLoading(false);
      logger(error);
    }
  };

  const breadCrumb = [
    {
      name: t("text.sellerProductDetails.product"),
      path: routesMap.PRODUCTS.path,
    },
    {
      name: productId
        ? t("text.sellerProductDetails.editProduct")
        : t("text.sellerProductDetails.addNewProduct"),
      path: "#",
    },
  ];

  return (
    <>
      <MetaTags
        title={
          productId
            ? t("text.sellerProductDetails.editProduct")
            : t("text.sellerProductDetails.addNewProduct")
        }
      />
      <main className="main-content addProduct pb">
        {/* <div className="container"> */}
        <SellerBreadcrumb breadcrumb={breadCrumb} />
        <section className="myAccount pb">
          <AddEditProduct
            loading={loading}
            categories={categories}
            subCategories={subCategories}
            childCategories={childCategories}
            apiEndPoints={SellerMedia.productImage}
            videoApiEndPoint={SellerMedia.productVideo}
            variants={variants}
            attribute={attribute}
            onCategorySelect={onCategorySelect}
            onSubCategorySelect={onSubCategorySelect}
            onSelectVariant={onSelectVariant}
            onSubmit={onSubmit}
            mediaUrl={mediaUrl}
            imageArray={imageArray}
            removeProductImage={removeProductImage}
            sellerBrand={sellerBrand}
            productId={productId}
            variantArray={variantArray}
            addNewVariant={addNewVariant}
            removeVariant={removeVariant}
            fetchAttributesOfVariants={fetchAttributesOfVariants}
            initialValues={initialValues}
            productVideo={productVideo}
            setProductVideo={setProductVideo}
            categoryLoader={categoryLoader}
            subCategoryLoader={subCategoryLoader}
            childCategoryLoader={childCategoryLoader}
            variantLoader={variantLoader}
            attributeLoader={attributeLoader}
          />
        </section>
        {/* </div> */}
      </main>
    </>
  );
}

export default AddEditSellerProduct;
