import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GlobalLoader } from "../../../components";
import routesMap from "../../../routeControl/sellerRoutes";

function StoreProduct({ storeData = [], loading }) {
  const { t } = useTranslation();
  const [showChildCategory, setShowChildCategory] = useState(false);
  useEffect(() => {
    if (storeData.length > 0) {
      let totalChildCategory = 0;
      storeData.map((item) => {
        totalChildCategory += item.ChildCategories.length;
      });
      if (totalChildCategory > 0) {
        setShowChildCategory(true);
      }
    }
  }, [storeData]);

  return loading ? (
    <GlobalLoader />
  ) : showChildCategory ? (
    <div className="categorySect mb-30">
      {storeData.length > 0 ? (
        storeData.map((item) => {
          return (
            <div key={item?.id}>
              {item?.ChildCategories?.length > 0 && (
                <>
                  <h3 className="mt-4 subHeading mb-20 text-white">
                    {item?.name}
                  </h3>
                  <div className="categorySect_sub">
                    <div className="row g-2 g-sm-4">
                      {item?.ChildCategories?.map((value) => {
                        return (
                          <div
                            className="col-xl-auto col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
                            key={value?.id}
                          >
                            <Link
                              to={`${routesMap.SUBCATEGORY_PRODUCT.path}/${value.id}`}
                              className="categorybox w-100"
                            >
                              <div className="categorybox_img position-relative ">
                                <img
                                  className="w-100"
                                  src={value?.childCategoryImageUrl || "No Image"}
                                  alt={t("text.myStore.noImage")}
                                />
                              </div>
                              <div className="categorybox_info bg-850">
                                <h4 className="mb-0">{value?.name}</h4>
                                {value?.Products?.[0]?.totalProduct > 0 ? (
                                  <p className="mb-0">
                                    (
                                    {`${
                                      value?.Products?.[0]?.totalProduct
                                    } ${" "}`}
                                    {t("text.myStore.noOfProduct")})
                                  </p>
                                ) : (
                                  <p className="mb-0">({`${"No Products"}`})</p>
                                )}
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p className="mt-4 noRecord mb-0 text-center">
          {t("text.myStore.noRecordFound")}
        </p>
      )}
    </div>
  ) : (
    <p className="mt-4 noRecord mb-0 text-center">
      {t("text.myStore.noRecordFound")}
    </p>
  );
}

export default StoreProduct;
