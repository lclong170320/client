import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Support.css';
import { Link, NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import chamsoc from '../../../styles/img/Cham-soc-khach-hang.png';

function Support() {
  return (
    <Container className="support mt-3 mb-5">
      <Row>
        <Col sm={12} className="support-1 mt-3">
          <h5>THÔNG TIN HỖ TRỢ</h5>
          <p>
            Bạn muốn được hỗ trợ ? Xin mời ghé thăm trang{' '}
            <NavLink as="li" to={'/ho-tro'}>
              {' '}
              siêu thị mini hỗ trợ{' '}
            </NavLink>{' '}
            để được hổ trợ một các nhanh nhất và hiệu quả.
          </p>
        </Col>
      </Row>
      <Row className="mt-4 mb-5 support-2">
        <Col sm={7}>
          <h6>Các thông tin liên hệ của hệ thống siêu thị mini</h6>
          <p>
            Email: lclong1703@gmail.com
            <br />
            Phone:{' '}
            <Link as="li" to="tel:+0349794177">
              {' '}
              034-979-41-77{' '}
            </Link>
            <br />
            Liện hệ trực tiếp tại cửa hàng: 139, Trần Hương Đạo, Ninh Kiều, Cần Thơ
          </p>
        </Col>
        <Col sm={5}>
          <Image src={chamsoc} alt="loi" style={{ width: '100%', height: '100%' }} />
        </Col>
      </Row>
      <Row className="mt-2 support-3">
        <Col className="mt-3 mb-3" sm={12}>
          Rất vui khi được phục vụ khách hàng, cảm ơn bạn đã tin tưởng sử dụng website của chúng tôi
        </Col>
      </Row>
    </Container>
  );
}

export default Support;
