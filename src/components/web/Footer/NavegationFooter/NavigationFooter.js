import React from 'react';
//antd components
import { Row, Col } from "antd";
//icons
import { BookOutlined, CodeOutlined, DatabaseOutlined, RightCircleOutlined } from "@ant-design/icons";
//SASS
import "./NavigationFooter.scss";

export default function NavigationFooter() {
    return (
        <Row className="navigation-footer">
            <Col md={24}>
                <h3>Navigation</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft />
            </Col>
            <Col md={12}>
                <RenderListRight />
            </Col>
        </Row>
    );
}

function RenderListLeft() {
    return (
        <ul>
            <li>
                <a href="/">
                    <span><BookOutlined></BookOutlined></span>
                    Books
                </a>
            </li>
            <li>
                <a href="/contact">
                    <span><CodeOutlined /></span>
                    Develop
                </a>
            </li>
            <li>
                <a href="/">
                    <span><DatabaseOutlined /></span>
                    Databases
                </a>
            </li>
            <li>
                <a href="/">
                    <span><RightCircleOutlined /></span>
                    Political privacy
                </a>
            </li>
        </ul>
    );
}

function RenderListRight() {
    return (
        <ul>
            <li>
                <a href="/">
                    <span><BookOutlined></BookOutlined></span>
                    Books
                </a>
            </li>
            <li>
                <a href="/contact">
                    <span><CodeOutlined /></span>
                    Develop
                </a>
            </li>
            <li>
                <a href="/">
                    <span><DatabaseOutlined /></span>
                    Databases
                </a>
            </li>
            <li>
                <a href="/">
                    <span><RightCircleOutlined /></span>
                    Political privacy
                </a>
            </li>
        </ul>
    );
}