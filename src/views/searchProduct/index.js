import { Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import style from './searchProduct.css';

import { Col, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import * as productApi from '../../api/product';
import { useEffect, useState } from 'react';

import FrameProduct from '../../components/FrameProduct';
import { useSearchParams } from 'react-router-dom';
const cx = classNames.bind(style);

function SearchProduct() {
  // eslint-disable-next-line  no-unused-vars
  const [search, setSearch] = useSearchParams();
  const searchName = search.get('name') || '';

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`products?limit=${50}&&product_name=${searchName}`);
      setData(data.products);
    };
    fetchAPI();
  }, [searchName]);

  return (
    <Container fluid="md">
      <div className={cx('detail-product-breadcrumbs')}>
        {' '}
        <Breadcrumb>
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Sản phẩm</Breadcrumb.Item>
          <Breadcrumb.Item active>{searchName}</Breadcrumb.Item>
        </Breadcrumb>{' '}
      </div>

      <Row className={cx('home-product-all')}>
        <Col>
          <div className={cx('home-product-discount-tile')}>SẢN PHẨM </div>
          <div className={cx('home-product-discount-content')}>
            <Container>
              <Row>
                <FrameProduct data={data} discount={false} />
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchProduct;
