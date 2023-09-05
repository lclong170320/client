import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Comment.css';
import Account from '../../../components/Account';
import { Form, Image, InputGroup } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import CommentList from '../../../components/CommentList';
import * as commentApi from '../../../api/comment';
import { NavLink } from 'react-router-dom';

function Comment() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState('');
  const [check, setCheck] = useState(false);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        const data = await commentApi.get(`comments?customer_id=${local.id}&limit=99`);
        setComments(data.comments);
      }
    };
    fetchAPI();
  }, [search, check]);
  return (
    <Container fluid className="account">
      <Row className="mt-1">
        <Col>
          {' '}
          <Breadcrumb className="account-bread">
            <Breadcrumb.Item className="account-bread1">
              <NavLink as="li" to="/">
                {' '}
                Trang chủ
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="account-bread1">Bình luận sản phẩm</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row className="account-content">
        <Col sm={2} className="account-content1">
          <Account />
        </Col>
        <Col sm={9}>
          <div className="order-search">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <BiSearchAlt size={26} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Tìm bình luận theo tên sản phẩm"
                aria-label="Tìm bình luận theo tên sản phẩm"
                aria-describedby="basic-addon1"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>
          {comments.length > 0 ? (
            <div className="order-list">
              <CommentList commentList={comments} checkComment={setCheck} />
            </div>
          ) : (
            <div className="order-none">
              <br />
              <Image
                style={{ width: '200px', height: '200px' }}
                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                alt="loi"
              />
              <h6>Chưa có bình luận</h6>
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

export default Comment;
