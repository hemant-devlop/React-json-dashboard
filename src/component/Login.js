import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link  } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useDebounce from './custom hooks/useDebounce';

function Login() { 
  // const [users,setUsers] = useState([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // const data = watch('email');
  // const debounceValue= useDebounce(data,2000);
  const navigate = useNavigate();
  useEffect(() => {
    // if (debounceValue != '') { 
      // const getUser = async () => {  
        // axios.get("https://json-server-gjf9.onrender.com/users?email="+"8114hd@gmail.com", {
        //   headers: {
        //     'Cache-Control': 'no-cache',
        //     // 'Pragma': 'no-cache',
        //     // 'Expires': '0'
        //   }
        // }).then(res=>setUsers(res.data));
        // console.log(users)
        // setUsers(debounceValue)
          // Handle the result as needed, e.g., set the state or update the UI
       
          // console.error('Error:', err.response ? err.response.data : err.message);
        
      // };
      // getUser();
    // }
// console.log(debounceValue)
     
    if (localStorage.getItem('logged')) {
      navigate('/add');
    }
  },[]);               //useeffect end
  const user = {
    name:'hemant kumar',
    email:'8114hd@gmail.com',
    password:'12345'
  }
  const onSubmit = (data) => {                             //onsubmit handle
    if (user.length === 0) {
      alert('No user found with this email');
      return;
    }

    // const user = users[0];
    const localdata=JSON.parse(localStorage.getItem('user'))
    if (data.email === user.email  && data.password === user.password || data.email ===localdata.email  && data.password ===localdata.password) {
      alert('User logged in successfully');
      // localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('logged', true);     //prevent loggout
      navigate('/');
    } 
    else if (data.email !== user.email) {
      alert('Wrong email');
    }else if (data.password !== user.password) {
      alert('Wrong password');
    }else{
      alert ('wrong info')
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login </h2>
          <p>(email:8114hd@gmail.com password:12345)</p>
          <p>you can try by register your self</p>
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

            <Button variant="primary" type="submit"  className="mt-3">
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
