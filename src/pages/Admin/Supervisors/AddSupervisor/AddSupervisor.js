import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserOutlined, IdcardOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { signUpApi } from "../../../../api/user";
import "./AddSupervisor.scss";

export default function AddUser(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});

  const addUser = async (event) => {
    event.preventDefault();

    if (
      !userData.name ||
      !userData.lastname ||
      !userData.document ||
      !userData.email ||
      !userData.role ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguales.",
      });
    } else if (userData.document < 100){
        notification["error"]({
            message: "Documento invalido",
        });
    } else {
        const result = await signUpApi(userData);
        console.log(result)
        if (!result.user_creado) {
          notification["error"] ({
            message: result.message,
          });
        } else {
          notification["success"] ({
            message: result.message,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        }
    }
  };

  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}


const AddForm = (props) => {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-add">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
        <Form.Item>
            <Input
              prefix={<IdcardOutlined />}
              type="number"
              placeholder="Documento"
              value={userData.document}
              onChange={(e) =>
                setUserData({ ...userData, document: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="Correo electronico"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Select
              placeholder="Selecióne un rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="supervisor">Supervisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          onClick={addUser}
        >
          Crear
        </Button>
      </Form.Item>
    </Form>
  );
};