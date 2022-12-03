import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Button,
  Avatar,
  Modal as ModalAntd,
  notification,
} from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/user.png";
import { getAvatar, activateUser, deleteUser } from "../../../../api/user";
import { getAccessToken } from "../../../../api/auth";
import EditUserForm from "../EditSupervisor";
import AddUserForm from "../AddSupervisor";
import Modal from "../../../../components/Modal";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <List.Item
            actions={[
              <Button type="primary" onClick={addUserModal}>
                <UserAddOutlined />Agregar
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <span>
                  {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
                </span>
              }
              avatar={
                <Switch
                  defaultChecked
                  onChange={() => setViewUsersActives(!viewUsersActives)}
                />
              }
            ></List.Item.Meta>
          </List.Item>
        </div>
      </div>

      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
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

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."}
        ${user.lastname ? user.lastname : "..."} 
        ${user.document ? user.document : "..."}
        ${user.email ? user.email : "..."}
        ${user.role ? user.role : "..."}`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accesToken = getAccessToken();

    activateUser(accesToken, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
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
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUser(accesToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
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
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <UserSwitchOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <UserDeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
            ${user.name ? user.name : "..."} 
            ${user.lastname ? user.lastname : "..."} 
            ${user.document ? user.document : "..."}
            ${user.email ? user.email : "..."}
            ${user.role ? user.role : "..."}
            `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUserF = () => {
    const accesToken = getAccessToken();

    activateUser(accesToken, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
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
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUser(accesToken, user._id)
          .then((response) => {
            console.log(user._id);
            notification["success"]({
              message: response,
            });
            console.log(user._id);
            setReloadUsers(true);
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
        <Button type="primary" onClick={activateUserF}>
          <UserSwitchOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <UserDeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                  ${user.name_user ? user.name_user : "..."} 
                  ${user.lastname ? user.lastname : "..."}
              `}
        description={user.email}
      />
    </List.Item>
  );
}