import { Formik, Form } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  Input as TextInput,
  CommonButton,
  UploadInput,
  AntTooltip as Tooltip,
} from "../../../index";
import validation from "./validation";

export default function AddBannerForm({ onSubmit, loading, apiEndPoints }) {
  const initialValues = {
    bannerImage: "",
    title: "",
    description: "",
  };

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={onSubmit}
      validationSchema={validation()}
      enableReinitialize
    >
      {(props) => {
        return (
          <Form>
            <div className="form-group">
              <label className="form-label">{t("text.banner.image")}</label>
              <div className="form-group">
                <div className="upload_photo mb-2 mb-md-3 mx-auto text-center">
                  <div className="img-box">
                    <UploadInput
                      name="bannerImage"
                      apiEndPoints={apiEndPoints}
                      type="file"
                      setFieldValue={props.handleChange}
                      aspect={10 / 5}
                    >
                      <Tooltip
                        overlayInnerStyle={{ width: "80%" }}
                        placement="right"
                        color="#b9923b"
                        promptText={t("text.common.imageTooltip")}
                      >
                        <label className="mb-0 ripple-effect">
                          <em className="icon ni ni-pen2" />
                        </label>
                      </Tooltip>
                    </UploadInput>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {t("text.banner.bannerTitle")}
              </label>
              <div className="form-control-wrap ">
                <TextInput
                  id="title"
                  className="form-control"
                  name="title"
                  disabled={false}
                  variant="standard"
                  type="text"
                  placeholder={t("text.banner.titlePlaceholder")}
                  setFieldValue={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                {t("text.banner.bannerDescription")}
              </label>
              <div className="form-control-wrap ">
                <div className="form-control-wrap ">
                  <TextInput
                    id="description"
                    className="form-control"
                    name="description"
                    disabled={false}
                    variant="standard"
                    type="text"
                    placeholder={t("text.banner.descriptionPlaceholder")}
                    setFieldValue={props.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group text-center">
              <CommonButton
                htmlType="submit"
                type="submit"
                loading={loading}
                extraClassName="btn btn-primary ripple-effect"
              >
                {t("text.common.add")}
              </CommonButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
