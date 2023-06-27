import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  CaretDownFilled,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { AntDropdown, Sidebar, FullPageLoader } from "../../components";
import { routesList } from "../../routes/index";
import AppLayout from "../Auth/index.layout";
import { removeLocalStorageToken } from "../../utils";

const { Content, Header } = Layout;

function MainLayout() {
  const navigate = useNavigate();

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="/edit-profile">Edit Profile</Link>,
          icon: <EditOutlined />,
        },
        {
          key: "2",
          label: <Link to="/change-password">Change Password</Link>,
          icon: <UnlockOutlined />,
        },
        {
          key: "3",
          label: (
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                removeLocalStorageToken(navigate);
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <AppLayout>
      <Layout
        hasSider
        style={{
          minHeight: "100vh",
        }}
      >
        <Sidebar routes={routesList()} />
        <Layout className="site-layout" style={{ marginLeft: 250 }}>
          <Header
            className="site-layout-background"
            style={{
              overflow: "auto",
              position: "fixed",
              top: 0,
              left: 250,
              right: 0,
              zIndex: 2000,
            }}
          >
            <div className="headerDropdown">
              <AntDropdown
                menu={menu}
                dropdownText={<UserOutlined />}
                dropdownIcon={<CaretDownFilled />}
              />
            </div>
          </Header>
          <React.Suspense fallback={<FullPageLoader />}>
            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
                marginTop: 90,
              }}
            >
              <Outlet />
            </Content>
          </React.Suspense>
        </Layout>
      </Layout>
    </AppLayout>
  );
}

export default MainLayout;
