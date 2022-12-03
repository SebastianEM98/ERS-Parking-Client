import React, { useState } from "react";
import { Form, Input, Button} from "antd";
import { UserOutlined, IdcardOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./Supervisor.scss";

export default function Supervisor() {
  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    document: "",
    email: "",
    role: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });

  return (
    <Form className="" wrapperCol={{ span: 10 }} layout="horizontal">
      <Form.Item>
        <Input
          prefix={<UserOutlined />}
          type="text"
          name="name"
          placeholder="Nombre"
          className="registerSuperv-form__input"
          value={inputs.name}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<UserOutlined />}
          type="text"
          name="lastname"
          placeholder="Apellidos"
          className="registerSuperv-form__input"
          value={inputs.lastname}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<IdcardOutlined />}
          type="number"
          name="document"
          placeholder="Documento"
          className="registerSuperv-form__input"
          value={inputs.name}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<MailOutlined />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="registerSuperv-form__input"
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="registerSuperv-form__input"
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="registerSuperv-form__input"
          value={inputs.repeatPassword}
        />
      </Form.Item>   
      <Button htmlType="submit" className="registerSuperv-form__button">
        Crear cuenta
      </Button>
    </Form>
  );
}