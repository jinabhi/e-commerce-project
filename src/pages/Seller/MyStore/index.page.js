import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MetaTags, PageHeader, SearchInput } from "../../../components";
import { MyStoreServices } from "../../../services";
import { logger } from "../../../utils";
import StoreProduct from "./storeProduct";

function MyStore() {
  const { t } = useTranslation();
  const [storeData, setStoreData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  const getStoreData = async () => {
    setLoading(true);
    try {
      let queryParams = {
        name: searchName,
      };
      const res = await MyStoreServices.getMyStoreService({ queryParams });
      const { success, data } = res;
      if (success) {
        setStoreData(data);
        setLoading(false);
      }
    } catch (error) {
      logger(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStoreData();
  }, [searchName]);

  const getSearchValue = (val) => {
    setSearchName(val);
  };

  return (
    <>
      <div className="mb-30">
        <MetaTags title={t("text.myStore.title")} />
        <PageHeader heading={t("text.myStore.title")}>
          <SearchInput
            getSearchValue={getSearchValue}
            searchPlaceholder={t("text.myStore.searchPlaceHolder")}
            extraClassName="form-group form-group-search mb-0 mt-20"
          />
        </PageHeader>
        <StoreProduct storeData={storeData} loading={loading} />
      </div>
    </>
  );
}

export default MyStore;
