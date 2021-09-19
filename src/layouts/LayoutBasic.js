import React from "react";
//antd components
import { Layout, Col } from "antd";
import { Route, Switch } from "react-router-dom";
//custom components
import MenuTop from "../components/web/MenuTop";
import Footer from "../components/web/Footer";
// SASS
import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  // destructuring
  const { routes } = props;
  const { Content } = Layout;

  return (
    <>
      <Layout className="layout-basic">
        <Col md={24}>
          <MenuTop />
        </Col>

        <Content className="layout-basic__content">
          <LoadRoutes routes={routes} />
        </Content>

        <Footer/>
      </Layout>
    </>
  );
}

// Component
function LoadRoutes({ routes }) {
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