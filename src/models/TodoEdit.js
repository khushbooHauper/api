import { useState } from "react";

import { Form, Button, Modal } from "react-bootstrap";

function TodoEdit({
  onEditConfirm,
  handleCancel,
  show,
  idToEdit,
  initialData,
  disabled
}) {
  const [title, settitle] = useState(initialData?.title || "");
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(disabled);

  const handleEdit = async () => {
    setUpdateButtonDisabled(true);
    const updatedData = {
      title: title
      };

   await onEditConfirm(updatedData); // Pass updatedData to onEditConfirm function
    // Enable the buttons after successful update
    setUpdateButtonDisabled(false);
    
  };

  return (
    <>
      <Modal show={show} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>title:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
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

export default TodoEdit;
