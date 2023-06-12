import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmEdit({ onEditConfirm, handleCancel, show, idToEdit, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [company, setCompany] = useState(initialData?.company?.name || "");

  const handleEdit = () => {
    const updatedData = {
      name: name,
      email: email,
      company: {
        name: company,
      },
    };

    onEditConfirm(updatedData); // Pass updatedData to onEditConfirm function
    handleCancel();
  };

  return (
    <>
      <Modal show={show} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Are you sure you want to edit id: {idToEdit}?</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Company:</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmEdit;
