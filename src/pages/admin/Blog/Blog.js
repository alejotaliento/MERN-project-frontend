import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import queryString from "query-string";
//api
import { getPostsApi } from '../../../api/post';
//antd components
import { Button, notification } from "antd";
//custom components
import Modal from "../../../components/Modal";
import PostList from "../../../components/admin/Blog/PostList";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from "../../../components/admin/Blog/AddEditPostForm";
//SASS
import "./Blog.scss";

function Blog(props) {
    const { location, history } = props;
    const [posts, setPosts] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
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
        setReloadPosts(false);
    }, [page, reloadPosts]);

    const addPost = () => {
        setIsVisibleModal(true);
        setModalTitle("Creating new post");
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadPosts={setReloadPosts}
                post={null}
            />);
    }

    const editPost = post => {
        setIsVisibleModal(true);
        setModalTitle("Editing post");
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadPosts={setReloadPosts}
                post={post}
            />);
    }

    if (!posts) {
        return null;
    }

    return (
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary" onClick={addPost}>
                    New post
                </Button>
            </div>

            <PostList posts={posts} setReloadPosts={setReloadPosts} editPost={editPost}></PostList>
            <Pagination posts={posts} location={location} history={history} />

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width="75%"
            >
                {modalContent}
            </Modal>
        </div>
    );
};


export default withRouter(Blog);