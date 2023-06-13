import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Confirm = ({ onClick, handleCancel, show, disabled }) => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(disabled);

  const handleDelete = async () => {
    setDeleteButtonDisabled(true);
    await onClick();
    setDeleteButtonDisabled(false);
    handleCancel()
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel} disabled={deleteButtonDisabled}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={deleteButtonDisabled}>
          {deleteButtonDisabled ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirm;
