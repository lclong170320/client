import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function ModalPayMent({ setShowModal, total, orderNote }) {
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowModal(false);
  };
  const [amount, setAmount] = useState();
  const [bankCode, setBankCode] = useState();

  useEffect(() => {
    setAmount(total);
  }, [total]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3000/orders/create_payment_url`, {
        amount: amount,
        bankCode: bankCode ? bankCode : 'NCB',
        language: 'vn',
        orderType: 'billpayment',
        orderDescription: orderNote ? orderNote : 'Không có ghi chú',
      })
      .then((res) => {
        if (res.data) {
          window.location = res.data.url;
        }
      });

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán online</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Thanh toán</Form.Label>
              <Form.Control type="text" defaultValue="Thanh toán online" readOnly placeholder="Thanh toán hoá đơn" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Ngân Hàng</Form.Label>
              <Form.Select onChange={(e) => setBankCode(e.target.value)} defaultValue="Choose...">
                <option value="NCB">Ngân hàng NCB</option>
                <option value="VNPAYQR">Ngân hàng VNPAYQR</option>
                <option value="SCB"> Ngân hàng SCB</option>
                <option value="SACOMBANK">Ngân hàng SACOMBANK</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Số Tiền</Form.Label>
            <Form.Control
              name="amount"
              type="text"
              readOnly
              defaultValue={amount?.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control type="text" readOnly defaultValue={orderNote} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Thanh toán
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalPayMent;
