import React, { useState } from "react";

// api
import { signInApi } from "../../../api/user";

//constants utils
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

// antd components
import { Form, Input, Button, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
// antd icons
import { UserOutlined, LockOutlined } from "@ant-design/icons";

//SASS
import "./LoginForm.scss";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    //console.log(e.target.name);
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    const result = await signInApi(inputs);

    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification["success"]({
        message: "Login correcto",
      });

      window.location.href = "/admin";
    }
  };

  return (
    <Form className="login-form" onChange={changeForm} onFinish={login}>
      <FormItem>
        <Input
          prefix={<UserOutlined style={{ color: "rgb(0,0,0,.25" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="login-form__input"
        ></Input>
      </FormItem>
      <FormItem>
        <Input
          prefix={<LockOutlined style={{ color: "rgb(0,0,0,.25" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
        ></Input>
      </FormItem>
      <FormItem>
        <Button htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </FormItem>
    </Form>
  );
}
