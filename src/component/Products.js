import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table,Container,Button,Row,Col } from 'react-bootstrap'
import axios from 'axios'
const Products = () => {
  const[products,setProducts]=useState([])
  const navigate=useNavigate()
  const auth=localStorage.getItem('logged')
  React.useEffect(()=>{
    if(!auth){
      navigate('/login')
    }else{
    axios.get('http://localhost:8000/products').then(res=>setProducts(res.data))    //fetch products call
    }
  },[auth,navigate])


  const handleDelete=(id)=>{                  //delete products method call
    axios.delete(`http://localhost:8000/products/${id}`)
   setProducts(products.filter(item=>item.id!==id))
  }                         //line no. is used for send id in params
  return (
    <Container className="mt-5">
    <Row className="justify-content-md-center">
    <Col >
      <h2>Products</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Product</th>
            <th>Description</th>
            <th>ops</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,index) => (
            <tr key={product.id}>
              <td>{index+1}</td>
              <td>{product.name}</td>
              <td >₹{product.price}</td>
              <td style={{display:'flex',justifyContent:'center'}}><img src={product.file} style={{width:'100px'}}/></td>
              <td>{product.description}</td>
              <td>
                <Button variant='danger' onClick={()=>handleDelete(product.id)}>delete</Button>
                <Link to={'/update/'+product.id}><Button variant='success'>Update</Button></Link>  
              </td>
            </tr>
          ))}     
        </tbody>                            
      </Table>
      </Col>
      </Row>
    </Container>
  )
}

export default Products
