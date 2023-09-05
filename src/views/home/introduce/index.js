import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from './Introduce.css';
import classNames from 'classnames/bind';
import { Image } from 'react-bootstrap';
import gioithieu2 from '../../../styles/img/gioithieu2.png';

const cx = classNames.bind(style);

function Introduce() {
  return (
    <Container className={cx('introduce mt-2 mb-5')}>
      <Row className={cx('introduce-2')}>
        <Col sm={12}>
          {' '}
          <h5>Giới thiệu về siêu thị mini </h5>
        </Col>
        <Col sm={8} className={cx('introduce-content')}>
          <div className={cx('introduce-content-div')}>
            <h4 style={{ textAlign: 'center' }}>SIÊU THỊ MINI </h4>
            <span style={{ fontSize: '18px', fontWeight: '600' }}>
              Cuối năm 2021, SIÊU THỊ MINI được đưa vào thử nghiệm với hình thức chuỗi cửa hàng chuyên bán lẻ thực phẩm
              tươi sống (thịt cá, rau củ, trái cây,…) và nhu yếu phẩm chất lượng, nguồn gốc rõ ràng. Trải qua gần 1 năm
              hình thành và phát triển ý tưởng về một web bán hang online dựa trên nên tảng của các siêu thị mini thì
              trang web siêu thị mini của em chính thức ra đời, với mục đích giúp người dùng mua sắm một các nhanh chóng
              và hiệu quả, cải thiện danh thu của cửa hàng khi bán trên nền tảng website.
            </span>
          </div>
        </Col>
        <Col sm={4} className={cx('introduce-content')}>
          <Image src={gioithieu2} alt="loi" />
        </Col>
        <Col sm={12} className={cx('introduce-content-3')}>
          <div className={cx('introduce-content-3-2')}>
            <div>
              {' '}
              1+ <br />
              Nhân viên
            </div>
            <div>
              3 <br />
              Tháng thành lập
            </div>
            <div>
              1 <br />
              Cửa hàng
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} className={cx('introduce-content-4 mt-4 mb-2 ')}>
          <h5 style={{ color: '#008848', textAlign: 'center' }}>MỤC TIÊU CỦA SIÊU THỊ MINI </h5>
          <div className={cx('introduce-content-4-1')}>
            <p>
              Chúng tôi mong muốn mang đến sự nhanh chóng và tiện lợi tối đa khi mua sắm đến cho khách hàng bằng việc
              đưa hệ thống siêu thị Mini lên hệ thống website. Bên cạnh đó, chúng tôi cũng tập trung phát triển kênh mua
              sắm online trên website Sieuthimini.com để phục vụ cho mọi đối tượng, đặc biệt là nhóm khách hàng trẻ.{' '}
            </p>
            <p>
              Siêu thị mini cũng không ngừng tìm kiếm và mang đến sự đa dạng trong việc lựa chọn sản phẩm với hơn 12.000
              sản phẩm đủ chủng loại, xuất xứ rõ ràng, giá cả hợp lý, minh bạch.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12} className={cx('introduce-content-5 text-center mb-5')}>
          <h4>Cảm ơn các bạn đã đến với chúng tôi. Chúc các bạn một ngày tốt lành</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Introduce;
