import React, { useState } from 'react';
// antd components
import { Form, Input, Button, Select, notification } from "antd";
// antd icons
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
//api
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
//SASS
import "./AddMenuWebForm.scss";

export default function AddMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb } = props;
    const [menuWebData, setMenuWebData] = useState([]);

    const addMenu = () => {
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url,
        }

        if (!finalData.title || !finalData.url || !menuWebData.url) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
        } else {
            const accessToken = getAccessTokenApi();
            finalData.active = false;
            finalData.order = 1000;

            addMenuApi(accessToken, finalData)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                    setMenuWebData({});
                    finalData = {}
                })
                .catch((err) => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    }

    return (
        <div className="add-menu-web-form">
            <AddForm
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                addMenu={addMenu}
            ></AddForm>
        </div>
    )
}

function AddForm(props) {
    const { Option } = Select;
    const { menuWebData, setMenuWebData, addMenu } = props;

    const selectBefore = (
        <Select
            defaultValue="https://"
            style={{ width: 90 }}
            onChange={e => setMenuWebData({ ...menuWebData, http: e })}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    )

    return (
        <Form className="form-add" onFinish={addMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
                    placeholder="Titulo"
                    value={menuWebData.title}
                    onChange={e => { setMenuWebData({ ...menuWebData, title: e.target.value }) }}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LinkOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
                    addonBefore={selectBefore}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => { setMenuWebData({ ...menuWebData, url: e.target.value }) }}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="submit"
                    htmlType="submit"
                    className="btn-submit"
                >
                    Crear menu
                </Button>
            </Form.Item>
        </Form>
    )
}