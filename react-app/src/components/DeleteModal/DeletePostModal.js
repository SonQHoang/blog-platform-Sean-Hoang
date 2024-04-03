import React from "react"
import "./DeletePostModal.css"

const DeletePostModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null
  const modalClassName = isOpen ? "modal modal-open" : "modal"

  return (
    <div className={modalClassName}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}></span>
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete this post?</p>
        <button onClick={onConfirm}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

export default DeletePostModal
