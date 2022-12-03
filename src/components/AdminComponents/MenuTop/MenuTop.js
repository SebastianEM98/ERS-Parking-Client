import React from "react";
import Logo from "../../../assets/img/png/Logo.png";
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { logout } from "../../../api/auth";
import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const userLogout = () => {
    console.log("Cerrando sesión");
    logout();
    window.location.href = "/login";
  };
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={Logo} alt="Alternate" />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={userLogout}>
          <LogoutOutlined />Cerrar sesión
        </Button>
      </div>
    </div>
  );
}