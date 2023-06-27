import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";

import "./index.scss";

export default function Tabs({
  tabContent,
  tabsFor,
  border = true,
  visible,
  borderedClass = "card card-bordered",
  setActiveKey,
  activeKey,
  onTabChange,
}) {
  const [key, setKey] = useState(tabContent[0].key);

  return (
    <>
      <Tab.Container
        id="controlled-tab-example"
        defaultActiveKey={key}
        activeKey={activeKey}
        onSelect={(k) => {
          setKey(k);
          if (setActiveKey) {
            setActiveKey(k);
          }
          if (onTabChange) {
            onTabChange(k);
          }
        }}
        className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card border-0"
      >
        {border ? (
          <div className={`${borderedClass}`}>
            <div className={visible ? "nav nav-tabs mt-n3" : ""}>
              <div className="card-aside-wrap">
                <div className="card-content driverTab-card">
                  <Nav
                    variant="tabs"
                    className="nav-tabs-mb-icon nav-tabs-card border-0"
                  >
                    {tabContent.map((item) => {
                      return (
                        <Nav.Item>
                          <Nav.Link eventKey={item.key}>{item.name}</Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={visible ? "nav nav-tabs mt-n3" : ""}>
            <div className="card-aside-wrap">
              <div className="card-content driverTab-card">
                <Nav
                  variant="tabs"
                  className="nav-tabs-mb-icon nav-tabs-card border-0"
                >
                  {tabContent.map((item) => {
                    return (
                      <Nav.Item>
                        <Nav.Link eventKey={item.key}>{item.name}</Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </div>
            </div>
          </div>
        )}

        <div
          className={tabsFor === "table" ? "card card-bordered" : "tab-content"}
        >
          <Tab.Content>
            {tabContent.map((item) => {
              return <Tab.Pane eventKey={item.key}>{item.content}</Tab.Pane>;
            })}
          </Tab.Content>
        </div>
      </Tab.Container>
    </>
  );
}
