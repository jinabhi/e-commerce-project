import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { logger, modalNotification } from "../../../../utils";
import {
  Breadcrumb,
  MetaTags,
  PageHeader,
  ChangePasswordForm,
} from "../../../../components";
import { AdminAuthServices } from "../../../../services";
import moduleRoutesMap from "../../../../routeControl";
import { selectUserData } from "../../../../redux/AuthSlice/index.slice";

function ChangePassword() {
  const { t } = useTranslation();
  const userData = useSelector(selectUserData);
  const [loading, setLoading] = useState(false);
  const [checkRegex, setCheckRegex] = useState({
    capital: false,
    number: false,
    length: false,
  });

  const onSubmit = async (value, resetForm) => {
    setLoading(true);
    try {
      const response = await AdminAuthServices.changePasswordService(value);
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setLoading(false);
        resetForm();
        setCheckRegex({
          capital: false,
          number: false,
          length: false,
        });
      }
    } catch (error) {
      logger(error);
    }
    setLoading(false);
  };
  const breadcrumb = [
    {
      path: moduleRoutesMap[userData?.userRole].DASHBOARD.path,
      name: t("text.common.dashboard"),
    },
    {
      path: "#",
      name: t("text.changePassword.title"),
    },
  ];
  return (
    <>
      <MetaTags title={t("text.changePassword.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.changePassword.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="border myAccount card">
            <div className="card-aside-wrap ">
              <div className="card-content w-100">
                <div className="card-inner">
                  <div className="formSection readOnly">
                    <ChangePasswordForm
                      loading={loading}
                      onSubmit={onSubmit}
                      checkRegex={checkRegex}
                      setCheckRegex={setCheckRegex}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
