import styles from './Sidebar.css';
import classNames from 'classnames/bind';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsHeartFill } from 'react-icons/bs';

import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState, useContext } from 'react';

//api
import Loadpage from '../.././../loadpage/Loadpage';
import * as categoryApi from '../../../../api/category';
import * as favoriteApi from '../../../../api/favorite';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
import { checkCart } from '../index';
const cx = classNames.bind(styles);

function Sidebar() {
  const checkCartButton = useContext(checkCart);

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await categoryApi.get('categories?limit=99');
      setCategory(data.categories);
      setLoading(false);
    };
    fetchAPI();
  }, []);

  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    const fetchAPI = async () => {
      if (local) {
        const data = await favoriteApi.get(`favorites?limit=5&&customer_id=${local.id}`);
        setFavorites(data.favorites);
        setLoading(false);
      }
    };
    fetchAPI();
  }, [checkCartButton]);

  if (loading) return <Loadpage />;
  else
    return (
      <>
        <aside className={cx('default-sidebar-wrapper')}>
          <ListGroup className={cx('default-sidebar-menu')}>
            <ListGroup.Item>
              <AiOutlineMenu className={cx('default-sidebar-menu-icon')} />
              DANH MỤC SẢN PHẨM
            </ListGroup.Item>
            {category.map((category, index) => {
              return (
                <Link
                  as="li"
                  className={cx('default-sidebar-menu-link')}
                  key={index}
                  to={`/detail/categories/${category.category_id}`}
                >
                  <ListGroup.Item className={cx('item-menu')}>{category.category_name}</ListGroup.Item>
                </Link>
              );
            })}
          </ListGroup>
          <br /> <br />
          {favorites.length > 0 ? (
            <div>
              {' '}
              <ListGroup className={cx('default-sidebar-menu')}>
                <ListGroup.Item>
                  <BsHeartFill style={{ color: 'red' }} className={cx('default-sidebar-menu-icon')} />
                  SẢN PHẨM YÊU THÍCH
                </ListGroup.Item>
                {favorites.map((favorite, index) => {
                  return (
                    <Link
                      as="li"
                      className={cx('default-sidebar-menu-link')}
                      key={index}
                      to={`/detail/product/${favorite.product_id}`}
                    >
                      <ListGroup.Item className={cx('item-menu-favorite')}>
                        <Row>
                          <Col xs={3}>
                            <Image
                              className="d-block"
                              style={{
                                height: '50px',
                                width: '70px',
                                marginLeft: '-10px',
                              }}
                              src={`http://127.0.0.1:8081//${favorite.product?.images[0].image_name}`}
                              alt="Lỗi hình ảnh"
                            />
                          </Col>
                          <Col
                            className={cx('item-menu-favorite-content')}
                            xs={9}
                            style={{ height: '50px', width: '140px', whiteSpace: 'nowrap', overflow: 'hidden' }}
                          >
                            <div style={{ textOverflow: 'ellipsis' }}>{favorite.product?.product_name} </div>
                            <span>{favorite.product?.provider} </span>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </Link>
                  );
                })}
              </ListGroup>{' '}
            </div>
          ) : (
            <></>
          )}
        </aside>
      </>
    );
}

export default Sidebar;
