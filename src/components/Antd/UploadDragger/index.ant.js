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

function UploadDragger({
  children = <></>,
  label = "",
  apiEndPoints,
  name,
  fileType = "text/csv",
  ...rest
}) {
  const { Dragger } = Upload;
  // const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [field, meta, helpers] = useField(name);
  const config = { ...field, ...rest };
  const apiToken = getLocalStorageToken();
  const [fileName, setFileName] = useState("");

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }
  const beforeUpload = (file) => {
    const isFileType = file.type === fileType;
    if (!isFileType) {
      modalNotification({
        type: "error",
        message: `File format is not supported`,
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      modalNotification({
        type: "error",
        message: "File size should not exceed 5 MB",
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
        setFileName(info.file.name);
        modalNotification({
          type: "success",
          message: `${info.file.name} file uploaded successfully.`,
        });
        helpers.setValue(response.data.basePath);
      } else if (status === "error") {
        setLoading(false);
        modalNotification({
          type: "error",
          message: `${info.file.name} file upload failed. ${info.file.response.detail}`,
        });
        if (response.detail.search("authenticated") !== -1) {
          removeSessionStorageToken();
        }
      }
    }
  };
  return (
    <Form.Item
      label={label}
      className="flex-col"
      name={name}
      help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
      validateStatus={config.error ? "error" : "success"}
    >
      <Dragger
        name="file"
        type="file"
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
        {children}
        {loading ? (
          <LoadingOutlined className="text-white" />
        ) : (
          <h5 className="text-white py-3">{fileName}</h5>
        )}
      </Dragger>
    </Form.Item>
  );
}

export default UploadDragger;
