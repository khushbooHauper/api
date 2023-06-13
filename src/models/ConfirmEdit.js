import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function ConfirmEdit({
  onEditConfirm,
  handleCancel,
  show,
  idToEdit,
  initialData,
  disabled
}) {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [company, setCompany] = useState(initialData?.company?.name || '');
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(disabled);

  const handleEdit = async () => {
    setUpdateButtonDisabled(true);

    const updatedData = {
      name: name,
      email: email,
      company: {
        name: company,
      },
    };

    await onEditConfirm(updatedData); // Pass updatedData to onEditConfirm function

    // Enable the buttons after successful update
    setUpdateButtonDisabled(false);
    
  };

  

  return (
    <>
      <Modal show={show} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={disabled || updateButtonDisabled}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled || updateButtonDisabled}
              />
            </Form.Group>

            <Form.Group controlId="company">
              <Form.Label>Company:</Form.Label>
              <Form.Control
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={disabled || updateButtonDisabled}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel} disabled={disabled || updateButtonDisabled}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit} disabled={disabled || updateButtonDisabled}>
            {updateButtonDisabled || disabled ? 'Updating...' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmEdit;
