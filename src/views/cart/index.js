import classNames from 'classnames/bind';
import style from './Cart.css';

import { Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap';
import Image from '../../components/Image';
import { FcShipped } from 'react-icons/fc';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onClickCheckCart } from '../../components/Layout/DefaultLayout/index';
import { NavLink, useNavigate } from 'react-router-dom';
import * as customerApi from '../../api/customer';
import ModalPayMent from '../../components/ModalPayMent';
import { MdDeleteForever, MdOutlineNoteAlt, MdPayments } from 'react-icons/md';
import { IoStorefrontOutline } from 'react-icons/io5';
import { FaRegAddressCard } from 'react-icons/fa';

const cx = classNames.bind(style);

function Cart() {
  const navigate = useNavigate();
  const checkCartButton = useContext(onClickCheckCart);
  const [cartItem, setCartItem] = useState([]);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState();
  const [showModal, setShowModal] = useState(false);
  const [pay, setPay] = useState(false);
  const [orderNote, setOrderNote] = useState();
  const [checkCustomer, setCheckCustomer] = useState(false);

  useEffect(() => {
    if (cartItem) {
      let local = localStorage.getItem('cart');
      if (local) {
        setCartItem(JSON.parse(local));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check customer order
  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        const data = await customerApi.get(`customers?customer_id=${local.id}`);
        setCustomerAddress(data.customers[0].addresses);
        setAddress(data.customers[0].addresses[data.customers[0].addresses.length - 1]);
        if (
          data.customers[0].addresses.length > 0 ||
          data.customers[0].customer_phone !== null ||
          data.customers[0].customer_phone !== null
        ) {
          setCheckCustomer(true);
        }
      }
    };
    fetchAPI();
  }, [checkCartButton, pay]);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    if (address) local.address = address.address ? address.address : address;
    localStorage.setItem('author', JSON.stringify(local));
  }, [address]);

  useEffect(() => {
    let sumCart = 0;
    cartItem.map(
      (item) =>
        (sumCart +=
          (item.product_price - ((item.discount_percent ? item.discount_percent : 0) * item.product_price) / 100) *
          item.qty),
    );
    if (sumCart !== 0) {
      setTotal(sumCart + 15000);
    }
  }, [total, cartItem]);

  const addQuantity = (product_id) => {
    const exits = cartItem.find((x) => x.product_id === product_id);

    if (exits.qty !== exits.storage) {
      let listCart = cartItem.map((item) => {
        return item.product_id === product_id ? { ...item, qty: exits.qty + 1 } : item;
      });
      setCartItem(listCart);
      localStorage.setItem('cart', JSON.stringify(listCart));
    } else {
      toast.warning('Sản phẩm trong kho không đủ!!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const subtractQuantity = (product_id) => {
    const exits = cartItem.find((x) => x.product_id === product_id);
    if (exits.qty !== 1) {
      let listCart = cartItem.map((item) => {
        return item.product_id === product_id ? { ...item, qty: exits.qty - 1 } : item;
      });
      setCartItem(listCart);
      localStorage.setItem('cart', JSON.stringify(listCart));
    }
  };
  const onClickDelete = (product_id) => {
    const listItemOther = cartItem.filter((item) => {
      return item.product_id !== product_id;
    });
    setCartItem(listItemOther);
    localStorage.setItem('cart', JSON.stringify(listItemOther));
    toast.success(`Bạn xoá sản phẩm trong giỏ hàng thàng công`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  let detailCart = [];
  useEffect(() => {}, [total, cartItem]);

  const addCartApi = () => {
    if (checkCustomer === true) {
      const agreeDelete = window.confirm(`Bạn có muốn mua sản phẩm không ??`);
      let local = JSON.parse(localStorage.getItem('author'));
      if (agreeDelete && local) {
        // eslint-disable-next-line array-callback-return
        cartItem.map((item) => {
          detailCart = [
            ...detailCart,
            {
              product_id: item.product_id,
              detail_quantity: item.qty,
              detail_price:
                item.discount_percent > 0
                  ? item.product_price - (item.discount_percent * item.product_price) / 100
                  : item.product_price,
            },
          ];
        });
        axios
          .post(`http://localhost:3000/orders?isAdmin=false`, {
            customer_id: local.id,
            order_total: total,
            address: address.address ? address.address : address,
            order_payment: 'Trực Tiếp',
            order_detail: detailCart,
            order_note: orderNote ? orderNote : 'Không có ghi chú',
          })
          .then((res) => {
            if (res) {
              toast.success('Tạo đơn hàng thành công', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            }
            localStorage.removeItem('cart');
            setTimeout(() => {
              navigate('/');
            }, 1500);
          })
          .catch((err) => {
            if (err) {
              toast.error('Tạo đơn hàng thất bại', {
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
      }
    } else {
      toast.warn('Cập nhật thông tin để thanh toán', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const checkPayMent = () => {
    if (checkCustomer === false) {
      toast.warning('Cập nhật thông tin để thanh toán', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (pay === true) {
        setShowModal(true);
      } else {
        addCartApi();
      }
    }
  };

  return (
    <Container fluid="md">
      {cartItem.length > 0 ? (
        <>
          <div>
            <div className={cx('detail-product-breadcrumbs')}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <NavLink as="li" style={{}} to="/">
                    {' '}
                    Trang chủ
                  </NavLink>{' '}
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">Giỏ hàng</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <Row className={cx('home-cart')}>
            <Col sm={8}>
              <h6> Giỏ hàng của bạn </h6>
            </Col>
            <Col sm={4}>
              <h6> Thông tin khách hàng </h6>
            </Col>
          </Row>
          <Row className={cx('home-cart-content')}>
            <Col sm={8}>
              {cartItem.map((product, index) => (
                <div key={index} className={cx('home-cart-content-1')}>
                  <div className={cx('home-cart-content-product')}>
                    <Image
                      className={cx('home-cart-content-product-img')}
                      src={`http://127.0.0.1:8081//${product.image}`}
                      alt="loi"
                    />
                    <div className={cx('home-cart-content-product-title')}>
                      {product.product_name} <br />
                      <div>
                        <span>
                          <IoStorefrontOutline size={18} /> {product.storage} sản phẩm
                        </span>
                      </div>
                    </div>
                    <div className={cx('home-cart-content-product-price')}>
                      {product.discount_percent > 0 ? (
                        <>
                          <strong>
                            {(
                              (product.product_price - (product.discount_percent * product.product_price) / 100) *
                              product.qty
                            ).toLocaleString('vi', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </strong>
                          <br />
                          <span className={cx('price-discount')}>
                            {' '}
                            {(product.product_price * product.qty).toLocaleString('vi', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </span>
                        </>
                      ) : (
                        <>
                          <strong>
                            {(product.product_price * product.qty).toLocaleString('vi', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </strong>
                          <br />
                        </>
                      )}
                    </div>
                  </div>
                  <div className={cx('home-cart-content-quantity')}>
                    <div className={cx('home-cart-content-quantitynum')}>
                      <button
                        onClick={() => {
                          checkCartButton();
                          subtractQuantity(product.product_id);
                        }}
                        className={cx('noselect')}
                      >
                        -
                      </button>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" value={product.qty} readOnly />
                      </Form.Group>
                      <button
                        onClick={() => {
                          checkCartButton();
                          addQuantity(product.product_id);
                        }}
                        className={cx('noselect-1')}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        onClickDelete(product.product_id);
                        checkCartButton();
                      }}
                      className={cx('delete')}
                    >
                      <MdDeleteForever size={25} />
                    </button>
                  </div>
                </div>
              ))}

              <div className={cx('home-cart-content-2')}>
                <div className={cx('home-cart-content-2-price')}>
                  <div className={cx('home-cart-content-2-price-3 mb-2')}>
                    <span style={{ color: '#0081bd' }}>
                      {' '}
                      Phí giao hàng: <FcShipped className={cx('icon')} />
                    </span>
                    <label> 15.000₫ </label>
                  </div>
                  <div className={cx('home-cart-content-2-price-3')}>
                    <span> Tổng đơn hàng:</span>
                    <label>
                      {' '}
                      {total.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}{' '}
                    </label>
                  </div>
                </div>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    checkPayMent();
                    checkCartButton();
                  }}
                >
                  Mua sản phẩm
                </Button>
              </div>
            </Col>
            <Col sm={4}>
              <h6>
                {' '}
                <FaRegAddressCard size={26} /> Địa chỉ thanh toán{' '}
              </h6>
              <Form>
                {customerAddress.length > 0 ? (
                  customerAddress?.map((customerAddress, index) => (
                    <Form.Check
                      onClick={(e) => setAddress(e.target.value)}
                      key={index}
                      defaultChecked={true}
                      name="checkAddress"
                      type="radio"
                      id="radio"
                      value={customerAddress.address}
                      label={customerAddress.address}
                    />
                  ))
                ) : (
                  <NavLink as="li" to="/tai-khoan/dia-chi" style={{ marginLeft: '110px' }}>
                    {' '}
                    Thêm địa chỉ
                  </NavLink>
                )}
              </Form>

              <br />
              <h6>
                {' '}
                <MdPayments size={26} /> Hình thức thanh toán{' '}
              </h6>
              <Form>
                <Form.Check
                  name="checkPay"
                  defaultChecked={true}
                  onClick={() => setPay(false)}
                  type="radio"
                  id="custom-switch"
                  label="Thanh toán khi nhận hàng"
                />
                <Form.Check
                  onClick={() => setPay(true)}
                  name="checkPay"
                  type="radio"
                  id="custom-switch"
                  label="Thanh toán online"
                />
              </Form>
              <br />

              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>
                    <MdOutlineNoteAlt size={26} /> Ghi chú
                  </Form.Label>
                  <Form.Control as="textarea" onChange={(e) => setOrderNote(e.target.value)} rows={3} />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </>
      ) : (
        <div className="card-none">
          <br />
          <Image
            style={{ width: '200px', height: '200px' }}
            src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
            alt="loi"
          />
          <h6>Chưa có trong giỏ hàng</h6>
        </div>
      )}

      {showModal ? <ModalPayMent total={total} setShowModal={setShowModal} orderNote={orderNote} /> : <></>}
      <ToastContainer />
    </Container>
  );
}

export default Cart;
