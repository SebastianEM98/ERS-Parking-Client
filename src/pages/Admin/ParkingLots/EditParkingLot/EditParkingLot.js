import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Switch,
  Col,
  notification,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { getAccessToken } from "../../../../api/auth";

import "./EditParkingLot.scss";

export default function EditParkingForm(props) {
  const { parkingLot, setIsVisibleModal, setReloadParkingLots } = props;
  const [parkingData, setParkingData] = useState ({
    parkingLot_name: parkingLot.parkingLot_name,
    capacity: parkingLot.capacity,
    active: parkingLot.active,
  });

  useEffect(() => {
    setParkingData({
      parkingLot_name: parkingLot.parkingLot_name,
      capacity: parkingLot.capacity,
      active: parkingLot.active,
    });
  }, [parkingLot]);


 const updateParkingLot = () => {
    const token = getAccessToken();
    console.log(parkingData);
    
    let parkingUpdate = parkingData;

    if (!parkingUpdate.parkingLot_name || !parkingUpdate.capacity || !parkingUpdate.active) {
      notification["error"]({
        message:
          "Todos los campos son obligatorios."
      });
      return;
    } else {
        updateParkingLot(token, parkingUpdate, parkingLot._id).then(result => {
            notification["success"]({
              message: result.message
            });
            setIsVisibleModal(false);
            setReloadParkingLots(true);
        });
    }
  }; 
  useEffect (
    () => {
      console.log (parkingLot);
    },
    [parkingLot]
  );
 

  return (
    <div className="edit-parking-form">
      <EditForm
        parkingData={parkingData}
        setParkingData={setParkingData}
        updateParkingLot={updateParkingLot}
      />
    </div>
  );
}

function EditForm(props) {
  const { parkingData, setParkingData, updateParkingLot } = props;
  const { Option } = Select;
  const [form] = Form.useForm ()
  return (
    <Form className="form-edit" onFinish={updateParkingLot} form={form}  >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre del parqueadero"
              value={parkingData.parkingLot_name}
              onChange={e => setParkingData({ ...parkingData, parkingLot_name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Capacidad"
              value={parkingData.capacity}
              onChange={e =>
                setParkingData({ ...parkingData, capacity: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona la actidivad"
              onChange={e => setParkingData({ ...parkingData, active: e })}
              value={parkingData.active}
            >
              <Option value="true">Activo</Option>
              <Option value="false">Inactivo</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Parqueadero
        </Button>
      </Form.Item>
    </Form>
  );
}