import React from 'react';
import './Account.css';
import Nav from 'react-bootstrap/Nav';
import { FaRegAddressCard } from 'react-icons/fa';
import { RiBillLine } from 'react-icons/ri';
import { BiCommentDetail } from 'react-icons/bi';
import { HiLocationMarker } from 'react-icons/hi';
import { BsFillHeartFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

function Account() {
  return (
    <Nav className="flex-column">
      <Nav.Item>
        <Nav.Link as="li" style={{ color: 'black', textAlign: 'center' }}> Thông tin cá nhân</Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-3 account-hove">
        <Nav.Link eventKey="link-1">
          <NavLink  as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/thong-tin-ca-nhan">
            <FaRegAddressCard className="account-icon" size={26} />
            &nbsp; Thông tin tài khoản
          </NavLink>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-3 account-hove">
        <Nav.Link eventKey="link-1">
          <NavLink as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/doi-mat-khau">
            <RiLockPasswordFill className="account-icon" size={26} />
            &nbsp; Đổi mật khẩu
          </NavLink>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-3 account-hove">
        <Nav.Link eventKey="link-1">
          <NavLink as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/hoa-don">
            <RiBillLine className="account-icon" size={28} /> Quản lý đơn hàng
          </NavLink>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-3 account-hove">
        <Nav.Link eventKey="link-1">
          <NavLink as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/dia-chi">
            <HiLocationMarker className="account-icon" size={26} />
            &nbsp; Sổ địa chỉ
          </NavLink>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item className="mb-3 account-hove">
        <Nav.Link style={{ color: 'black' }} eventKey="link-1">
          <NavLink as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/binh-luan">
            <BiCommentDetail className="account-icon" size={26} />
            &nbsp; Đánh giá sản phẩm
          </NavLink>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-3 account-hove">
        <Nav.Link eventKey="link-1">
          <NavLink as="li" style={{ color: 'black', textDecoration: 'none' }} to="/tai-khoan/yeu-thich">
            <BsFillHeartFill className="account-icon" size={26} />
            &nbsp; Sản phẩm yên thích
          </NavLink>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Account;
