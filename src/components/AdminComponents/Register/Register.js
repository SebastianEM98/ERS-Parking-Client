import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, IdcardOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import {  signUpApi } from "../../../api/user";
import "./Register.scss";
import{
  emailValidation,
  minLengthValidation,
} from "../../../validations/FormValidations";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    document: "",
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  const [formValid, setFormValid] = useState({
    name: false,
    lastname: false,
    document: false,
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
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
    console.log(formValid)
    const { type, name } = e.target;
    if ( type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if ( type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
    if ( type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const register = async (e) => {
    e.preventDefault();
    console.log("Estoy en register");
    const nameVal  = inputs.name;
    const lastnameVal = inputs.lastname;
    const documentVal = inputs.document;
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;

    if (!nameVal || !lastnameVal || !documentVal || !emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"] ({
        message: "Todos los campos son obligatorios",
      });
      console.log("Vacios");
    } else if (documentVal < 100) {
      notification["error"] ({
        message: "Documento invalido",
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"] ({
          message: "Las contraseñas tienen que ser iguales",
        });
        console.log("Son diferentes");
      } else {
        const result = await signUpApi(inputs);
        console.log(result)
        if (!result.user_creado) {
          notification["error"] ({
            message: result.message,
          });
        } else {
          notification["success"] ({
            message: result.message,
          });
          ResetForm();
          window.location.href = "/login";
        }
      }
    }
  };

  const ResetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      name: "",
      lastname: "",
      document: "",
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });

    setFormValid({
      name: false,
      lastname: false,
      document: false,
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };

  return (
    <Form className="" onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)" }} />}
          type="text"
          name="name"
          placeholder="Nombre"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.name}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)" }} />}
          type="text"
          name="lastname"
          placeholder="Apellidos"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.lastname}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<IdcardOutlined style={{color: "rgba(0,0,0,.25)" }} />}
          type="number"
          name="document"
          placeholder="Documento"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.document}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<MailOutlined style={{color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox name="privacyPolicy" checked={inputs.privacyPolicy}>
          He leído y acepto la política de privacidad.
        </Checkbox>
      </Form.Item>   
      <Button onClick={register} className="register-form__button">
        Crear cuenta
      </Button>
    </Form>
  );
}