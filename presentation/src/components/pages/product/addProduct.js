import axios from 'axios';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function AddProduct(){

    const code=useRef("");
    const name=useRef("");
    const weight=useRef("");
    const description=useRef("");
    const imageUrl = useRef("");

    const navigate= useNavigate();

    function AddProductHandler(){
        let model={
            "code": code.current.value,
            "name": name.current.value,
            "weight": weight.current.value,
            "description": description.current.value,
            "imageUrl":imageUrl.current.value
          }
console.log(model);
        axios.post("http://localhost:5172/product/add",model)
        .then((response)=>{
            navigate("/")
        });
    }

    return (<>
    <legend> Add a new product</legend>
      <Form>
      <Form.Group className="mb-3" controlId="formProductCode">
        <Form.Label>Code</Form.Label>
        <Form.Control type="text" ref={code} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProductName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" ref={name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProductWeight">
      <Form.Label>Weight</Form.Label>
      <Form.Control type="number" ref={weight} placeholder="Gram" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProductNam">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" ref={description} rows={3} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProductNam">
        <Form.Label>ImageUrl</Form.Label>
        <Form.Control   type='text' ref={imageUrl}/>
      </Form.Group> 

      <Button variant="primary" type="submit" onClick={AddProductHandler}>
        Save
      </Button>
    </Form>
    </>)
}

export default AddProduct;