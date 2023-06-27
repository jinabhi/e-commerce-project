import { useTranslation } from "react-i18next";
import { StarRate, GlobalLoader, CommonButton } from "../../..";
import { dateFormatWithMonth } from "../../../../helpers";
import { dateFormatter } from "../../../../utils";
import { textFormatter } from "../../../Formatter/index";

export function UserReviewBox({
  reviewRatingData,
  loading,
  showMoreDocuments,
  showMoreButton,
  showLessButton,
  showLessDocument,
}) {
  const { t } = useTranslation();
  return (
    <div className="card reviewBoxList">
      {reviewRatingData?.length > 0 ? (
        <>
          {reviewRatingData?.map((item, index) => {
            return (
              <div className="card-inner border mb-4" key={index}>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="reviewBox">
                    <h6 className="reviewBox_title mb-1">
                      {textFormatter(item?.User?.firstName)}{" "}
                      {textFormatter(item?.User?.lastName)}
                    </h6>
                    <p className="reviewBox_date mb-2">
                      {" "}
                      {dateFormatter(item?.createdAt, dateFormatWithMonth)}
                    </p>
                    <p className="reviewBox_comment">{item?.review}</p>
                  </div>
                  <div className="icon">
                    <StarRate rate={item?.rating} />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-center">
            {loading && <GlobalLoader />}
            {showMoreButton && (
              <>
                {" "}
                <CommonButton
                  type="button"
                  extraClassName="btn btn-primary mr-3"
                  onClick={showMoreDocuments}
                  loading={loading}
                >
                  {t("text.common.viewMore")}
                </CommonButton>
              </>
            )}
            {showLessButton && (
              <CommonButton
                type="button"
                extraClassName="btn btn-primary"
                onClick={showLessDocument}
                loading={loading}
              >
                {t("text.common.showLess")}
              </CommonButton>
            )}
          </div>
        </>
      ) : (
        <div className="card-inner border mb-4">
          <div className="d-flex justify-content-center align-items-center">
            <h6 className="reviewBox_title mb-1 ">
              {t("text.common.noRatingFound")}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}
