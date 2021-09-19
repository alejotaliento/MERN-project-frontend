import React from 'react';
//antd components
import { Row, Col } from "antd";
//SASS
import "./MainBanner.scss";

export default function MainBanner(props) {
    return (
        <div className="main-banner">
            <div className="main-banner__dark"></div>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <h2>Custom title example</h2>
                    <h3>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Reprehenderit a nam dolorem excepturi enim, alias dolor hic magnam, iste ea perspiciatis necessitatibus atque
                        dolore deleniti sunt! Officiis tempore facere quam?
                    </h3>
                </Col>
                <Col lg={4} />
            </Row>
        </div>
    );
}