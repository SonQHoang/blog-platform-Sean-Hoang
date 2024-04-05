import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import CommentsModal from "../CommentsModal/CommentsModal"
import DeletePostModal from "../DeleteModal/DeletePostModal"
import { getComments } from "../../store/postcomments"
import { postComment } from "../../store/postcomments"
import { deleteComment } from "../../store/postcomments"
import "./PostComments.css"

const PostComments = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user)
  const comments = useSelector((state) => state.postComments.comments)

  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch])

  const openCommentsModal = () => {
    setIsCommentsModalOpen(true)
  }

  const closeCommentsModal = () => {
    setIsCommentsModalOpen(false)
  }

  const openDeleteModal = (comment) => {
    setCommentToDelete(comment)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (commentToDelete) {
      dispatch(deleteComment(commentToDelete.id)).then(() => {
        dispatch(getComments(postId))
        closeDeleteModal()
      })
    }
  }

  const handleCommentSubmit = (commentText) => {
    dispatch(postComment({ postId, comment: commentText })).then(() => {
      dispatch(getComments(postId))
      closeCommentsModal()
    })
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
                openCommentsModal()
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
              {sessionUser && sessionUser.id === comment.user_id && (
                <button onClick={() => openDeleteModal(comment)}>
                  Delete comment
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <CommentsModal
        isOpen={isCommentsModalOpen}
        onClose={closeCommentsModal}
        onConfirm={handleCommentSubmit}
      />

      <DeletePostModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        itemToDelete="comment"
      />
    </>
  )
}

export default PostComments
