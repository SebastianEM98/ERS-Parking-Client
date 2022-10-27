import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/MenuComponents/MenuTop";
import MenuSider from "../components/MenuComponents/MenuSider";
import { GithubOutlined } from "@ant-design/icons";
import SignIn from "../pages/Admin/SignIn";
import { Button } from "antd";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { children } = props;
  const user = null;
  /* const location = useLocation(); */
  if (!user) {
    return (
      <>
        <SignIn />
        <Routes>
          <Route path="/admin/login/*" element={<SignIn />} />
        </Routes>
        {/* <Navigate to={"/admin/login"} state={{ from: location }} replace /> */}
      </>
    );
  }
  return (
    <Layout>
      <MenuSider menuCollapsed={menuCollapsed} />
      <Layout
        className="layout-admin"
        style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
      >
        <Header className="layout-admin__header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        </Header>
        <Content className="layout-admin__content">{children}</Content>
        <Footer className="layout-admin__footer">
          <Button type="link" onClick={() => console.log("Github")}>
            <GithubOutlined style={{ fontSize: "17px" }} /> SebastianEcheverryMejia
          </Button>
        </Footer>
      </Layout>
    </Layout>
  );
}
