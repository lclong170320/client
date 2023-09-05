import style from './Footer.css';
import classNames from 'classnames/bind';

import { HiOutlinePhone } from 'react-icons/hi';
import { AiFillTwitterCircle, AiOutlineMail } from 'react-icons/ai';
import { BsFacebook, BsInstagram } from 'react-icons/bs';

import React from 'react';
const cx = classNames.bind(style);

function Footer() {
  return (
    <footer className={cx('default-footer-wrapper')}>
      <div className={cx('container-fluid text-md-left default-footer-wrapper-content')}>
        <div className="row">
          <div className={cx('col-md-6 mt-md-0 mt-3 ')}>
            <p className={cx('tong-dai text-center')}>
              <HiOutlinePhone className={cx('tong-dai-phone')} />
              <span className={cx('tong-dai-content')}> Tổng đài: 034-979-41-77 (7:00 - 21:30)</span>
            </p>
            <span className={cx('tong-dai-address')}>
              Địa chỉ: Số 138, Trần hưng đạo, Ninh kiều, Cần thơ <br />
              Email: lclong1703@gmail.com
            </span>

            <span className={cx('tong-dai-icon')}>
              <AiOutlineMail className={cx('tong-dai-icon-goole')} />
              <BsFacebook className={cx('tong-dai-icon-fb')} />
              <AiFillTwitterCircle className={cx('tong-dai-icon-twi')} />
              <BsInstagram className={cx('tong-dai-icon-ins')} />
            </span>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Hướng dẵn mua hàng</h5>
            <ul className={cx('list-unstyled')}>
              <li>
                <a href="#!">Trang chủ</a>
              </li>
              <li>
                <a href="#!">Giới thiệu</a>
              </li>
              <li>
                <a href="#!">Danh mục</a>
              </li>
              <li>
                <a href="#!">Liên hệ</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Chính sách hỗ trợ</h5>
            <ul className={cx('list-unstyled')}>
              <li>
                <a href="#!">Bảo đảm chất lượng</a>
              </li>
              <li>
                <a href="#!">Đạt chuẩn quốc tế</a>
              </li>
              <li>
                <a href="#!">Hổ trợ 24/2</a>
              </li>
              <li>
                <a href="#!">Đổi trả 1-1 khi lỗi</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={cx('footer-copyright text-center py-3')}>
        © 2022 Copyright:
        <a href="https://mdbootstrap.com/"> lclong1703@gmail.com</a>
      </div>
    </footer>
  );
}

export default Footer;
