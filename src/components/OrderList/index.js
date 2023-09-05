import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiDetail } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Col, Image, Row } from 'react-bootstrap';
import { Stepper, Step } from 'react-form-stepper';

function OrderList({ ordersList, status }) {
  const [orders, setOrders] = useState([]);
  const [deleteOrder, setDeleteOrder] = useState(false);
  const [detail, setDetail] = useState(false);
  const [orderDetail, setOrderDetail] = useState();
  const [orderDetailProduct, setOrderDetailProduct] = useState();

  useEffect(() => {
    setOrders(ordersList);
  }, [ordersList, deleteOrder]);

  const changDetail = (order_id) => {
    setDetail(!detail);
    const detailOrder = orders.filter((order) => order.order_id === order_id);
    if (detailOrder) {
      setOrderDetail(detailOrder);
      setOrderDetailProduct(detailOrder[0].order_details);
    }
  };

  const updateStatus = (order_id) => {
    const agreeDelete = window.confirm(`Bạn có muốn huỷ đơn ${order_id} không ??`);
    if (agreeDelete) {
      axios
        .put(
          `http://localhost:3000/orders/status/${order_id}`,
          {
            status: 'Huỷ đơn',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          if (res) {
            toast.success(`Huỷ đơn thành công`, {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(`Huỷ đơn không thành công`, {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        });
      setDeleteOrder(true);
    }
    return 0;
  };

  return (
    <>
      {!detail ? (
        <Table bordered>
          <thead>
            <tr>
              <th>Mã hoá đơn</th>
              <th>Tổng đơn hàng</th>
              <th>Thanh toán</th>
              <th style={{ width: '400px' }}>Địa chỉ thanh toán</th>
              <th>Ngày đặt hàng</th>
              <th style={{ width: '120px' }}></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return order.order_statuses[order.order_statuses.length - 1]?.status === status || !status ? (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>
                    {order.order_total.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </td>
                  <td>{order.order_payment} </td>

                  <td>{order.address} </td>
                  <td> {moment(order.createdAt).utc().format('DD-MM-YYYY')}</td>
                  <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Xem chi tiết</Tooltip>}>
                      <span className="d-inline-block">
                        <Button onClick={() => changDetail(order.order_id)} variant="outline-success">
                          <BiDetail />
                        </Button>
                      </span>
                    </OverlayTrigger>
                    {order.order_statuses[order.order_statuses.length - 1]?.status === 'Huỷ đơn' ||
                    order.order_statuses[order.order_statuses.length - 1]?.status === 'Đã xác nhận' ||
                    order.order_statuses[order.order_statuses.length - 1]?.status === 'Đã giao hàng' ? (
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Huỷ đơn</Tooltip>}>
                        <span className="d-inline-block">
                          <Button
                            disabled
                            onClick={() => updateStatus(order.order_id)}
                            style={{ float: 'right' }}
                            variant="outline-danger"
                          >
                            <FcCancel />
                          </Button>
                        </span>
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Huỷ đơn</Tooltip>}>
                        <span className="d-inline-block">
                          <Button
                            onClick={() => updateStatus(order.order_id)}
                            style={{ float: 'right' }}
                            variant="outline-danger"
                          >
                            <FcCancel />
                          </Button>
                        </span>
                      </OverlayTrigger>
                    )}
                  </td>
                </tr>
              ) : (
                <></>
              );
            })}
            <ToastContainer />
          </tbody>
        </Table>
      ) : (
        <>
          <Row>
            <Col sm={8}></Col>
            <Col sm={4}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>Thông tin đơn hàng </div>
                <div>
                  <Button variant="primary" onClick={() => setDetail(!detail)}>
                    Quay lại trang trước
                  </Button>{' '}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              {orderDetailProduct.map((product, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Image
                      style={{ width: '150px', height: '100px' }}
                      src={`http://127.0.0.1:8081//${product.product.images[0].image_name}`}
                      alt="loi"
                    />
                  </div>
                  <div style={{ marginRight: '100px' }}>{product.product.product_name}</div>
                  <div>
                    <strong>
                      {product.detail_price.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </strong>
                    <br />
                    <strong>{product.detail_quantity}</strong> sản phẩm
                  </div>
                </div>
              ))}
            </Col>
            <Col sm={4} style={{ borderLeft: '1px solid black ' }}>
              <br />
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}> Địa chỉ giao hàng: </span>{' '}
                {orderDetail[0]?.address}
              </div>
              <br />
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Hình thức thanh toán: </span>{' '}
                {orderDetail[0]?.order_payment}
                {orderDetail[0]?.order_payment === 'Thanh toán online' ? '(Đã thanh toán)' : ''}
              </div>
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Ghi chú đơn hàng: </span>{' '}
                {orderDetail[0]?.order_note}
              </div>
              <br />
              <div>
                {' '}
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Tổng đơn hàng: </span>{' '}
                {orderDetail[0]?.order_total.toLocaleString('vi', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </div>
              <br />
              <div>
                <Stepper activeStep={orderDetail[0]?.order_statuses.length - 1}>
                  {orderDetail[0]?.order_statuses.map((orderStatus, index) => {
                    const status =
                      orderStatus.status + ' ngày ' + moment(orderStatus.createdAt).utc().format('DD-MM-YYYY');
                    return <Step key={index} label={status} />;
                  })}
                </Stepper>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default OrderList;
