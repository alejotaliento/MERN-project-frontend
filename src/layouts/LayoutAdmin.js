import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
// SASS
import "./LayoutAdmin.scss";
// Components
import MenuTop from "../components/admin/MenuTop";
import MenuSider from "../components/admin/MenuSider";
import AdminSignIn from "../pages/admin/SingIn/SignIn";
// Hooks
import useAuth from "../hooks/useAuth";

export default function LayoutAdmin(props) {
  // destructuring
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  // hook
  const { user, isLoading } = useAuth();
  // destructuring state => se declara con corchetes []
  const [menuCollapsed, setMenuCollapsed] = useState(true);

  //LogIn before viewing any page-url
  if (!user && !isLoading) {
    return (
      //<>Fragment
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout className="layout-admin">
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content
            className="layout-admin__content"
            style={{ marginLeft: menuCollapsed ? "5rem" : "12.5rem" }}
          >
            <LoadRoutes routes={routes} />
          </Content>

          <Footer className="layout-admin__footer"><i>created by Alejo Taliento</i></Footer>
        </Layout>
      </Layout>
    );
  }

  return null;
}

//Component
function LoadRoutes({ routes }) {
  // LoadRoutes({routes}) == const { routes } = props;
  // console.log(routes);

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
