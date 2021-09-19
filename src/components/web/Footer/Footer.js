import React from 'react';
// antd components
import { Layout, Row, Col } from "antd";
// custom components
import MyInfo from "./MyInfo";
import NavigationFooter from "./NavegationFooter";
import Newsletter from "../NewsLetter";
//SASS
import "./Footer.scss";

export default function Footer() {
    const { Footer } = Layout;

    return (
        <Footer className="footer">
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <Row>
                        <Col md={8}>
                            <MyInfo />
                        </Col>
                        <Col md={8}>
                            <NavigationFooter />
                        </Col>
                        <Col md={8}>
                            <Newsletter />
                        </Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>© 2019 ALL RIGHTS RESERVED​</Col>
                        <Col md={12}>ALEJO TALIENTO | WEB DEVELOPER</Col>
                    </Row>
                </Col>
                <Col md={4} />
            </Row>
        </Footer>
    );
}
