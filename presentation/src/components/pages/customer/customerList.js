import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../shared/delete";
import { UrlContext } from "../../../context/urlContext";

function AllCustomer() {
  const { Url } = useContext(UrlContext);
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [CustomerToDelete, setCustomerToDelete] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${Url}/Customer`).then((response) => {
      setCustomers((existingData) => {
        return response.data;
      });
    });
  }, []);

  function showDeleteConfirmationHandler(id) {
    setShowModal(true);
    setCustomerToDelete(id);
  }

  function closeConfirmationPopUpHandler() {
    setShowModal(false);
    setCustomerToDelete(0);
  }

  function deleteConfirmationPopUpHandler() {
    axios
      .delete(`${Url}/customer/remove/${CustomerToDelete}`)
      .then((response) => {
        setShowModal(false);
        setCustomers((existingData) => {
          return existingData.filter((_) => _.id !== CustomerToDelete);
        });
        setCustomerToDelete(0);
      });
  }

  return (
    <>
      <DeleteConfirmationModal
        showModal={showModal}
        Title="Delete Confirmation"
        Body="Are you sure to delete the Customer?"
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
            navigate("/add-customer");
          }}
        >
          Add Customer
        </Button>
      </div>
      <br />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Full Name</th>
            <th>phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cr) => (
            <tr key={cr.id}>
              <td>{cr.code}</td>
              <td>{cr.fullName}</td>
              <td>{cr.phoneNumber}</td>
              <td>{cr.address}</td>
              <td>
                <Button
                  variant="outline-warning"
                  type="button"
                  onClick={() => {
                    navigate(`/edit-customer/${cr.id}`);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  type="button"
                  onClick={() => {
                    showDeleteConfirmationHandler(cr.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AllCustomer;
