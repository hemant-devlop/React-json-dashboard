import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button,Row,Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Update = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const params = useParams();     //we need to define route also for getting value form url
  // console.log(params)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://json-server-gjf9.onrender.com/products/${params.id}`);
        setUser(response.data);
        setValue('name', response.data.name);                
        setValue('price', response.data.price);
        setValue('file', response.data.file);
        setValue('description', response.data.description);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };
  if(Object.keys(params).length>0){
    fetchData()
  }

  }, [params.id]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`https://json-server-gjf9.onrender.com/products/${params.id}`,data);    //update api called
      alert('Data successfully updated');
      navigate('/');
    } catch (error) {
      console.error('Error updating the data', error);
    }
  };

  return (
    <Container className="mt-5">
       <Row className="justify-content-md-center">
         <Col md={6}>
      <h2>Update Product</h2>
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
          <img style={{ width: '50px', margin: '20px' }} src={user.file} alt="" />
          <Form.Control
            type="text"
            placeholder="Enter product image link"
            {...register('file', { required: 'Image link is required' })}
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

export default Update;
