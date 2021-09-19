import React from 'react';
import { useParams } from "react-router-dom";
//antd components
import { Row, Col } from "antd";
//custom components
import PostListWeb from "../components/web/Blog/PostListWeb";
import PostInfo from "../components/web/Blog/PostInfo";

export default function Blog(props) {
    const { location, history } = props;
    const { url } = useParams();


    return (
        <Row>
            <Col md={4} />
            <Col md={16}>
                {url ? (
                    <PostInfo url={url} />
                ) : (
                    <PostListWeb location={location} history={history} />
                )}
            </Col>
            <Col md={4} />

        </Row>
    );
}
