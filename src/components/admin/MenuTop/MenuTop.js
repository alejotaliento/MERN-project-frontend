import React from "react";
import { Link } from "react-router-dom";
// antd Components
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
// Logos
import MenuLogo from "../../../assets/img/png/menu-top-logo.png";
// SASS
import "./MenuTop.scss";
// Api
import { logOut } from "../../../api/auth";


export default function MenuTop(props) {
  // destructuring
  const { menuCollapsed, setMenuCollapsed } = props;

  const logout = () => {
    logOut();
    window.location.reload();
  }

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <Link to={"/admin"}>
          <img
            className="menu-top__left-logo"
            src={MenuLogo}
            alt="MENU_LOGO"
          ></img>
        </Link>

        <Button
          type="link"
          onClick={() => { setMenuCollapsed(!menuCollapsed); }}
          // if(menuCollapsed == true) {<MenuUnfoldOutlined/>} else {<MenuFoldOutlined/>}
          icon={menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        >
        </Button>
      </div>

      <div className="menu-top__right">
        <Button
          type="link"
          onClick={logout}
          icon={<PoweroffOutlined />} 
        ></Button>
      </div>
    </div>
  );
}
