import { Button, Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import style from './detailCategory.css';

import { Col, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { useParams } from 'react-router-dom';
import * as productApi from '../../api/product';
import { useEffect, useState } from 'react';

import FrameProduct from '../../components/FrameProduct';

const cx = classNames.bind(style);

function DetailCategory() {
  const { category_id } = useParams();

  const [data, setData] = useState([]);
  const [numberProductList, setNumberProductList] = useState(16);
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await productApi.get(`products?limit=${numberProductList}&&category_id=${category_id}`);
      setData(data.products);
    };
    fetchAPI();
  }, [numberProductList, category_id]);

  const number = () => {
    setNumberProductList(numberProductList + 4);
  };

  return (
    <Container fluid="md">
      <div className={cx('detail-product-breadcrumbs')}>
        {' '}
        <Breadcrumb>
          <Breadcrumb.Item href="#">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Loại sản phẩm</Breadcrumb.Item>
          <Breadcrumb.Item active>{data[0]?.category.category_name}</Breadcrumb.Item>
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
            <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '50px' }}>
              <Button onClick={() => number()}>
                <h5> Xem thêm sản phẩm </h5>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailCategory;
