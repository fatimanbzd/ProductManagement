import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../shared/delete";
import { UrlContext } from "../../../context/urlContext";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(0);
  const navigate = useNavigate();

  const { Url } = useContext(UrlContext);
  useEffect(() => {
    axios.get(`${Url}/product`).then((response) => {
      setProducts((existingData) => {
        return response.data;
      });
    });
  }, []);

  function showDeleteConfirmationHandler(id) {
    setShowModal(true);
    setProductToDelete(id);
  }

  function closeConfirmationPopUpHandler() {
    setShowModal(false);
    setProductToDelete(0);
  }

  function deleteConfirmationPopUpHandler() {
    axios.delete(`${Url}/product/${productToDelete}`).then((response) => {
      setShowModal(false);
      setProducts((existingData) => {
        return existingData.filter((_) => _.id !== productToDelete);
      });
      setProductToDelete(0);
    });
  }

  return (
    <>
      <DeleteConfirmationModal
        showModal={showModal}
        Title="Delete Confirmation"
        Body="Are you sure to delete the product?"
        closeConfirmationPopUpHandler={closeConfirmationPopUpHandler}
        deleteConfirmationPopUpHandler={deleteConfirmationPopUpHandler}
      ></DeleteConfirmationModal>

      <br />
      <div className="d-grid gap-2">
        <Button
          variant="outline-primary"
          size="lg"
          type="button"
          onClick={() => {
            navigate("/add-product");
          }}
        >
          Add Product
        </Button>
      </div>
      <br />

      <Row xs={1} md={5} className="g-4">
        {products.map((pr) => (
          <Col key={pr.id}>
            <Card>
              <Card.Img variant="top" src={pr.imageUrl} />
              <Card.Body>
                <Card.Title>
                  {pr.name} - {pr.code}
                </Card.Title>
                <Card.Text>
                  <b>Weight: </b> {pr.weight}
                </Card.Text>
                <Card.Text>
                  <b>Description: </b> {pr.description}
                  {pr.description}
                </Card.Text>
                <Button
                  variant="outline-warning"
                  type="button"
                  onClick={() => {
                    navigate(`/edit-product/${pr.id}`);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  type="button"
                  onClick={() => {
                    showDeleteConfirmationHandler(pr.id);
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default AllProduct;
