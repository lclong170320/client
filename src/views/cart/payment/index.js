import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { BsFillExclamationOctagonFill } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import gitthanhtoan from '../../../styles/img/gitthanhtoan.gif';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function PayMent() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useSearchParams();
  const searchName = search.get('vnp_Amount') || '';
  // eslint-disable-next-line no-unused-vars
  const [note, setNote] = useSearchParams();
  const noteOrder = note.get('vnp_OrderInfo') || '';

  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    if (cartItem) {
      let local = localStorage.getItem('cart');
      if (local) {
        setCartItem(JSON.parse(local));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [address, setAddress] = useState();
  const [total, setTotal] = useState([]);
  useEffect(() => {
    let local = JSON.parse(localStorage.getItem('author'));
    if (local) {
      setAddress(local.address);
    }
    setTotal(parseInt(searchName) / 100);
  }, [searchName]);

  let detailCart = [];
  const onClickSubmit = () => {
    let local = JSON.parse(localStorage.getItem('author'));
    if (local) {
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
          address: address,
          order_payment: 'Thanh toán online',
          order_detail: detailCart,
          order_note: noteOrder ? noteOrder : 'Không có ghi chú',
        })
        .then((res) => {
          if (res) {
            toast.success('Thanh toán thành công', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            localStorage.removeItem('cart');
            setTimeout(() => {
              navigate('/');
            }, 1500);
          }
        })
        .catch((err) => {
          if (err) {
            toast.error('Thanh toán thất bại', {
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
  };
  return (
    <Container style={{ marginTop: '100px', width: '50%', height: '300px', backgroundColor: '#fff' }}>
      <Row>
        <Col
          className="mt-2 mb-2"
          sm={12}
          style={{ display: 'flex', borderBottom: '1px solid black', justifyContent: 'space-between' }}
        >
          <div>
            <h5>Thanh toán online </h5>
          </div>
          <div>
            <h6>
              Siêu thị mini <MdPayment />
            </h6>
          </div>
        </Col>

        <Col sm={12} className="mt-2 mb-2">
          <Alert variant="warning" style={{ fontSize: '14px' }}>
            <BsFillExclamationOctagonFill style={{ width: '25px', height: '30px' }} />
            &nbsp; Bạn vui lòng bấm xác nhận để có thể kết thúc quá trình thanh toán online. Nếu không hệ thống sẽ không
            nhận đơn hàng và không hoàn tiền lại. Xin cảm ơn.
          </Alert>
        </Col>
        <Col sm={12} style={{ textAlign: 'center' }}>
          <Image style={{ width: '500px' }} src={gitthanhtoan} alt="loi" />
        </Col>
        <Col sm={12} style={{ textAlign: 'center' }}>
          <Button variant="outline-success" onClick={() => onClickSubmit()}>
            Xác nhận thanh toán
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PayMent;
