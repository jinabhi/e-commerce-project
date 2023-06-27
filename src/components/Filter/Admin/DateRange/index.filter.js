import { Form } from "antd";
import React from "react";
import { DatePicker } from "../../../Antd";

export default function DateRangePicker() {
  const formRef = React.createRef();
  const onSubmit = () => {};

  return (
    <div className="innerForm">
      <Form onFinish={onSubmit} ref={formRef}>
        <Form.Item name="fromDate" label="From Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="toDate" label="To Date">
          <DatePicker />
        </Form.Item>
      </Form>
    </div>
  );
}
