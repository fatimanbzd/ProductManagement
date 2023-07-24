import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


  function DeleteConfirmationModal(props){
    return(
      <>
      <Modal show={props.showModal} onHide={()=>{}}>
        <Modal.Header closeButton>
          <Modal.Title>{props.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.Body}!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{props.closeConfirmationPopUpHandler()}}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>{props.deleteConfirmationPopUpHandler()}}>
            confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>)
      }

export default DeleteConfirmationModal;