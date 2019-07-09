import React, { useEffect, useState } from 'react';
import { productServices } from 'services';
import { Table, Popconfirm, Card, Input, Button, Row, Col, Modal } from 'antd';
import toastr from 'toastr';

export default () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(null);
  const [createModal, setCreateModal] = useState(false)
  const [newProduct, setNewProduct] = useState({})



  const fetchProducts = () => {
    productServices.fetchProducts(query).then(res => {
      setProducts(res.data.products);
    });
  }

  useEffect(() => {
    fetchProducts()
  }, []);

  const handleOkCreate = () => {
    productServices.createProduct(newProduct).then(() => {
      setCreateModal(false)
      toastr.success('Success')
      fetchProducts()
      setNewProduct({})

    });
  }
  const handleCancelCreate = () => {
    setCreateModal(false)
    setNewProduct({})
  }

  const handleDeleteRecord = (id) => {
   productServices.deleteProduct({id}).then(res => {
     toastr.success('Success')
     fetchProducts()
   })
  }

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
   {
    title: 'Sell Price',
    dataIndex: 'sell_price',
    key: 'sell_price',
  },
  {
    title: 'Import Price',
    dataIndex: 'import_price',
    key: 'import_price',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Popconfirm
        title="Are you sure delete this task?"
        onConfirm={() => handleDeleteRecord(record.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger">Delete</Button>
      </Popconfirm>
    ),
  },
];


  return (
    <React.Fragment>
      <Card>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Input style={{width: '200px'}} placeholder="Name" value={query} onChange={(e) => setQuery(e.target.value)} />
          </Col>
          <Col span={6}>
            <Button onClick={fetchProducts}>Search</Button>
          </Col>
          <Col className="gutter-row" span={6}>
            <Button type="primary" onClick={() => setCreateModal(true)}>Thêm mới</Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table columns={columns} dataSource={products} rowKey="id" />
      </Card>
      <Modal
        title="Basic Modal"
        visible={createModal}
        onOk={handleOkCreate}
        onCancel={handleCancelCreate}
      >
        <span>Name</span>
        <Input value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
        <span>Description</span>
        <Input value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
        <span>Import Price</span>
        <Input value={newProduct.import_price} onChange={(e) => setNewProduct({...newProduct, import_price: e.target.value})} />
        <span>Sell Price</span>
        <Input value={newProduct.sell_price} onChange={(e) => setNewProduct({...newProduct, sell_price: e.target.value})} />
      </Modal>
    </React.Fragment>
    
   
  );
};
