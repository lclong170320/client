import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Address.css';
import AddressList from '../../../components/AddressList';
import Account from '../../../components/Account';
import { NavLink } from 'react-router-dom';

function Address() {
  return (
    <Container fluid className="account">
      <Row className="mt-1">
        <Col>
          {' '}
          <Breadcrumb className="account-bread">
            <Breadcrumb.Item className="account-bread1">
              <NavLink as="li" to="/"> Trang chủ</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="account-bread1">Danh sách địa chỉ</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row className="account-content">
        <Col sm={2} className="account-content1">
          <Account />
        </Col>
        <Col sm={9}>
          <div className="order-list">
            <AddressList />
          </div>
        </Col>
      </Row>{' '}
      <br />
      <br />
      <br />
    </Container>
  );
}

export default Address;
