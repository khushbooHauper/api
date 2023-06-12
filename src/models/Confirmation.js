import React from "react";

export default function Confirmation({ onClick, handleCancel ,disabled}) {
  return (
    <div className="modal fade" id="confirmationModal" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmationModalLabel">Confirmation</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleCancel}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={onClick} disabled={disabled}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
