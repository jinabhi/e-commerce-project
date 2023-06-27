import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Upload, Form } from "antd";
import { useField } from "formik";
// import { useTranslation } from "react-i18next";
import {
  getLocalStorageToken,
  removeSessionStorageToken,
} from "../../../utils";
import modalNotification from "../../../utils/notifications";

function VideoUploader({
  label = "",
  apiEndPoints,
  name,
  fileType = "video/mp4",
  setProductVideo,
  uploadButtonHtml,
  ...rest
}) {
  // const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };
  const apiToken = getLocalStorageToken();

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }
  const beforeUpload = (file) => {
    const isFileType = file.type === fileType;
    if (!isFileType) {
      modalNotification({
        type: "error",
        message: `Video format is not supported`,
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      modalNotification({
        type: "error",
        message: "Video size should not exceed 5 MB",
      });
    }
    return isFileType && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else {
      const { status, response } = info.file;
      if (status === "done") {
        setLoading(false);
        modalNotification({
          type: "success",
          message: "Video Uploaded Successfully",
        });
        if (setProductVideo) {
          setProductVideo(response.data);
        }
        helpers.setValue(response.data.basePath);
      } else if (status === "error") {
        setLoading(false);
        modalNotification({
          type: "error",
          message: "Video upload failed.",
        });
        if (response.detail.search("authenticated") !== -1) {
          removeSessionStorageToken();
        }
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined className="text-white" />
      ) : (
        <>
          {uploadButtonHtml || (
            <div className="my-auto text-center">
              <span className="icon-camera" />
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <Form.Item
      label={label}
      className="flex-col"
      name={name}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={apiEndPoints}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        {...rest}
        headers={{
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${apiToken}`,
        }}
      >
        {uploadButton}
      </Upload>
    </Form.Item>
  );
}

export default VideoUploader;
