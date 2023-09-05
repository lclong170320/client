import React, { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Like.css';
import Account from '../../../components/Account';
import { Image } from 'react-bootstrap';
import { Container, Row, Col, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import './Like.css';
import Table from 'react-bootstrap/Table';
import { AiTwotoneDelete } from 'react-icons/ai';
import * as favoriteApi from '../../../api/favorite';
import moment from 'moment';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

function Like() {
  const [favorites, setFavorites] = useState([]);
  const [checkFavorites, setCheckFavorites] = useState(false);
  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        const data = await favoriteApi.get(`favorites?customer_id=${local.id}`);
        setFavorites(data.favorites);
        setCheckFavorites(true);
      }
    };
    fetchAPI();
  }, [checkFavorites]);
  const deleteFavorite = (id_favorite) => {
    const agreeDelete = window.confirm(`Bạn có muốn huỷ yêu thích phẩm không ??`);
    if (agreeDelete) {
      axios.delete(`http://localhost:3000/favorites/${id_favorite}`);
      setCheckFavorites(false);
      toast.success(`Bạn huỷ yêu thích sản phẩm thàng công`, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    return 0;
  };
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
            <Breadcrumb.Item className="account-bread1">Sản phẩm yêu thích</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row className="account-content">
        <Col sm={2} className="account-content1">
          <Account />
        </Col>
        <Col sm={9}>
          {/* <div className="order-search">
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
          </div> */}
          {favorites.length > 0 ? (
            <div className="order-list">
              <Container fluid="md">
                <Row className="like">
                  <Col sm={12}>
                    <h6>Sản phẩm yêu thích của bạn</h6>
                  </Col>
                  <Col sm={12} className="mt-2">
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Ảnh</th>
                          <th>Tên sản phẩm</th>
                          <th>Nhà cung cấp</th>
                          <th>Ngày yêu thích</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {favorites.map((favorite, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td style={{ width: '100px', height: '80px' }}>
                                <Image
                                  style={{ width: '100%', height: '100%' }}
                                  src={`http://127.0.0.1:8081//${favorite.product?.images[0].image_name}`}
                                  alt="First slide"
                                />
                              </td>
                              <td style={{ width: '420px' }}>{favorite.product?.product_name}</td>
                              <td>{favorite.product?.provider}</td>
                              <td>{moment(favorite.createdAt).utc().format('DD-MM-YYYY H:mm:ss')} </td>
                              <td>
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={<Tooltip id="tooltip-disabled">Huỷ yêu thích</Tooltip>}
                                >
                                  <span className="d-inline-block">
                                    <Button
                                      onClick={() => deleteFavorite(favorite.favorite_id)}
                                      style={{ float: 'right' }}
                                      variant="outline-danger"
                                    >
                                      <AiTwotoneDelete />
                                    </Button>
                                  </span>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <ToastContainer />
              </Container>
            </div>
          ) : (
            <div className="order-none">
              <br />
              <Image
                style={{ width: '200px', height: '200px' }}
                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                alt="loi"
              />
              <h6>Chưa có sản phẩm yêu thích</h6>
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

export default Like;
