import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Info.css';
import Information from '../../../components/Information';
import Account from '../../../components/Account';
import { NavLink } from 'react-router-dom';

function Info() {
  return (
    <Container fluid className="account">
      <Row className="mt-1">
        <Col>
          {' '}
          <Breadcrumb className="account-bread">
            <Breadcrumb.Item className="account-bread1"> <NavLink as="li" to="/"> Trang chủ</NavLink></Breadcrumb.Item>
            <Breadcrumb.Item className="account-bread1">Thông tin cá nhân</Breadcrumb.Item>
            
          </Breadcrumb>
        </Col>
      </Row>
      <Row className="account-content">
        <Col sm={2} className="account-content1">
          <Account />
        </Col>
        <Col sm={9}>
          <div className="account-info">
            <Information />
          </div>
        </Col>
      </Row>{' '}
      <br />
      <br />
      <br />
    </Container>
  );
}

export default Info;
