import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalRegister = ({ setShowModalRegister }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    setShowModalRegister(false);
  };

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const userData = {
    username: '',
    password: '',
  };

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
    const { username, password, againPassword } = form;
    const newErrors = {};
    // name errors
    if (username.length < 8) newErrors.username = 'Tên tài khoản phải đủ 8 ký tự';
    if (password.length < 8) newErrors.password = 'Mật khẩu phải đủ 8 ký tự';
    if (password !== againPassword) newErrors.againPassword = 'Mật khẩu nhập lại bị sai';
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      userData.username = username;
      userData.password = password;
      event.preventDefault();
      axios
        .post(
          `http://localhost:3000/customers/`,
          {
            username: userData.username,
            password: userData.password,
            type: 'Normal',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          userData.id = res.data;
          if (res.status) {
            localStorage.setItem('author', JSON.stringify(userData));
            setShowModalRegister(false);
            toast.success('Đăng ký thành công', {
              position: 'top-right',
              autoClose: 1000,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            toast.error('Tên đăng nhập của bạn đã bị trùng vui lòng nhập lại tên đăng nhập khác', {
              position: 'top-right',
              autoClose: 1000,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            setShowModalRegister(true);
          }
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đăng Ký Tài Khoản</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-1 mb-2" controlId="formBasicEmail">
            <Form.Label>Tên đăng nhập *</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              onChange={(e) => {
                setUsername(e.target.value);
                setField('username', e.target.value);
              }}
              isInvalid={!!errors.username}
            />
            {errors.username ? (
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            ) : (
              <Form.Text className="text-muted">Tên đăng nhập phải đủ 8 ký tự</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mt-2 mb-2" controlId="formBasicPassword">
            <Form.Label required>Mật khẩu *</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={(e) => {
                setField('password', e.target.value);
                setPassword(e.target.value);
              }}
              isInvalid={!!errors.password}
            />
            {errors.username ? (
              <Form.Text className="text-muted">Mật khẩu phải đủ 8 ký tự</Form.Text>
            ) : (
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mt-2 mb-3" controlId="validationCustom03">
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <Form.Control
              required
              name="againPassword"
              type="password"
              placeholder="Nhập lại mật khẩu *"
              onChange={(e) => {
                setField('againPassword', e.target.value);
              }}
              isInvalid={!!errors.againPassword}
            />
            <Form.Control.Feedback type="invalid">{errors.againPassword}</Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            style={{
              width: '200px',
              marginLeft: '120px',
            }}
            variant="outline-dark"
          >
            Đăng ký
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ModalRegister;
