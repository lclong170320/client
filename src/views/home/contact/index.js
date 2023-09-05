import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Contact.css';
import { NavLink } from 'react-router-dom';
import Iframe from 'react-iframe';

function Contact() {
  return (
    <Container className="contact mt-2 mb-5">
      <Row>
        <Col sm={12} className="contact-1 mt-3">
          <h5>THÔNG TIN LIÊN HỆ KHÁC</h5>
          <p>
            Tìm siêu thị Mini ? Xin mời ghé thăm trang{' '}
            <NavLink as="li" to={'/lien-he'}>
              {' '}
              siêu thị mini{' '}
            </NavLink>{' '}
            để xem bản đồ và địa chỉ các siêu thị trên toàn quốc.
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm={7}>
          <Iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1604.8208304071627!2d105.77388378214862!3d10.035563591539825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08818e1ecd201%3A0x410839edec5f8d74!2zVHLGsOG7nW5nIFRp4buDdSBI4buNYyBBbiBOZ2hp4buHcA!5e0!3m2!1svi!2s!4v1666508067231!5m2!1svi!2s"
            width="100%"
            height="480"
            // eslint-disable-next-line react/style-prop-object
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></Iframe>
        </Col>
        <Col sm={5} className="contact-2">
          <h6> THÔNG TIN CÔNG TY </h6>
          <p>
            CÔNG TY TRÁCH NHIỆM MỘT THÀNH VIÊN MINI
            <br />
            Trụ sở chính: 139, Trần Hương Đạo, Ninh Kiều, Cần Thơ
            <br />
            Địa chỉ liên hệ: 139, Trần Hương Đạo, Ninh Kiều, Cần Thơ
            <br />
            Email: lclong1703@gmail.com
            <br />
            Phone: 034-979-41-77
            <br />
            Người đại diện: Lư Cẩm Long
            <br />
            Ngày thành lập: 01-01-2001
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
