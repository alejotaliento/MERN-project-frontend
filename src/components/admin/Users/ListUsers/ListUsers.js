import React, { useState, useEffect } from "react";
//antd
import { Switch, List, Avatar, Button, Modal as ModalAntd, notification } from "antd";
import {
    EditOutlined,
    StopOutlined,
    DeleteOutlined,
    CheckOutlined,
} from "@ant-design/icons";
// img
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
//components
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
//api
import { getAvatarApi, activateUserApi, deleteUserApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
// SASS
import "./ListUsers.scss";

// gobal var
const { confirm } = ModalAntd;

export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const showDeleteConfirm = (user) => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminando usuario",
            content: `¿Esta seguro que quiere eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id)
                    .then(response => {
                        notification["success"]({
                            message: response,
                        });
                        setReloadUsers(true);
                    }).catch(err => {
                        notification["error"]({
                            message: err,
                        })
                    })
            }
        });
    }

    const addUserModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo usuario");
        setModalContent(
            <AddUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />
        );
    }

    return (
        <div className="list-users">

            <div className="list-users__header">
                {<div className="list-users__header-switch">
                    <Switch
                        defaultChecked
                        onChange={() => setViewUsersActives(!viewUsersActives)}
                    />
                    <span>
                        {viewUsersActives ? "Usuario activos" : "Usuario inactivos"}
                    </span>
                </div>}

                <Button type="primary" className="" onClick={addUserModal}>
                    Nuevo usuario
                </Button>
            </div>

            {viewUsersActives ? (
                <UsersActive
                    usersActive={usersActive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                    showDeleteConfirm={showDeleteConfirm}
                />
            ) : (
                    <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />
                )}

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

function UsersActive(props) {
    const {
        usersActive,
        setIsVisibleModal,
        setModalTitle,
        setModalContent,
        setReloadUsers,
        showDeleteConfirm,
    } = props;

    const editUser = (user) => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(
            <EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />
        );
    }

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={(user) => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />}
        />
    );
}

function UserActive(props) {
    const { user, editUser, setReloadUsers, showDeleteConfirm } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);


    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, false)
            .then(response => {
                notification["success"]({
                    message: response,
                });
                setReloadUsers(true);
            }).catch(err => {
                notification["error"]({
                    message: err,
                });
            });
    }

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={() => editUser(user)}
                    icon={<EditOutlined />}
                ></Button>,
                <Button
                    type="danger"
                    onClick={desactivateUser}
                    icon={<StopOutlined />}
                ></Button>,
                <Button
                    type="danger"
                    onClick={e => showDeleteConfirm(user)}
                    icon={<DeleteOutlined />}
                ></Button>,
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                title={`
                ${user.name ? user.name : "..."}
                ${user.lastname ? user.lastname : "..."}
            `}
                description={user.email}
            />
        </List.Item>
    )
}

function UsersInactive(props) {
    const { usersInactive, setReloadUsers, showDeleteConfirm } = props;
    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={(user) => <UserInactive user={user} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />}
        />
    );
}

function UserInactive(props) {
    const { user, setReloadUsers, showDeleteConfirm } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    const activateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, true)
            .then(response => {
                notification["success"]({
                    message: response,
                });
                setReloadUsers(true);
            })
            .catch(err => {
                notification["error"]({
                    message: err,
                });
            });
    }

    return (
        <List.Item
            actions={[
                <Button
                    type="primary"
                    onClick={activateUser}
                    icon={<CheckOutlined />}
                ></Button>,
                <Button
                    type="danger"
                    onClick={e => showDeleteConfirm(user)}
                    icon={<DeleteOutlined />}
                ></Button>,
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                title={`
                ${user.name ? user.name : "..."}
                ${user.lastname ? user.lastname : "..."}
            `}
                description={user.email}
            />
        </List.Item>
    );
}