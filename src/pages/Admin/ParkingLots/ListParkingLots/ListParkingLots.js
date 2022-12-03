import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Button,
  Modal as ModalAntd,
  notification,
} from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { activateParkingLot, deleteParkingLot, getParkingLots } from "../../../../api/parkingLot";
import { getAccessToken } from "../../../../api/auth";
import EditParkingForm from "../EditParkingLot";
import AddParkingForm from "../AddParkingLot";
import Modal from "../../../../components/Modal";

const { confirm } = ModalAntd;

// export default function ListParkingLots(props) {
//   const { setReloadParkingLots } = props;
//   const accessToken = getAccessToken();
//   const result = getParkingLots(accessToken)
//   console.log(result)

// }

export default function ListParkingLots(props) {
  const { parkingLotsActive, parkingLotsInactive, setReloadParkingLots } = props;
  const [viewParkingActives, setViewParkingActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addParkingModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo parqueadero");
    setModalContent(
      <AddParkingForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadParkingLots={setReloadParkingLots}
      />
    );
  };

  return (
    <div className="list-parkingLots">
      <div className="list-parkingLots__header">
        <div className="list-parkinglots__header-switch">
          <List.Item
            actions={[
              <Button type="primary" onClick={addParkingModal}>
                <PlusOutlined />Agregar
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <span>
                  {viewParkingActives ? "Parqueaderos Activos" : "Parqueaderos Inactivos"}
                </span>
              }
              avatar={
                <Switch
                  defaultChecked
                  onChange={() => setViewParkingActives(!viewParkingActives)}
                />
              }
            ></List.Item.Meta>
          </List.Item>
        </div>
      </div>

      {viewParkingActives ? (
        <ParkingsActive
          parkingActive={parkingLotsActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadParkingLots={setReloadParkingLots}
        />
      ) : (
        <ParkingsInactive
          parkingInactive={parkingLotsInactive}
          setReloadParkingLots={setReloadParkingLots}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function ParkingsActive(props) {
  const {
    parkingLotsActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadParkingLots,
  } = props;

  const editParking = (parkingLot) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${parkingLot.parkingLot_name ? parkingLot.parkingLot_name : "..."} ${
        parkingLot.capacity ? parkingLot.capacity : "..."} ${parkingLot.active ? parkingLot.active : "..."}` 
    );
    setModalContent(
      <EditParkingForm
        parkingLot={parkingLot}
        setIsVisibleModal={setIsVisibleModal}
        setReloadParkingLots={setReloadParkingLots}
      />
    );
  };

  return (
    <List
      className="parkingLots-active"
      itemLayout="horizontal"
      dataSource={parkingLotsActive}
      renderItem={(parkingLot) => (
        <ParkingActive
          parkingLot={parkingLot}
          editParking={editParking}
          setReloadParkingLots={setReloadParkingLots}
        />
      )}
    />
  );
}

function ParkingActive(props) {
  const { parkingLot, editParkingLot, setReloadParkingLots } = props;

  const desactivateParkingLot = () => {
    const accesToken = getAccessToken();

    activateParkingLot(accesToken, parkingLot._id, false)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadParkingLots(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
    });
  };

    const showDeleteConfirm = () => {
    const accesToken = getAccessToken();

    confirm({
      title: "Eliminando parqueadero",
      content: `¿Estas seguro que quieres eliminar a ${parkingLot.parkingLot_name}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteParkingLot(accesToken, parkingLot._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadParkingLots(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editParkingLot(parkingLot)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={desactivateParkingLot}>
          <UserSwitchOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <UserDeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`
                ${parkingLot.parkingLot_name ? parkingLot.parkingLot_name : "..."} 
                ${parkingLot.capacity ? parkingLot.capacity : "..."}
                ${parkingLot.active ? parkingLot.active : "..."}
            `}
        description={parkingLot.parkingLot_name}
      />
    </List.Item>
  );
}

function ParkingsInactive(props) {
  const { parkingsInactive, setReloadParkingLots } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={parkingsInactive}
      renderItem={(parkingLot) => (
        <ParkingInactive user={parkingLot} setReloadParkingLots={setReloadParkingLots} />
      )}
    />
  );
}

function ParkingInactive(props) {
  const { parkingLot, setReloadParkingLots } = props;

  const activateParkingF = () => {
    const accesToken = getAccessToken();

    activateParkingLot(accesToken, parkingLot._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadParkingLots(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccessToken();

    confirm({
      title: "Eliminando parqueadero",
      content: `¿Estas seguro que quieres eliminar ${parkingLot.parkingLot_name}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteParkingLot(accesToken, parkingLot._id)
          .then((response) => {
            console.log(parkingLot._id);
            notification["success"]({
              message: response,
            });
            console.log(parkingLot._id);
            setReloadParkingLots(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateParkingF}>
          <UserSwitchOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <UserDeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={`
                ${parkingLot.parkingLot_name ? parkingLot.parkingLot_name : "..."} 
                ${parkingLot.capacity ? parkingLot.capacity : "..."}
                ${parkingLot.active ? parkingLot.active : "..."}
              `}
        description={parkingLot.parkingLot_name}
      />
    </List.Item>
  );
}