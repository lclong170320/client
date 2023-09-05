import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useEffect } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

// api
import * as customerApi from '../../api/customer';
export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
export const validPhone = new RegExp('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$');

const Information = () => {
  // call api
  const [customer, setCustomer] = useState({});
  const [file, setFile] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      const local = await localStorage.getItem('author');
      const localCustomer = JSON.parse(local);
      const data = await customerApi.get(`customers?customer_id=${localCustomer.id}`);
      setCustomer(data.customers[0]);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (customer.customer_avatar) {
      setFile(`http://127.0.0.1:8081//${customer.customer_avatar}`);
    }
  }, [customer]);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const findFormErrors = () => {
    const { customer_gmail, customer_phone } = form;
    const newErrors = {};

    if (!validEmail.test(customer_gmail ? customer_gmail : customer.customer_gmail)) {
      newErrors.customer_gmail = 'Gmail không đúng định dạng';
    }
    if (!validPhone.test(customer_phone ? customer_phone : customer.customer_phone)) {
      newErrors.customer_phone = 'Số điên thoại không đúng định dạng';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      event.preventDefault();
      axios
        .put(
          `http://localhost:3000/customers/${customer.customer_id}`,
          {
            customer_name: form.customer_name ? form.customer_name : customer.customer_name,
            customer_gmail: form.customer_gmail ? form.customer_gmail : customer.customer_gmail,
            customer_dob: form.customer_dob ? form.customer_dob : customer.customer_dob,
            customer_phone: form.customer_phone ? form.customer_phone : customer.customer_phone,
            customer_avatar: form.customer_avatar ? form.customer_avatar : '',
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          toast.success(`Bạn cập nhật thông tin thàng công`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          toast.error(`Bạn cập nhật thông tin thất bại`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const checkFile = () => {
    customer.customer_avatar = undefined;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row style={{ marginLeft: '20px' }}>
        <h6 style={{ marginTop: '10px' }}>Thông tin cá nhân</h6>
        <Row className="mb-5 mt-2">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <div>
              <img
                style={{
                  marginLeft: '120px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: '1px solid darkgray',
                  objectFit: 'cover',
                  backgroundColor: 'darkgray',
                }}
                src={
                  file
                    ? customer.customer_avatar
                      ? file
                      : URL.createObjectURL(file)
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT8-e9Jpr1AyNwkdf_iE_zQjknFwrn3kBbQQ&usqp=CAU'
                }
                alt=""
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control
              type="text"
              name="customer_name"
              onChange={(e) => setField('customer_name', e.target.value)}
              defaultValue={customer.customer_name}
              required
            />
            <br />
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              name="customer_avatar"
              onChange={(e) => {
                checkFile();
                setFile(e.target.files[0]);
                setField('customer_avatar', e.target.files[0]);
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="customer_phone"
              onChange={(e) => setField('customer_phone', e.target.value)}
              required
              defaultValue={customer.customer_phone}
              isInvalid={!!errors.customer_phone}
            />
            <Form.Control.Feedback type="invalid">{errors.customer_phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Ngày Sinh</Form.Label>

            <Form.Control
              type="date"
              onChange={(e) => setField('customer_dob', e.target.value)}
              name="customer_dob"
              defaultValue={customer.customer_dob && moment(customer.customer_dob).utc().format('YYYY-MM-DD')}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Gmail</Form.Label>
            <Form.Control
              type="text"
              name="customer_gmail"
              onChange={(e) => setField('customer_gmail', e.target.value)}
              required
              defaultValue={customer.customer_gmail}
              isInvalid={!!errors.customer_gmail}
            />
            <Form.Control.Feedback type="invalid">{errors.customer_gmail}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Loại tài khoản</Form.Label>
            <Form.Control type="text" defaultValue={customer.type} disabled />
          </Form.Group>
        </Row>
      </Row>

      <Row>
        <Col sm={12} className="mb-4">
          <div style={{ marginLeft: '300px' }} className="mb-2 modal-Login">
            <Button type="submit" style={{ width: '300px' }} variant="success">
              Cập nhật
            </Button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Form>
  );
};
export default Information;
