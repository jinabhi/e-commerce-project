import { useTranslation } from "react-i18next";

export function OrderStatusTracker({ orderStatusData }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-md-4 orderStepCard">
        {orderStatusData?.map((items) => {
          return (
            <>
              <div className="profile-ud wider">
                <span className="profile-ud-label w-auto">
                  {t("text.manageOrders.orderStatus")} :
                </span>

                <span className="profile-ud-value text-left pl-2">
                  {items?.orderStatus}
                </span>
              </div>
              <div className="orderStep">
                {items?.data?.map((item) => {
                  return (
                    <>
                      {item?.status === "received" ? (
                        item?.data?.map((orderStatus) => {
                          return (
                            <>
                              {orderStatus?.value ? (
                                <>
                                  <div className="orderStep_item select">
                                    <h6>{orderStatus?.name}</h6>
                                    <p>{orderStatus?.value}</p>
                                  </div>
                                </>
                              ) : (
                                <div className="orderStep_item">
                                  <h6>{orderStatus?.name}</h6>
                                  <p>{orderStatus?.value}</p>
                                </div>
                              )}
                            </>
                          );
                        })
                      ) : (
                        <>
                          {item?.status === "delivered" ? (
                            item?.data?.map((orderStatus) => {
                              return (
                                <>
                                  {orderStatus?.value ? (
                                    <>
                                      <div className="orderStep_item select is-done">
                                        <h6>{orderStatus?.name}</h6>
                                        <p>{orderStatus?.value}</p>
                                        {orderStatus?.link && (
                                          <>
                                            <a href={orderStatus?.link}>
                                              {orderStatus?.link?.substring(
                                                0,
                                                30
                                              )}
                                              ...
                                            </a>
                                          </>
                                        )}
                                      </div>
                                    </>
                                  ) : null}
                                </>
                              );
                            })
                          ) : (
                            <>
                              {item.status === "canceled"
                                ? item?.data?.map((orderStatus) => {
                                    return (
                                      <>
                                        {orderStatus?.value ? (
                                          <>
                                            <div className="orderStep_item select is-done">
                                              <h6>{orderStatus?.name}</h6>
                                              <p>{orderStatus?.value}</p>
                                            </div>
                                          </>
                                        ) : null}
                                      </>
                                    );
                                  })
                                : null}
                            </>
                          )}
                        </>
                      )}
                      {item?.status === "packed" &&
                        item?.data?.map((orderStatus) => {
                          return (
                            <>
                              {orderStatus?.name === "Order Received" && (
                                <div className="orderStep_item select is-done">
                                  <h6>{orderStatus?.name}</h6>
                                  <p>{orderStatus?.value}</p>
                                </div>
                              )}

                              {orderStatus?.name === "Packed" && (
                                <div className="orderStep_item select">
                                  <h6>{orderStatus?.name}</h6>
                                  <p>{orderStatus?.value}</p>
                                </div>
                              )}
                              {orderStatus?.name === "Picked Up" && (
                                <div className="orderStep_item">
                                  <h6>{orderStatus?.name}</h6>
                                  <p>{orderStatus?.value}</p>
                                </div>
                              )}
                            </>
                          );
                        })}
                      {item?.status === "pickedUp" &&
                        item?.data?.map((orderStatus) => {
                          return (
                            <>
                              {orderStatus?.name === "Order Received" && (
                                <div className="orderStep_item select is-done">
                                  <h6>{orderStatus?.name}</h6>
                                  <p>{orderStatus?.value}</p>
                                </div>
                              )}
                              {orderStatus?.name === "Packed" && (
                                <div className="orderStep_item select is-done">
                                  <h6>{orderStatus?.name}</h6>
                                  <p>{orderStatus?.value}</p>
                                </div>
                              )}

                              {orderStatus?.name === "Picked Up" && (
                                <div className="orderStep_item select">
                                  <h6>{orderStatus?.name}</h6>
                                  <p>{orderStatus?.value}</p>
                                </div>
                              )}
                            </>
                          );
                        })}
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
