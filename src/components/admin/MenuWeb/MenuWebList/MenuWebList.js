import React, { useState, useEffect } from 'react';
//antd components
import { Switch, Button, List, Modal as ModalAntd, notification } from "antd";
//antd icons 
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
//dimanic components
import DragSortableList from 'react-drag-sortable';
//custom componets
import Modal from "../../../Modal";
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";
//api
import { updateMenuApi, activateMenuApi, deleteMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
//SASS
import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
    const { menus, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItems = [];

        menus.forEach(item => {
            listItems.push({
                content: (
                    <MenuItem
                        item={item}
                        activateMenu={activateMenu}
                        editMenuWebModal={editMenuWebModal}
                        deleteMenu={deleteMenu}
                    >
                    </MenuItem>
                ),
            });
        });

        setListItems(listItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menus]);

    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();

        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateMenuApi(accessToken, _id, { order });
        })
    }

    const activateMenu = (menu, status) => {
        const accessToken = getAccessTokenApi();
        activateMenuApi(accessToken, menu._id, status)
            .then(response => {
                notification["success"]({
                    message: response,
                });
            });
    }

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo menu");
        setModalContent(<AddMenuWebForm setIsVisibleModal={setIsVisibleModal} setReloadMenuWeb={setReloadMenuWeb} />);
    }

    const editMenuWebModal = (menu) => {
        setIsVisibleModal(true);
        setModalTitle(`Editando menu: ${menu.title}`);
        setModalContent(<EditMenuWebForm setIsVisibleModal={setIsVisibleModal} setReloadMenuWeb={setReloadMenuWeb} menu={menu} />)
    }

    const deleteMenu = (menu) => {
        const accessToken = getAccessTokenApi();
        const { _id, title } = menu;
        confirm({
            title: "Eliminando menu",
            content: `¿Esta seguro que quiere eliminar ${title}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteMenuApi(accessToken, _id)
                    .then(response => {
                        notification["success"]({
                            message: response,
                        });
                        setReloadMenuWeb(true);
                    }).catch(err => {
                        notification["error"]({
                            message: err,
                        })
                    })
            }
        });
    }

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal}>Crear menu</Button>
            </div>

            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical">
                </DragSortableList>
            </div>

            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
                {modalContent}
            </Modal>
        </div>

    );
}

function MenuItem(props) {
    const { item, activateMenu, editMenuWebModal, deleteMenu } = props;

    return (
        <List.Item actions={[
            <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)} />,
            <Button type="primary" icon={<EditOutlined />} onClick={() => editMenuWebModal(item)}></Button>,
            <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteMenu(item)}></Button>
        ]}>
            <List.Item.Meta title={item.title} description={item.url}></List.Item.Meta>
        </List.Item>
    );
}