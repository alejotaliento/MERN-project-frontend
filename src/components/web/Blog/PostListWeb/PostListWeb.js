import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from "moment"; import "moment/locale/es";
import queryString from "query-string";
import { Helmet } from 'react-helmet';
//api
import { getPostsApi } from "../../../../api/post";
//antd components
import { Spin, List, notification } from "antd";
//custom components
import Pagination from "../../../Pagination";
//SASS
import "./PostListWeb.scss";

export default function PostListWeb(props) {
    const { location, history } = props;
    const [posts, setPosts] = useState(null);
    const { page = 1 } = queryString.parse(location.search);

    useEffect(() => {
        getPostsApi(12, page)
            .then(response => {
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    });
                } else {
                    setPosts(response.posts);
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Server error"
                });
            });
    }, [page]);

    if (!posts) {
        return (
            <Spin tip="Dowloading" style={{ width: "100%", padding: "200px 0" }} />
        );
    }

    return (
        <>
        <Helmet>
            <title>Blog | Alejo Taliento</title>
            <meta name="description" content="Blog page example" data-react-helmet="true" />
        </Helmet>
        <div className="posts-list-web">
            <h1>Blog</h1>
            <List
                dataSource={posts.docs}
                renderItem={post => <Post post={post} />}
            />
            <Pagination posts={posts} location={location} history={history} />
        </div>
        </>
    )
};

function Post(props) {
    const { post } = props;
    const day = moment(post.date).format("DD");
    const month = moment(post.data).format("MMMM");
    return (
        <List.Item className="post">
            <div className="post__date">
                <span>{day}</span>
                <span>{month}</span>
            </div>
            <List.Item.Meta title={<Link to={`blog/${post.url}`}>{post.title}</Link>} />
        </List.Item >
    );
};
