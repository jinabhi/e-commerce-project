import { Collapse } from "antd";
import React from "react";
import { stringToHTML } from "../../../utils";

const { Panel } = Collapse;

function CollapseField({ text }) {
  return (
    <Collapse defaultActiveKey={["0"]} accordion>
      {text.map((item) => (
        <Panel header={item.question} key={item.key}>
          <p>{stringToHTML(item.answer)}</p>
        </Panel>
      ))}
    </Collapse>
  );
}
export default CollapseField;
