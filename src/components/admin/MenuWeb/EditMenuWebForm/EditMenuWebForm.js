import React, { useEffect, useState } from 'react';
//antd components
import { Form, Input, Button, notification } from "antd";
//antd icons
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
//api
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
//SASS
import "./EditMenuWebForm.scss";

export default function EditMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
    const [menuWebData, setMenuWebData] = useState(menu);

    useEffect(() => {
        setMenuWebData(menu);
    }, [menu]);

    const editMenu = (e) => {
        if (!menuWebData.title || !menuWebData.url) {
            notification["error"]({
                message: "Todos los campos son oblitorios",
            });
        } else {
            const accessToken = getAccessTokenApi();
            const { _id } = menuWebData;

            updateMenuApi(accessToken, _id, menuWebData)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    }

    return (
        <div className="edit-menu-web-form">
            <EditForm
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                editMenu={editMenu}
            >
            </EditForm>
        </div>
    );
}

function EditForm(props) {
    const { menuWebData, setMenuWebData, editMenu } = props;

    return (
        <Form className="form-edit" onFinish={editMenu}>

            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
                    placeholder="Titulo"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<LinkOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actiluzar menu
                </Button>
            </Form.Item>

        </Form>
    );
}