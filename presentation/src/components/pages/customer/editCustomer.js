import axios from 'axios';
import { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCustomer(){

    const code=useRef("");
    const fullName=useRef("");
    const phoneNumber=useRef("");
    const address=useRef("");

    const {id} = useParams();
    const navigate= useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5172/customer/get/${id}`)
        .then((response)=>{
            code.current.value=response.data.code;
            fullName.current.value=response.data.fullName;
            phoneNumber.current.value=response.data.phoneNumber;
            address.current.value=response.data.address;

        });
    },[id]);

    function UpdateProductHandler(){
        let model={
            id: id,
            fullName: fullName.current.value,
            phoneNumber: phoneNumber.current.value,
            code: code.current.value,
            address: address.current.value
          }

        axios.put("http://localhost:5172/customer/update",model)
        .then((response)=>{
            navigate("/")
        });
    }

    return (<>
    <legend> update the Customer</legend>
    <Form>
      <Form.Group className="mb-3" controlId="formCustomerCode">
        <Form.Label>Code</Form.Label>
        <Form.Control type="text" ref={code} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCustomerName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" ref={fullName} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCustomerPhone">
      <Form.Label>phomeNumber</Form.Label>
      <Form.Control type="text" ref={phoneNumber} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCustomerAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" ref={address} rows={3} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={UpdateProductHandler}>
        Save
      </Button>
    </Form>
    </>)
}

export default UpdateCustomer;