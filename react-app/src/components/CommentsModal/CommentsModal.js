import React, { useEffect } from "react"
import "./CommentsModal.css"

const CommentsModal = ({ isOpen, onClose, onConfirm }) => {
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
        <h2>Leave a Comment</h2>
        <textarea></textarea>
        <button onClick={onConfirm}>Submit Your Comment</button>
      </div>
    </div>
  )
}

export default CommentsModal
