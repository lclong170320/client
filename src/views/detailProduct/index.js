import { Badge, Button, Container, Image } from 'react-bootstrap';
import classNames from 'classnames/bind';
import style from './detailProduct.css';

import { Col, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Carousel from 'react-bootstrap/Carousel';
import { IoReloadCircleOutline } from 'react-icons/io5';
import { FcAlarmClock } from 'react-icons/fc';
import { AiFillDelete, AiFillLike, AiFillStar } from 'react-icons/ai';
import { FcCheckmark } from 'react-icons/fc';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { NavLink, useParams } from 'react-router-dom';
import * as productApi from '../../api/product';
import * as commentApi from '../../api/comment';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { IoStorefrontOutline } from 'react-icons/io5';
import { onClickCheckCart } from '../../components/Layout/DefaultLayout/index';

const cx = classNames.bind(style);

function DetailProduct() {
  const checkCartButton = useContext(onClickCheckCart);
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState();
  const [idAccount, setIdAccount] = useState();
  const [checkComment, setCheckComment] = useState(false);
  const [starComment, setStarComment] = useState(1);

  const images = [];

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`products?product_id=${product_id}`);
      setProduct(data.products[0]);
    };
    fetchAPI();
  }, [product_id]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await commentApi.get(`comments?product_id=${product_id}`);
      setComments(data.comments);
    };
    fetchAPI();
  }, [product_id, checkComment]);

  useEffect(() => {
    const local = async () => {
      const data = await localStorage.getItem('author');
      if (data) {
        setIdAccount(JSON.parse(data));
      }
    };
    local();
  }, []);

  if (product.images) {
    product.images.map((item) => images.push(item.image_name));
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`products?limit=4&&category_id=${product.category?.category_id}`);
      setProducts(data.products);
    };
    fetchAPI();
  }, [product]);

  const [content, setContent] = useState('');
  const comment = () => {
    axios
      .post(`http://localhost:3000/comments/`, {
        comment_content: content,
        product_id: product_id,
        customer_id: idAccount?.id,
        comment_star: starComment,
      })
      .then((res) => {
        if (res) {
          toast.success('Bạn đã bình luân sản phẩm thành công', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setCheckComment(!checkComment);
        }
      })
      .catch((err) => {
        if (err) {
          toast.error('Vui lòng đăng nhập để bình luận', {
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
  };

  const onAddCart = (product_id) => {
    let carts = [];
    const getCart = localStorage.getItem('cart');

    if (getCart) {
      carts = JSON.parse(getCart);
    }
    let exits = carts.find((x) => {
      return x.product_id === product_id;
    });
    if (exits) {
      exits.qty = exits.qty + 1;
    } else {
      carts.push({
        product_id: product.product_id,
        category_id: product.category_id,
        product_describe: product.product_describe,
        product_name: product.product_name,
        image: product.images[0]?.image_name,
        product_price: Number(product.product_price),
        provider: product.provider,
        storage: Number(product.storage.product_quantity - product.storage.product_sold),
        qty: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(carts));
    toast.success(`Bạn đã thêm sản phẩm ${product.product_name} vào giỏ hàng thành công`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const deleteComment = (comment_id) => {
    const arrayComments = [];
    comments.forEach((item) => {
      if (item.comment_id === comment_id && item.customer_id === idAccount.id) {
        arrayComments.push(item);
      }
    });
    if (arrayComments.length > 0) {
      const agreeDelete = window.confirm(`Bạn có muốn xóa bình luận này không ??`);
      if (agreeDelete) {
        axios.delete(`http://localhost:3000/comments/${comment_id}`);
        setCheckComment(!checkComment);
      }
    } else {
      toast.error('Bạn cần đăng nhập hoặc có quyền để xoá bình luận này', {
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

  return (
    <Container fluid="md">
      <div className={cx('detail-product-breadcrumbs')}>
        {' '}
        <Breadcrumb>
          <Breadcrumb.Item>
            {' '}
            <NavLink as="li" to="/">
              Trang chủ{' '}
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Chi tiết sản phẩm</Breadcrumb.Item>
          <Breadcrumb.Item>{product.product_name}</Breadcrumb.Item>
        </Breadcrumb>{' '}
      </div>
      <Row className={cx('detail-product')}>
        <Col className={cx('detail-product-image')} sm={7}>
          <div className={cx('detail-product-image-slider')}>
            <Carousel>
              {images !== []
                ? images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        className="d-block w-100"
                        src={`http://127.0.0.1:8081//${images[index]}`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))
                : 'Lỗi hình ảnh'}
            </Carousel>
          </div>
          <div className={cx('detail-product-fullimg')}> </div>
        </Col>
        <Col className={cx('detail-product-name')} sm={5}>
          <h1 className={cx('detail-product-name-title')}>{product.product_name}</h1>
          <div className={cx('detail-product-name-price')}>
            {product.discount ? (
              <>
                <strong>
                  {' '}
                  {(
                    product.product_price -
                    (product.product_price * product.discount?.discount_percent) / 100
                  ).toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </strong>
                <span className="strike">
                  {product.product_price.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
                <label> {product.discount.discount_percent}%</label>
              </>
            ) : (
              <>
                <strong>
                  {parseInt(product.product_price).toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </strong>
              </>
            )}

            <span style={{ float: 'right' }}>
              <IoStorefrontOutline size={22} /> {product.storage?.product_quantity} sản phẩm
            </span>
          </div>
          <div className={cx('detail-product-name-kho')}>
            <span>Đã bán: {product.storage?.product_sold} sản phẩm</span>
            <br />
            {product.storage?.product_quantity - product.storage?.product_sold !== 0 ? (
              <span>Còn lại: {product.storage?.product_quantity - product.storage?.product_sold} sản phẩm</span>
            ) : (
              <span> Hết sản phẩm </span>
            )}
          </div>
          <div className={cx('detail-product-name-mua')}>
            {product.storage?.product_quantity - product.storage?.product_sold !== 0 ? (
              <Button
                variant="success"
                onClick={() => {
                  checkCartButton();
                  onAddCart(product.product_id);
                }}
              >
                Mua sản phẩm
              </Button>
            ) : (
              <Button variant="success" disabled>
                Mua sản phẩm
              </Button>
            )}
          </div>

          <div className={cx('detail-product-name-content')}>
            <div className={cx('detail-product-name-content-1 mb-3')}>
              <FcAlarmClock className={cx('detail-product-name-icon')} /> &ensp;
              <span>Đặt online giao tận nhà ĐÚNG GIỜ </span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
            <div className={cx('detail-product-name-content-1  mb-3')}>
              <IoReloadCircleOutline className={cx('detail-product-name-icon')} /> &ensp;
              <span>Đổi, trả sản phẩm trong 7 ngày</span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
            <div className={cx('detail-product-name-content-1  mb-3')}>
              <AiFillLike className={cx('detail-product-name-icon')} /> &ensp;
              <span>Bao sản phẩm chính hãng</span> &ensp;
              <FcCheckmark className={cx('detail-product-name-icon-1')} />
            </div>
          </div>
        </Col>
      </Row>
      <Row className={cx('detail-product-cungloai')}>
        <Col sm={12} className="mt-2 mb-3">
          <div className={cx('detail-product-cungloai-title')}>Sản phẩm liên quan</div>
          <div className={cx('detail-product-cungloai-content')}>
            <Container>
              <Row>
                {products
                  ? products.map((listProduct, index) => (
                      <Col key={index}>
                        <div className={cx('home-product-discount-img')}>
                          <NavLink as="li" to={`/detail/product/${listProduct.product_id}`}>
                            <Image
                              className="d-block w-100 "
                              src={`http://127.0.0.1:8081//${listProduct.images[0]?.image_name}`}
                              alt=""
                            />
                          </NavLink>
                        </div>
                        <div className={cx('home-product-discount-name')}>
                          <NavLink
                            as="li"
                            to={`/detail/product/${listProduct.product_id}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            {listProduct.product_name}
                          </NavLink>
                        </div>
                        <div className={cx('home-product-discount-price')}>
                          {listProduct.discount ? (
                            <>
                              <strong>
                                {' '}
                                {(
                                  listProduct.product_price -
                                  (listProduct.product_price * listProduct.discount?.discount_percent) / 100
                                ).toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </strong>
                              <span className={cx('home-product-discount-price-1')}>
                                {' '}
                                {parseInt(listProduct.product_price).toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </span>
                              <label>
                                <Badge pill className={cx('home-product-discount-price-2')}>
                                  {listProduct.discount?.discount_percent}%
                                </Badge>
                              </label>
                            </>
                          ) : (
                            <>
                              <strong>
                                {' '}
                                {parseInt(listProduct.product_price).toLocaleString('vi', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </strong>
                            </>
                          )}
                        </div>
                      </Col>
                    ))
                  : ''}
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
      <Row className={cx('detail-product-thongtin')}>
        <Col sm={12} className="mt-2 mb-3">
          <div className={cx('detail-product-thongtin-title')}>
            <span> Thông tin sản phẩm </span>
            <span style={{ float: 'right' }}> Nhà cung cấp {product.provider} </span>
          </div>
          <div className={cx('detail-product-thongtin-content')}>{product.product_describe}</div>
        </Col>
      </Row>

      <Row className={cx('detail-product-comment')}>
        <Col sm={12}>
          <div className={cx('detail-product-comment-title')}>Đánh giá sản phẩm</div>
          <div className={cx('detail-product-comment-content')}>
            <Container fluid>
              <Row>
                {comments.map((comment, index) => (
                  <Col
                    className="mb-2"
                    sm={12}
                    key={index}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ color: 'Yellow', fontSize: '20px' }}>
                        {comment.comment_star === 1 ? <AiFillStar /> : ''}
                        {comment.comment_star === 2 ? (
                          <>
                            {' '}
                            <AiFillStar /> <AiFillStar />{' '}
                          </>
                        ) : (
                          ''
                        )}
                        {comment.comment_star === 3 ? (
                          <>
                            {' '}
                            <AiFillStar /> <AiFillStar /> <AiFillStar />{' '}
                          </>
                        ) : (
                          ''
                        )}

                        {comment.comment_star === 4 ? (
                          <>
                            {' '}
                            <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />{' '}
                          </>
                        ) : (
                          ''
                        )}
                        {comment.comment_star === 5 ? (
                          <>
                            {' '}
                            <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />{' '}
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: '600 ' }}>
                        {' '}
                        {comment.customer?.customer_name ? comment.customer?.customer_name.toUpperCase() : 'Không tên'}
                      </span>{' '}
                      {comment.comment_content}
                    </div>
                    <div>
                      {moment(comment.createdAt).utc().format('DD-MM-YYYY H:mm:ss')}{' '}
                      <div className="delete-detail" onClick={() => deleteComment(comment.comment_id)}>
                        <AiFillDelete size={22} color="red" />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
            <FloatingLabel className="mb-2 mt-3" controlId="floatingTextarea2" label="Bình luận sản phẩm">
              <Form.Control
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                cols="50"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
            <span> Đánh giá số sao sản phẩm </span>
            <div>
              <Form.Control
                style={{ width: '200px' }}
                className="mb-2 mt-2"
                size="sm"
                type="number"
                min="1"
                max="5"
                value={starComment}
                onChange={(e) => setStarComment(e.target.value)}
                placeholder="Đánh giá số sao"
              />

              <ProgressBar style={{ width: '200px' }}>
                <ProgressBar
                  style={{ alignItems: 'center', width: '40px' }}
                  label={<AiFillStar />}
                  now={starComment * 10 * 2}
                  key={starComment}
                />
                {starComment > 1 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '40px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
                {starComment > 2 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '40px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
                {starComment > 3 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '50px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
                {starComment > 4 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '40px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
                {starComment > 5 ? (
                  <ProgressBar
                    style={{ alignItems: 'center', width: '40px' }}
                    label={<AiFillStar />}
                    now={starComment * 10 * 2}
                  />
                ) : (
                  <></>
                )}
              </ProgressBar>
            </div>

            <Button className="mb-4 mt-2" variant="success" onClick={() => comment()}>
              Bình luận sản phẩm
            </Button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default DetailProduct;
