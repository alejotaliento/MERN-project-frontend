import React from "react";

// antd Components
import { Layout, Tabs } from "antd";

// icons
import { ArrowRightOutlined, UserAddOutlined } from "@ant-design/icons";

// routing Components
import { Redirect } from "react-router-dom";

// aditional Components
import RegisterForm from "../../../components/admin/RegisterForm";
import LoginForm from "../../../components/admin/LoginForm";
// SASS
import "./SignIn.scss";

// logos
import Logo from "../../../assets/img/png/menu-top-logo.png";

//auth
import { getAccessTokenApi } from "../../../api/auth";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccessTokenApi()) {
    return <Redirect to="/admin" />;
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="react-logo" />
        </h1>
        <div className="sign-in__content-tabs">
          <Tabs defaultActiveKey="1" type="card">
            <TabPane
              tab={
                <span>
                  <ArrowRightOutlined />
                  Entrar
                </span>
              }
              key="1"
            >
              <LoginForm></LoginForm>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <UserAddOutlined />
                  Nuevo usuario
                </span>
              }
              key="2"
            >
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
