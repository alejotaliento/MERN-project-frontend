// react Component
import React, { useState } from "react";

// antd Components
import { Form, Input, Button, Checkbox, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";

// validation functions
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";

// API
import { signUpApi } from "../../../api/user";

// SASS
import "./RegisterForm.scss";

// icons
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export default function RegisterForm() {
  // Component state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });

  // validation state
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    //console.log(e.target.name);
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs, //... como operador de “propagación” para pasar el objeto de props completo.
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({
        ...formValid, //... como operador de “propagación” para pasar el objeto de props completo.
        [name]: emailValidation(e.target),
      });
    }
    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6),
      });
    }
    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };

  const register = async (e) => {
    //console.log(formValid);
    //console.log(inputs);

    const emailValue = inputs.email;
    const passwordValue = inputs.password;
    const repeatPasswordValue = inputs.repeatPassword;
    const privacyPolicyValue = inputs.privacyPolicy;

    if (
      !emailValue ||
      !passwordValue ||
      !repeatPasswordValue ||
      !privacyPolicyValue
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (passwordValue !== repeatPasswordValue) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales",
        });
      } else {
        //Conectar con el API y registrar el usuario.
        const result = await signUpApi(inputs);

        if (!result.status === "404") {
          notification["error"]({
            message: result.message,
          });
        } else {
          notification["success"]({
            message: result.message,
          });
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };

  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <FormItem>
        <span>
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="email"
            name="email"
            placeholder="Correo electronico"
            className="register-form__input"
            onChange={inputValidation}
            value={inputs.email}
          />
        </span>
      </FormItem>
      <FormItem>
        <span>
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            name="password"
            placeholder="Contraseña"
            className="register-form__input"
            onChange={inputValidation}
            value={inputs.password}
          />
        </span>
      </FormItem>
      <FormItem>
        <span>
          <Input
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            name="repeatPassword"
            placeholder="Repetir contraseña"
            className="register-form__input"
            onChange={inputValidation}
            value={inputs.repeatPassword}
          />
        </span>
      </FormItem>
      <FormItem>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leido y acepto la politica de privacidad.
        </Checkbox>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form__button"
        >
          Crear cuenta
        </Button>
      </FormItem>
    </Form>
  );
}
