import React, { useState, useEffect } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
//api
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/post";
//antd components
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
//icons
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons"
//SASS
import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
    const { setIsVisibleModal, setReloadPosts, post } = props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
        if (post) {
            setPostData(post);
        } else {
            setPostData({});
        }
    }, [post]);

    const processPost = e => {
        const { title, url, description, date } = postData;
        if (!title || !url || !description || !date) {
            notification["error"]({
                message: "All fields are required"
            });
        }

        if (!post) {
            addPost();
        } else {
            updatePost(post);
        }
    };

    const addPost = () => {
        const accessToken = getAccessTokenApi();

        addPostApi(accessToken, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(() => {
                notification["error"]({
                    message: "Server error"
                });
            });
    };

    const updatePost = post => {
        const accessToken = getAccessTokenApi();

        updatePostApi(accessToken, post._id, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(() => {
                notification["error"]({
                    message: "Server error"
                });
            });
    };

    return (
        <div className="add-edit-post-form">
            <AddEditForm postData={postData} setPostData={setPostData} post={post} processPost={processPost} />
        </div>
    );
};

function AddEditForm(props) {
    const { postData, setPostData, post, processPost } = props;

    const iconStyle = {
        color: "rgba(0,0,0,0.25)",
    };

    return (
        <Form
            className="add-edit-post-form"
            layout="inline"
            onFinish={processPost}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Input
                        prefix={<FontSizeOutlined style={iconStyle} />}
                        placeholder="Title"
                        value={postData.title}
                        onChange={e => setPostData({ ...postData, title: e.target.value })}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        prefix={<LinkOutlined style={iconStyle} />}
                        placeholder="URL"
                        value={postData.url}
                        onChange={e => setPostData({ ...postData, url: transformTextToURL(e.target.value) })}

                    />
                </Col>
                <Col span={8}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY HH:mm:ss"
                        placeholder="Date"
                        value={postData.date && moment(postData.date)}
                        onChange={(e, value) => {
                            setPostData({
                                ...postData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()
                            })
                        }}
                    />
                </Col>
            </Row>

            <Editor
                value={postData.description ? postData.description : ""}
                init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                }}
                onBlur={e => setPostData({ ...postData, description: e.target.getContent() })}
            />

            <Button type="primary" htmlType="submit" className="btn-submit">
                {post ? "Update" : "Create"}
            </Button>

        </Form>
    );
};

function transformTextToURL(text) {
    const url = text.replace(" ", "-");
    return url.toLowerCase();
};