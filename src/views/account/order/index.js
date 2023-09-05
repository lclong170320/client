import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Order.css';
import OrderList from '../../../components/OrderList';
import Account from '../../../components/Account';
import { Form, Image, InputGroup, Nav } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import * as orderApi from '../../../api/order';
import { NavLink } from 'react-router-dom';

function Order() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        if (status !== undefined) {
          const data = await orderApi.get(
            `orders?customer_id=${local.id}&&soft_Delete=0&&order_id=${search}&&limit=99`,
          );
          setOrders(data.orders);
        } else {
          const data = await orderApi.get(
            `orders?customer_id=${local.id}&&soft_Delete=0&&order_id=${search}&&limit=99`,
          );
          setOrders(data.orders);
        }
      }
    };
    fetchAPI();
  }, [status, search]);
  return (
    <Container fluid className="account">
      <Row className="mt-1">
        <Col>
          {' '}
          <Breadcrumb className="account-bread">
            <Breadcrumb.Item className="account-bread1">
              {' '}
              <NavLink as="li" to="/">
                {' '}
                Trang chủ
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="account-bread1">Thông tin hoá đơn</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row className="account-content">
        <Col sm={2} className="account-content1">
          <Account />
        </Col>
        <Col sm={9}>
          <div className="order-move">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link onClick={() => setStatus()} style={{ color: 'black', width: '214px' }} eventKey="link-1">
                  Tất cả đơn hàng
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setStatus('Chưa xác nhận')}
                  style={{ color: 'black', width: '214px' }}
                  eventKey="link-2"
                >
                  Chưa xác nhận
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setStatus('Đã xác nhận')}
                  style={{ color: 'black', width: '214px' }}
                  eventKey="link-3"
                >
                  Đã xác nhận
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setStatus('Đã giao hàng')}
                  style={{ color: 'black', width: '214px' }}
                  eventKey="link-4"
                >
                  Đã giao hàng
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setStatus('Huỷ đơn')}
                  style={{ color: 'black', width: '214px' }}
                  eventKey="link-5"
                >
                  Đã huỷ
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="order-search">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <BiSearchAlt size={26} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Tìm đơn hàng theo mã đơn hàng"
                aria-label="Tìm đơn hàng theo mã đơn hàng"
                aria-describedby="basic-addon1"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>

          {orders.length > 0 ? (
            <div className="order-list">
              <OrderList ordersList={orders} status={status} />
            </div>
          ) : (
            <div className="order-none">
              <br />
              <Image
                style={{ width: '200px', height: '200px' }}
                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                alt="loi"
              />
              <h6>Chưa có đơn hàng</h6>
            </div>
          )}
        </Col>
      </Row>{' '}
      <br />
      <br />
      <br />
    </Container>
  );
}

export default Order;
