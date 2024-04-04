import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import CommentsModal from "../CommentsModal/CommentsModal"
import "./PostComments.css"

const PostComments = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [commentToEdit, setCommentToEdit] = useState(null)

  const openModal = (post) => {
    setCommentToEdit(post)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleCommentConfirm = () => {
    if (commentToEdit) {
      // dispatch(makeComment(commentToEdit.id)).then(() =>
      //   dispatch(getAllPosts())
      // )
      // history.push("/")
    }
    closeModal()
  }

  return (
    <>
      <div>
        <div className="post-comments-header">
          <h2>Comments</h2>
        </div>

        <div className="post-comments-button">
          {sessionUser && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                openModal()
              }}
            >
              Post a Comment
            </button>
          )}
        </div>
      </div>
      <CommentsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleCommentConfirm}
      />
    </>
  )
}

export default PostComments
