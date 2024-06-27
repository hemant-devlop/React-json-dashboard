import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';

function Add() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = localStorage.getItem('logged');
  React.useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const onSubmit = async (data) => {
    try {
      // const formData = new FormData();
      // formData.append('name', data.name);
      // formData.append('price', data.price);
      // formData.append('file', data.file[0]);
      // formData.append('description', data.description);

      const response = await axios.post('https://json-server-gjf9.onrender.com/products', data);

      console.log(response);
      // Redirect to another page after successful submission
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
    <Row className="justify-content-md-center">
    <Col md={6}>
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            {...register('name', { required: 'Name is required' })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPrice" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            {...register('price', { required: 'Price is required' })}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>File</Form.Label>                               
          <Form.Control
            type="text"
            placeholder='Enter product image link'
            {...register('file', {required:'image link is required' })}
            isInvalid={!!errors.file}
          />
          <Form.Control.Feedback type="invalid">
            {errors.file?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>                      
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            {...register('description', { required: 'Description is required' })}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  );
}

export default Add;
