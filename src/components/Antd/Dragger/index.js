import { Upload } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import {
  // getSessionStorageToken,
  getLocalStorageToken,
  removeSessionStorageToken,
} from "../../../utils";
import modalNotification from "../../../utils/notifications";

const { Dragger } = Upload;

function AntDragger({ label = "", apiEndPoints, onFileUploaded }) {
  const apiToken = getLocalStorageToken();

  const props = {
    name: "file",
    multiple: true,
    action: apiEndPoints,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${apiToken}`,
    },
    onChange(info) {
      const { status, response } = info.file;
      if (status === "done") {
        modalNotification({
          type: "success",
          message: `${info.file.name} file uploaded successfully.`,
        });
        onFileUploaded(response.data.basePath);
      } else if (status === "error") {
        modalNotification({
          type: "error",
          message: "Error",
          description: `${info.file.name} file upload failed. ${info.file.response.detail}`,
        });
        if (response.detail.search("authenticated") !== -1) {
          removeSessionStorageToken();
        }
      }
    },
    onDrop() {},
  };
  return (
    <div>
      <label htmlFor="dragger">{label}</label>
      <div id="dragger" className="dragger-full-width">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </div>
    </div>
  );
}

export default AntDragger;
