import axios from 'axios';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function AddCustomer(){

    const code=useRef("");
    const fullName=useRef("");
    const phoneNumber=useRef("");
    const address=useRef("");
    

    const navigate= useNavigate();

    function AddCustomerHandler(){
        let model={
            code: code.current.value,
            fullName: fullName.current.value,
            phoneNumber: phoneNumber.current.value,
            address: address.current.value
          }

        axios.post("http://localhost:5172/customer/add",model)
        .then((response)=>{
            navigate("/")
        });
    }

    return (<>
    <legend> Add a new Customer</legend>
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
      <Form.Label>phoneNumber</Form.Label>
      <Form.Control type="text" ref={phoneNumber} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCustomerAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" ref={address} rows={3} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={AddCustomerHandler}>
        Save
      </Button>
    </Form>
    </>)
}

export default AddCustomer;