import React from 'react';
//antd components
import { Row, Col, Card } from "antd";
//antd icons
import { ClockCircleOutlined, KeyOutlined, MessageOutlined } from "@ant-design/icons";
//SASS
import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
    return (
        <Row className="how-my-courses-work">
            <Col lg={24} className="how-my-courses-work__title">
                <h2>How works my courses</h2>
                <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora est laborum, ea dolores non minus illo labore
                    impedit nihil dolorum assumenda quisquam quis maxime asperiores omnis architecto optio cumque minima.
                </h3>
            </Col>

            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo
                            icon={<ClockCircleOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<KeyOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<MessageOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<ClockCircleOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<ClockCircleOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<ClockCircleOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                </Row>

                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo
                            icon={<ClockCircleOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<KeyOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<MessageOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<ClockCircleOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<ClockCircleOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo
                            icon={<ClockCircleOutlined />}
                            title="Exaple title"
                            description="Description example"
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />

        </Row>
    );
}


function CardInfo(props) {
    const { icon, title, description } = props;
    const { Meta } = Card;

    return (
        <Card className="how-my-courses-work__card">
            <span>
                {icon}
            </span>
            <Meta title={title} description={description}></Meta>
        </Card>
    )

}