import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logger, modalNotification } from "../../../../utils";
import {
  Breadcrumb,
  MetaTags,
  PageHeader,
  ProfileForm,
} from "../../../../components";
import Media from "../../../../apiEndPoints/Admin/Media";
import { AdminAuthServices } from "../../../../services";
import {
  selectUserData,
  updateUserData,
} from "../../../../redux/AuthSlice/index.slice";
import moduleRoutesMap from "../../../../routeControl";

function AdminProfile() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const userData = useSelector(selectUserData);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const editProfile = () => {
    setIsEdit(true);
  };
  const cancelProfile = () => {
    formRef.current.resetForm({ ...userData });
    setIsEdit(false);
  };
  const onSubmit = async (value) => {
    setLoading(true);
    setIsEdit(true);
    try {
      let bodyData = { ...value };
      bodyData.email = userData?.email;
      bodyData.phoneNumber = `${bodyData.phoneNumber}`;
      const response = await AdminAuthServices.editProfileService(bodyData);
      const { success, message } = response;
      if (success) {
        modalNotification({
          type: "success",
          message,
        });
        setLoading(false);
        setIsEdit(false);
        dispatch(updateUserData(response?.data));
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
      name: t("text.profile.title"),
    },
  ];
  return (
    <>
      <MetaTags title={t("text.profile.title")} />
      <div className="nk-block-head nk-block-head-sm">
        <div className="nk-block-between">
          <PageHeader heading={t("text.profile.title")}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </PageHeader>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-xl-6">
          <div className="border myAccount card">
            <div className="card-aside-wrap ">
              <div className="card-content w-100">
                <div className="card-inner">
                  <div className="formSection readOnly">
                    <ProfileForm
                      loading={loading}
                      isEdit={isEdit}
                      onSubmit={onSubmit}
                      apiEndPoints={Media.profileImage}
                      userData={userData}
                      formRef={formRef}
                      editProfile={editProfile}
                      cancelProfile={cancelProfile}
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

export default AdminProfile;
