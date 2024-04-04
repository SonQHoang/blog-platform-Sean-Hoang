import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { postComment } from "../../store/postcomments"
import "./CommentsModal.css"

const CommentsModal = ({ isOpen, onClose }) => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const [commentText, setCommentText] = useState("")

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

  const submitComment = async (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      const data = await dispatch(postComment({ postId, comment: commentText }))
      if (data) {
        setCommentText("")
        onClose()
      }
    }
  }

  return (
    <div className={modalClassName}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}></span>
        <h2>Leave a Comment</h2>
        <form onSubmit={submitComment}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button type="submit">Submit Your Comment</button>
        </form>
      </div>
    </div>
  )
}

export default CommentsModal
