import React from 'react';
import { Link } from "react-router-dom";
//api
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePostApi } from "../../../../api/post";
//antd components
import { List, Button, Modal as ModalAnt, notification } from "antd";
//icons
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
//SASS
import "./PostList.scss";

const { confirm } = ModalAnt;

export default function PostList(props) {
    const { posts, setReloadPosts, editPost } = props;

    const deletePost = post => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Deleting post",
            content: `Are you sure to delete ${post.title}?`,
            okText: "Delete",
            okType: "Cancel",
            onOk() {
                deletePostApi(accessToken, post._id)
                    .then(response => {
                        const typeNotification = response.code === 200 ? "success" : "warning";
                        notification[typeNotification]({
                            message: response.message
                        });
                        setReloadPosts(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: "Server error"
                        });
                    });
            }
        });
    };

    return (
        <div className="post-list">
            <List
                dataSource={posts.docs}
                renderItem={post => <Post post={post} deletePost={deletePost} editPost={editPost}></Post>}
            >

            </List>
        </div>
    );
};

const Post = (props) => {
    const { post, deletePost, editPost } = props;

    return (
        <List.Item
            actions={[
                <Link to={`/blog/${post.url}`} target="_blank">
                    <Button type="primary">
                        <EyeOutlined />
                    </Button>
                </Link>,
                <Button
                    type="primary"
                    onClick={() => editPost(post)}
                >
                    <EditOutlined />
                </Button>,
                <Button
                    type="danger"
                    onClick={() => deletePost(post)}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta
                title={post.title}
            >

            </List.Item.Meta>
        </List.Item>
    )
}