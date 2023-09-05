import classNames from 'classnames/bind';
import style from './Header.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Badge from 'react-bootstrap/Badge';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState, useRef, useContext } from 'react';
import Image from '../../../Image';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useDebounce from '../../../../hooks/useDebounce';

//icon
import { BsCart2 } from 'react-icons/bs';
import { CgSearchFound } from 'react-icons/cg';
import { IoMicOutline } from 'react-icons/io5';
import { BiHeart } from 'react-icons/bi';

import * as search from '../../../../api/search';

//
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

//components
import ModalLogin from '../../../ModalLogin/index.js';
import { checkCart } from '../index';
import ModalRegister from '../../../ModalRegister';
import { MdOutlineExitToApp } from 'react-icons/md';

const cx = classNames.bind(style);

function Header() {
  const checkCartButton = useContext(checkCart);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [speech, setSpeech] = useState(false);

  const [kqtimkiem, setKqtimkiem] = useState([]);
  const [showKq, setShowKq] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);

  const checkSpeechOn = () => {
    setSpeech(true);
  };
  const checkSpeechOff = () => {
    resetTranscript();
    setSpeech(false);
  };
  // eslint-disable-next-line
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(transcript);
  }, [transcript]);

  // user
  const [isUser, setIsUser] = useState({});
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    let author = JSON.parse(localStorage.getItem('author'));
    if (author) {
      setIsUser(author);
      setCurrentUser(true);
    }
    // eslint-disable-next-line no-use-before-define
  }, [currentUser, showModal, showModalRegister]);

  const inputRef = useRef();
  const debounced = useDebounce(searchValue, 400);

  useEffect(() => {
    if (!debounced.trim()) {
      setKqtimkiem([]);
      return;
    }

    const fetchApi = async () => {
      const result = await search.search(debounced);
      setKqtimkiem(result);
    };
    fetchApi();
  }, [debounced]);

  const handleHidenKq = () => {
    setShowKq(false);
  };

  //Cart
  const [cartItemSumQty, setCartItemSumQty] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [cartItem, setCartItem] = useState([]);
  const [cartItemTotal, setCartItemTotal] = useState(0);

  let total = 0;
  useEffect(() => {
    const checkCart = async () => {
      const cartItemCheck = await JSON.parse(localStorage.getItem('cart'));
      if (cartItemCheck) {
        setCartItem(cartItemCheck);
        setCartItemSumQty(cartItemCheck.length);
      }
    };
    checkCart();
  }, [checkCartButton]);
  useEffect(() => {
    if (cartItem) {
      cartItem.map(
        (item) =>
          (total +=
            // eslint-disable-next-line react-hooks/exhaustive-deps
            (item.product_price - ((item.discount_percent ? item.discount_percent : 0) * item.product_price) / 100) *
            item.qty),
      );

      setCartItemTotal(total);
    }
  }, [cartItem]);

  const handleShow = () => setShowModal(true);
  const handleShowRegister = () => setShowModalRegister(true);

  const navigate = useNavigate();
  const goToPosts = async (event) => {
    event.preventDefault();
    navigate({
      pathname: '/search/product/',
      search: `name=${searchValue ? searchValue : transcript}`,
    });
  };

  const logOut = () => {
    localStorage.removeItem('author');
  };

  return (
    <header className={cx('default-header-wrapper')}>
      <Navbar style={{ width: '100%' }}>
        <Container fluid>
          <Navbar.Brand className={cx('default-header-wrapper-tile')} href="/">
            Siêu Thị Mini
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link className={cx('header-link')}>
                <NavLink as="li" className={cx('header-link-link')} to="/">
                  Trang Chủ
                </NavLink>
              </Nav.Link>
              <Nav.Link className={cx('header-link')}>
                <NavLink as="li" className={cx('header-link-link')} to="/gioi-thieu">
                  {' '}
                  Giới Thiệu
                </NavLink>
              </Nav.Link>
              <Nav.Link className={cx('header-link')}>
                <NavLink as="li" className={cx('header-link-link')} to="/lien-he">
                  {' '}
                  Liên Hệ
                </NavLink>
              </Nav.Link>
              <Nav.Link className={cx('header-link')}>
                <NavLink as="li" className={cx('header-link-link')} to="/ho-tro">
                  Hỗ Trợ
                </NavLink>
              </Nav.Link>
              <HeadlessTippy
                visible={showKq && kqtimkiem.length > 0}
                interactive
                render={(attrs) => (
                  <div className={cx('timkiem-ketqua')} tabIndex="-1" {...attrs}>
                    {kqtimkiem.map((result, index) => (
                      <Link
                        as="li"
                        onClick={() => setShowKq(false)}
                        to={`/detail/product/${result.product_id}`}
                        key={index}
                        className={cx('timkiem-ketqua-content')}
                      >
                        <Image
                          className={cx('timkiem-ketqua-img')}
                          src={`http://127.0.0.1:8081//${result.images[0]?.image_name}`}
                          alt="loi"
                        />
                        <div className={cx('timkiem-ketqua-name')}>
                          <h6 className={cx('timkiem-ketqua-name-product')}> {result.product_name} </h6>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                onClickOutside={handleHidenKq}
              >
                <Form className="d-flex" onSubmit={goToPosts}>
                  <Form.Control
                    className={cx('default-header-wrapper-search me-2')}
                    ref={inputRef}
                    type="search"
                    defaultValue={transcript}
                    placeholder="Tìm kiếm sản phẩm"
                    aria-label="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowKq(true)}
                  />

                  <div type="submit" onClick={goToPosts} className={cx('div-icon-tim-kiem')}>
                    <CgSearchFound className={cx('icon-tim-kiem')} />
                  </div>
                </Form>
              </HeadlessTippy>
              <Nav.Link className={cx('icon-mic')}>
                {speech === false ? (
                  <div
                    style={{ marginTop: '4px' }}
                    size="sm"
                    variant="outline-dark"
                    onClick={() => {
                      SpeechRecognition.startListening();
                      checkSpeechOn();
                    }}
                  >
                    <Tippy content="Mic">
                      <div>
                        <IoMicOutline size={35} color={'white'} />
                      </div>
                    </Tippy>
                  </div>
                ) : (
                  <div
                    style={{ marginTop: '4px' }}
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      checkSpeechOff();
                      SpeechRecognition.stopListening();
                    }}
                  >
                    <Tippy content="Mic">
                      <div>
                        <IoMicOutline size={35} color={'red'} />
                      </div>
                    </Tippy>
                  </div>
                )}
              </Nav.Link>

              <Nav.Link>
                <Link as="li" to="/cart">
                  <Tippy content="Giỏ Hàng">
                    <div className={cx('header-cart')}>
                      <BsCart2 size={38} color={'white'} />
                      <span className={cx('header-cart-number')}>{cartItemSumQty}</span>
                      <Badge bg="danger">
                        {cartItemTotal.toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}{' '}
                      </Badge>
                    </div>
                  </Tippy>
                </Link>
              </Nav.Link>

              <Nav.Link style={{ fontSize: '30px' }}>
                <Link as="li" to="/tai-khoan/yeu-thich" style={{ textDecoration: 'none', color: '#fff' }}>
                  <Tippy content="Yêu thích">
                    <div style={{ marginLeft: '50px', marginTop: '-2px' }}>
                      <BiHeart />
                    </div>
                  </Tippy>
                </Link>
              </Nav.Link>
            </Nav>
            {currentUser ? (
              <Nav>
                <NavDropdown
                  id="header-nav-dropdown"
                  title={`Xin chào ${isUser.username}`}
                  menuVariant="light"
                  autoClose="outside"
                  drop="start"
                  active="true"
                  enable-caret="true"
                >
                  <NavDropdown.Item>
                    <NavLink
                      as="li"
                      style={{ color: 'black', textDecoration: 'none' }}
                      to="/tai-khoan/thong-tin-ca-nhan"
                    >
                      Thông tin cá nhân
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/dia-chi">
                      Cập nhật địa chỉ
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/doi-mat-khau">
                      Đổi mật khẩu
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/hoa-don">
                      Lịch sử mua hàng
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={logOut}>
                    Thoát <MdOutlineExitToApp size={26} />
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className={cx('register-login')}>
                <Nav.Link onClick={handleShowRegister} className={cx('register-login-dk')} eventKey={2}>
                  Đăng Ký
                </Nav.Link>
                <Nav className="gachngang"> | </Nav>
                <Nav.Link onClick={handleShow} className={cx('register-login-login')}>
                  {' '}
                  Đăng Nhập
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showModal ? <ModalLogin setShowModal={setShowModal} /> : <></>}

      {showModalRegister ? <ModalRegister setShowModalRegister={setShowModalRegister} /> : <></>}
    </header>
  );
}
export default Header;
