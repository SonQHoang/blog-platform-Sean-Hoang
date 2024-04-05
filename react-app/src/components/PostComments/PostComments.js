import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import CommentsModal from "../CommentsModal/CommentsModal"
import { getComments } from "../../store/postcomments"
import { postComment } from "../../store/postcomments"
import "./PostComments.css"

const PostComments = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [commentToEdit, setCommentToEdit] = useState(null)

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch])

  const comments = useSelector((state) => state.postComments.comments)

  const openModal = (post) => {
    setCommentToEdit(post)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleCommentConfirm = () => {
    if (commentToEdit) {
      dispatch(postComment(commentToEdit.id)).then(() =>
        dispatch(getComments())
      )
      history.push("/")
    }
    closeModal()
  }

  return (
    <>
      <div className="post-comments-container">
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

          {comments.map((comment) => (
            <div key={comment.id}>
              <p>By: {comment.author}</p>
              <p>{`Date Created: ${new Date(
                comment.date_created
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}</p>
              <p>Comment: {comment.body}</p>
            </div>
          ))}
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
