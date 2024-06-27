import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link  } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useDebounce from './custom hooks/useDebounce';

function Login() { 
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const data = watch('email');
  const debounceValue = useDebounce(data, 1000);
  const navigate = useNavigate();

  useEffect(() => {
    if (debounceValue !== '') {
      axios.get(`http://localhost:8000/users?email=${debounceValue}`).then(res => setUsers(res.data));
    }
    if (localStorage.getItem('logged')) {
      navigate('/add');
    }
  }, [debounceValue, navigate]);

  const onSubmit = (data) => {
    if (users.length === 0) {
      alert('No user found with this email');
      return;
    }

    const user = users[0];

    if (data.email === user.email && data.password === user.password) {
      alert('User logged in successfully');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('logged', true);     //prevent loggout
      navigate('/');
    } else if (data.password !== user.password) {
      alert('Wrong password');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Enter email" 
                {...register('email', { required: 'Email is required' })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                {...register('password', { required: 'Password is required' })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
            <Link className='ms-5'to={'/register'}>i don't have an account</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
