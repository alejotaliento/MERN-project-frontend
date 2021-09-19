import React, { useState } from 'react';
//api
import { suscribeNewsletterApi } from "../../../api/newsletter";
// antd components
import { Form, Input, Button, notification } from "antd";
//icons antd
import { UserOutlined } from "@ant-design/icons";
//SASS
import "./NewsLetter.scss";

export default function NewsLetter() {
    const [email, setEmail] = useState("");

    const onSubmit = (e) => {
         // eslint-disable-next-line no-useless-escape
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const resultValidation = emailValid.test(email);

        if (!resultValidation) {
            notification["error"]({
                message: "Invalid email address"
            });
        } else {
            suscribeNewsletterApi(email).then(response => {
                if (response.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    });
                } else {
                    notification["success"]({
                        message: response.message
                    });
                    setEmail("");
                }
            });
        }
    }

    return (
        <div className="newsletter">
            <h3>Newsletter</h3>
            <Form onFinish={onSubmit}>
                <Form.Item>
                    <Input
                        prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
                        placeholder="Correo electronico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Suscribe</Button>
                </Form.Item>

            </Form>
        </div>
    )
}
