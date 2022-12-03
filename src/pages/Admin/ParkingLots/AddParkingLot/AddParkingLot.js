import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { createApi } from "../../../../api/parkingLot";
import { getAccessToken } from "../../../../api/auth";
import "./AddParkingLot.scss";

export default function AddParkingLot(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [parkingData, setParkingData] = useState({});

  const addParking = async (event) => {
    event.preventDefault();

    if (
      !parkingData.parkingLot_name ||
      !parkingData.capacity ||
      !parkingData.active
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else if (parkingData.capacity < 1){
      notification["error"]({
        message: "La capacidad no puede ser menor a 1",
      });
    } else {
      const result = await createApi(parkingData);
      console.log(result)
      if (!result.parkingLot_creado) {
        notification["error"] ({
          message: result.message,
        });
      } else {
        notification["success"] ({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
        setParkingData({});
      }
    
      // createApi(parkingData)
      //   .then((response) => {
      //     notification["success"]({
      //       message: response,
      //     });
      //     setIsVisibleModal(false);
      //     setReloadUsers(true);
      //     setParkingData({});
      //   })
      //   .catch((err) => {
      //     notification["error"]({
      //       message: err,
      //     });
      // });
    }
  };

  return (
    <div className="add-parking-form">
      <AddForm
        parkingData={parkingData}
        setParkingData={setParkingData}
        addParking={addParking}
      />
    </div>
  );
}


const AddForm = (props) => {
  const { parkingData, setParkingData, addParking } = props;
  const { Option } = Select;

  return (
    <Form className="form-add">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<CarOutlined />}
              placeholder="Nombre del parqueadero"
              value={parkingData.parkingLot_name}
              onChange={(e) =>
                setParkingData({ ...parkingData, parkingLot_name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              type="number"
              prefix={<CarOutlined />}
              placeholder="Capacidad"
              value={parkingData.capacity}
              onChange={(e) =>
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
              placeholder="Selecióna la actividad"
              onChange={(e) => setParkingData({ ...parkingData, active: e })}
              value={parkingData.active}
            >
              <Option value="true">Activo</Option>
              <Option value="false">Inactivo</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          onClick={addParking}
        >
          Crear
        </Button>
      </Form.Item>
    </Form>
  );
};