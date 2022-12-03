import React from 'react';
import { Space, Table, Tag} from 'antd';
const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Apellidos',
    dataIndex: 'lastname',
    key: 'lastname',
  },
  {
    title: 'Documento',
    dataIndex: 'document',
    key: 'document',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Rol',
    key: 'role',
    dataIndex: 'role',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length === 'supervisor' ? 'green' : 'geekblue';
          if (tag === 'admin') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Acción',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Editar</a>
        <a>Eliminar</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'Sebastian',
    lastname: 'Echeverry',
    document: 1053866,
    email: 'sebastian@autonoma.edu.co',
    tags: ['admin'],
  },
  {
    key: '2',
    name: 'Yaneth',
    lastname: 'Mejia',
    document: 10280,
    email: 'yaneth@autonoma.edu.co',
    tags: ['supervisor'],
  },
  {
    key: '3',
    name: 'Gerardo',
    lastname: 'Pinilla',
    document: 98762,
    email: 'gerardo@autonoma.edu.co',
    tags: ['supervisor'],
  },
];
const App = () => <Table columns={columns} dataSource={data} /> ;
export default App;