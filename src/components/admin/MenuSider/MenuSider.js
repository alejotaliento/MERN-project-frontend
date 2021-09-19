import React from "react";
// routing Components
import { Link, withRouter } from "react-router-dom";
// antd Components
import { Layout, Menu } from "antd";
// antd Icons
import { HomeOutlined, UserOutlined, MenuOutlined, BookOutlined, MessageOutlined } from "@ant-design/icons";
// SASS
import "./MenuSider.scss";

function MenuSider(props) {
  // destructuring
  const { Sider } = Layout;
  const { menuCollapsed, location } = props;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={location.pathname}>
        <Menu.Item key="/admin" icon={<HomeOutlined />}>
          <Link to={"/admin"}>
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="window.location.href.includes('/user')" icon={<UserOutlined />}>
          <Link to={"/admin/users"}>
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="window.location.href.includes('/menu')" icon={<MenuOutlined />}>
          <Link to={"/admin/menu"}>
            <span className="nav-text">Menu</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="window.location.href.includes('/courses')" icon={<BookOutlined />}>
          <Link to={"/admin/courses"}>
            <span className="nav-text">Cursos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="window.location.href.includes('/blog')" icon={<MessageOutlined />}>
          <Link to={"/admin/blog"}>
            <span className="nav-text">Blog</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);