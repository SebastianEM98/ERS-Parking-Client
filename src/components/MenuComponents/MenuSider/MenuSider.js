import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, AppstoreOutlined, PhoneOutlined} from "@ant-design/icons";
import "./MenuSider.scss";

export default function MenuSider(props) {
  const { menuCollapsed } = props;
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="aliceblue" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to={"/admin"}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/admin/menu-web"}>
            <AppstoreOutlined />
            <span className="nav-text">Menu</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={"/admin/contact"}>
            <PhoneOutlined />
            <span className="nav-text">Contact</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
