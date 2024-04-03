import React, { useEffect } from "react"
import "./DeletePostModal.css"

const DeletePostModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const modalContent = document.querySelector(".modal-content")
      if (modalContent && !modalContent.contains(e.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [onClose])

  if (!isOpen) return null
  const modalClassName = isOpen ? "modal modal-open" : "modal"

  return (
    <div className={modalClassName}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
