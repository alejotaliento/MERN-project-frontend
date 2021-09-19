import React from 'react';
//anrd components
import { Row, Col, Card, Avatar } from "antd";
//images
import NotAvatar from "../../../assets/img/png/no-avatar.png";
//SASS
import "./ReviewCourses.scss";

export default function ReviewCourses() {
    return (
        <Row className="review-courses">
            <Row className="review-courses__title">
                <Col lg={4} />
                <Col lg={16}>
                    <h2>
                        Forma parte de los +35 mil estudiantes que estan aprendiendo a travez de esta plataforma
                    </h2>
                </Col>
                <Col lg={4} />
            </Row>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview
                                name="Example"
                                subtitle="Random name"
                                avatar={NotAvatar}
                                review="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit voluptate recusandae repellat mollitia? Voluptates sint facere delectus nemo et eos sunt id maiores aperiam asperiores, hic quae, repellat totam velit!"
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="Example"
                                subtitle="Random name"
                                avatar={NotAvatar}
                                review="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit voluptate recusandae repellat mollitia? Voluptates sint facere delectus nemo et eos sunt id maiores aperiam asperiores, hic quae, repellat totam velit!"
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="Example"
                                subtitle="Random name"
                                avatar={NotAvatar}
                                review="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit voluptate recusandae repellat mollitia? Voluptates sint facere delectus nemo et eos sunt id maiores aperiam asperiores, hic quae, repellat totam velit!"
                            />
                        </Col> 
                        <Col md={8}>
                            <CardReview
                                name="Example"
                                subtitle="Random name"
                                avatar={NotAvatar}
                                review="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit voluptate recusandae repellat mollitia? Voluptates sint facere delectus nemo et eos sunt id maiores aperiam asperiores, hic quae, repellat totam velit!"
                            />
                        </Col> 
                        <Col md={8}>
                            <CardReview
                                name="Example"
                                subtitle="Random name"
                                avatar={NotAvatar}
                                review="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit voluptate recusandae repellat mollitia? Voluptates sint facere delectus nemo et eos sunt id maiores aperiam asperiores, hic quae, repellat totam velit!"
                            />
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="Example"
                                subtitle="Random name"
                                avatar={NotAvatar}
                                review="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit voluptate recusandae repellat mollitia? Voluptates sint facere delectus nemo et eos sunt id maiores aperiam asperiores, hic quae, repellat totam velit!"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} />
            </Row>
        </Row>
    );
}

function CardReview(props) {
    const { name, subtitle, avatar, review } = props;
    const { Meta } = Card;

    return (
        <Card className="review-courses__card">
            <p>{review}</p>
            <Meta
                avatar={<Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
        </Card>
    );
}