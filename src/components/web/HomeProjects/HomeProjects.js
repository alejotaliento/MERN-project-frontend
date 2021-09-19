import React from 'react';
//antd components
import { Row, Col, Card, Button } from "antd";
//react-router components
import { Link } from "react-router-dom";
//images
import reactHooks from "../../../assets/img/jpg/react-js-hooks.jpg";
import reactNative from "../../../assets/img/jpg/react-native.jpg";
import wordpress from "../../../assets/img/jpg/wordpress.jpg";
import jsES6 from "../../../assets/img/jpg/javascript-es6.jpg";
import cssGrid from "../../../assets/img/jpg/css-grid.jpg";
import prestashop from "../../../assets/img/jpg/prestashop-1-7.jpg";
//SASS
import "./HomeProjects.scss";

export default function HomeProjects() {
    return (
        <Row className="home-projects">
            <Col lg={24} className="home-projects__title">
                <h2>Projects based on personal abilities</h2>
            </Col>
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-projects">
                    <Col md={6}>
                        <CardProject
                            image={reactHooks}
                            title="Example"
                            subTitle="Description example"
                            link="#"
                        />
                    </Col>
                    <Col md={6}>
                        <CardProject
                            image={reactNative}
                            title="Example"
                            subTitle="Description example"
                            link="#"
                        />
                    </Col>
                    <Col md={6}>
                        <CardProject
                            image={wordpress}
                            title="Example"
                            subTitle="Description example"
                            link="#"
                        />
                    </Col>
                    <Col md={6}>
                        <CardProject
                            image={jsES6}
                            title="Example"
                            subTitle="Description example"
                            link="#"
                        />
                    </Col>
                    <Col md={6}>
                        <CardProject
                            image={cssGrid}
                            title="Example"
                            subTitle="Description example"
                            link="#"
                        />
                    </Col>
                    <Col md={6} />
                    <Col md={6} />
                    <Col md={6}>
                        <CardProject
                            image={prestashop}
                            title="Example"
                            subTitle="Description example"
                            link="#"
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
            <Col lg={24} className="home-projects__more">
                <Link to="/courses">
                    <Button>Ver mas</Button>
                </Link>
            </Col>
        </Row>
    )
}

function CardProject(props) {
    const { image, title, subTitle, link } = props;
    const { Meta } = Card;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card
                className="home-projects__card"
                cover={<img src={image} alt={title} />}
                actions={[<Button>Enter</Button>]}
            >
                <Meta title={title} description={subTitle} />
            </Card>
        </a>
    );
}