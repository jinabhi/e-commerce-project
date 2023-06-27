import React from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ru-RU";
import { Form } from "antd";
import { useField } from "formik";

import $ from "jquery";

export default function TextEditor({ name, ...rest }) {
  const [field, meta, helper] = useField(name);
  const config = { ...field, ...rest };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const onChange = (content) => {
    helper.setValue(content);
    helper.setError("");
    helper.setTouched(false);
  };
  $("button.close").removeAttr("data-dismiss");
  $("button.close").attr("data-bs-dismiss", "modal");
  return (
    <>
      <div className="summernote-basic">
        <div className="note-editor note-frame panel panel-default">
          <Form.Item
            help={meta.error && meta?.error && meta?.touched ? meta.error : ""}
            validateStatus={config.error ? "error" : "success"}
            // style={{ color: "white" }}
          >
            <ReactSummernote
              {...field}
              {...rest}
              options={{
                lang: "en-US",
                height: 250,
                dialogsInBody: true,
                tabsize: 2,
                toolbar: [
                  ["style", ["style"]],
                  [
                    "font",
                    ["bold", "italic", "underline", "strikethrough", "clear"],
                  ],
                  ["font", ["superscript", "subscript"]],
                  ["color", ["color"]],
                  ["fontsize", ["fontsize", "height"]],
                  ["para", ["ul", "ol", "paragraph"]],
                  ["table", ["table"]],
                  ["insert", ["link"]],
                  ["view", ["fullscreen", "codeview", "help"]],
                ],
              }}
              onChange={onChange}
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
}
