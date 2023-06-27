import "./style.scss";
import { Card as CardLayout, Layout, Space } from "antd";
import React from "react";

const { Header, Content, Footer } = Layout;

function CardComponent(props) {
  const { form, header, footer, spaceContent } = props;
  return (
    <>
      <Header>
        <h1>{header}</h1>
      </Header>
      <Content>
        <Space className="spaceGroup">
          {spaceContent}
          <div className="cardGroup">
            <CardLayout>{form}</CardLayout>
          </div>
        </Space>
      </Content>
      <Footer>
        <h1>{footer}</h1>
      </Footer>
    </>
  );
}

export default CardComponent;
