import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Col, FloatingLabel, Row, Table } from "react-bootstrap";
import ProductSearchBar from "../../../shared/ProductSearchBar";
import CustomerSearchBar from "../../../shared/customerSearchBar";
import { UrlContext } from "../../../../context/urlContext";

function AddCustomerOrder() {
  const { Url } = useContext(UrlContext);

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    axios.get(`${Url}/product/get`).then((response) => {
      setProducts((existingData) => {
        return response.data;
      });
    });
    axios.get(`${Url}/Customer/get`).then((response) => {
      setCustomers((existingData) => {
        return response.data;
      });
    });
  }, []);

  const [productDetails, setProductDetails] = useState([]);

  let arrayproduct = {};
  function addProduct() {
    if (
      Object.keys(arrayproduct).length !== 0 &&
      !productDetails.some((el) => el.id === arrayproduct.id)
    )
      setProductDetails([...productDetails, arrayproduct]);
  }

  function onSelectedProduct(product) {
    if (product === null) {
      return;
    }
    arrayproduct = {
      id: product.id,
      name: product.name,
      code: product.label,
      count: 1,
      price: 0,
      totalPrice: 0,
    };
  }

  function onSelectedCustomer(customer) {
    if (customer === null) {
      return;
    }
    setCustomer(customer);
  }

  function handleChange(index, event) {
    const { name, value } = event.target;
    const list = [...productDetails];
    list[index][name] = value;
    setProductDetails(list);
  }

  function getotalPrice() {
    setTotalPrice(
      productDetails.map((m) => m.totalPrice).reduce((p, c) => p + c)
    );
  }

  function onsubmit() {
    let model = {
      customerId: customer.id,
      productDetails: productDetails.map((m) => {
        return {
          id: m.id,
          count: m.count,
          price: m.price,
          totalPrice: m.totalPrice,
        };
      }),
    };

    console.log(model);

    // axios
    //   .post("http://localhost:5172/customerOrder/add", model)
    //   .then((response) => {});
  }

  return (
    <>
      <Row className="g-1">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid">
            {customers.length > 0 && (
              <CustomerSearchBar
                customers={customers}
                onSelectedCustomer={onSelectedCustomer}
              ></CustomerSearchBar>
            )}
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid">
            {products.length > 0 && (
              <ProductSearchBar
                products={products}
                onSelectedProduct={onSelectedProduct}
              ></ProductSearchBar>
            )}
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingSelectGrid">
            <Button onClick={addProduct} disabled="">
              +
            </Button>
          </FloatingLabel>
        </Col>
      </Row>

      <br />

      {productDetails.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>price</th>
              <th>Total Price</th>
            </tr>
          </thead>

          <tbody>
            {productDetails.map((pro, index) => (
              <tr key={index}>
                <td>
                  {pro.name} - {pro.code}
                </td>
                <td>
                  <Form.Control
                    type="number"
                    id="count"
                    min="1"
                    onChange={(event) => handleChange(index, event)}
                    value={pro.count}
                    name="count"
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    id="price"
                    onChange={(event) => handleChange(index, event)}
                    value={pro.price}
                    name="price"
                  />
                </td>
                <td>{(pro.totalPrice = pro.price * pro.count)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <br />
      <button onClick={getotalPrice}>calculate</button>
      <label>{totalPrice}</label>
      <br />
      <Button type="submit" onClick={onsubmit}>
        Submit
      </Button>
    </>
  );
}

export default AddCustomerOrder;
