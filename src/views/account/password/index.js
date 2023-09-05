import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Password.css';
import Account from '../../../components/Account';
import { NavLink } from 'react-router-dom';
import UpdatePassword from '../../../components/UpdatePassword';

function Password() {
  return (
    <Container fluid className="password">
      <Row className="mt-1">
        <Col>
          {' '}
          <Breadcrumb className="password-bread">
            <Breadcrumb.Item className="password-bread1"> <NavLink as="li" to="/"> Trang chủ</NavLink></Breadcrumb.Item>
            <Breadcrumb.Item className="password-bread1">Đổi mật khẩu</Breadcrumb.Item>
            
          </Breadcrumb>
        </Col>
      </Row>
      <Row className="password-content">
        <Col sm={2} className="password-content1">
          <Account />
        </Col>
        <Col sm={9}>
          <div className="password-info">
            <UpdatePassword />
          </div>
        </Col>
      </Row>{' '}
      <br />
      <br />
      <br />
    </Container>
  );
}

export default Password;
