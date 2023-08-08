import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { UrlContext } from "../../../context/urlContext";

function UpdateProduct() {
  const { Url } = useContext(UrlContext);

  const code = useRef("");
  const name = useRef("");
  const weight = useRef("");
  const description = useRef("");
  const imageUrl = useRef("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${Url}/product/${id}`).then((response) => {
      code.current.value = response.data.code;
      name.current.value = response.data.name;
      weight.current.value = response.data.weight;
      description.current.value = response.data.description;
      imageUrl.current.value = response.data.imageUrl;
    });
  }, [id]);

  function UpdateProductHandler() {
    let model = {
      id: id,
      name: name.current.value,
      weight: weight.current.value,
      code: code.current.value,
      description: description.current.value,
      imageUrl: imageUrl.current.value,
    };

    axios.put(`${Url}/product`, model).then((response) => {
      navigate("/");
    });
  }

  return (
    <>
      <legend> update the product</legend>
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
          <Form.Control type="text" ref={imageUrl} />
        </Form.Group>

        <Button variant="primary" type="button" onClick={UpdateProductHandler}>
          Update
        </Button>
      </Form>
    </>
  );
}

export default UpdateProduct;
