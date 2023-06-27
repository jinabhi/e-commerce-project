import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { GlobalLoader, MetaTags, PageHeader } from "../../../components";
import { commonServices } from "../../../services";
import { logger } from "../../../utils";

export default function SellerNotification() {
  const { t } = useTranslation();
  const [notificationData, setNotificationData] = useState([]);
  const [setNotificationCount] = useState();
  const [loading, setLoading] = useState(false);
  const [sizePerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [pageSize] = useState(10);
  const [state, setState] = useState(true);

  const getSellerNotificationMark = async () => {
    try {
      const res = await commonServices.NotificationMarkService();
      const { success, data } = res;
      if (success) {
        setNotificationCount(data);
      }
    } catch (error) {
      logger(error);
    }
  };

  const getNotificationData = async () => {
    setLoading(true);
    try {
      let queryParams = {
        offset: (page - 1) * pageSize,
        limit: sizePerPage,
      };
      const res = await commonServices.getNotificationList({ queryParams });
      const { success, data } = res;
      if (success) {
        setTotalCount(Math.ceil(res?.data?.count / sizePerPage));
        getSellerNotificationMark();
        if (state) {
          setNotificationData(notificationData?.concat(data?.rows));
        }
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNotificationData();
  }, [page]);

  const totalTimeCount = (createdAt) => {
    let createTime = moment(createdAt);
    let currentTime = moment(new Date());
    let difference = createTime.from(currentTime);
    return difference;
  };

  function handleChange() {
    if (page < totalCount) {
      setPage((previous) => previous + 1);
      setState(true);
    }
  }

  return (
    <>
      <MetaTags title={t("text.sellerNotification.notification")} />
      <PageHeader heading={t("text.sellerNotification.notification")} />

      <InfiniteScroll
        dataLength={notificationData.length}
        next={handleChange}
        hasMore
        loader={loading && <GlobalLoader />}
      >
        <div className="notifications bg-850 radius-20">
          <div className="notifications_daywise">
            {notificationData?.map((notifications) => {
              return (
                <>
                  {" "}
                  <a
                    href="javascript:void(0)"
                    className={`d-flex align-items-center justify-content-between notify_item ${
                      notifications?.isUnreadStatus === "unread" ? "unread" : ""
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="mt-0">{notifications?.title}</h5>
                        <p className="mb-0">{notifications?.message}</p>
                      </div>
                    </div>
                    <p>{totalTimeCount(notifications?.createdAt)}</p>
                  </a>
                  <hr className="b-btm" />
                </>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
