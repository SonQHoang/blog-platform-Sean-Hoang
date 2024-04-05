import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import DeletePostModal from "../DeleteModal/DeletePostModal"
import FeaturedPosts from "../FeaturedPosts/FeaturedPosts"
import { deletePost } from "../../store/posts"
import { getAllPosts } from "../../store/posts"
import "./Posts.css"

const Posts = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user)
  const posts = Object.values(useSelector((state) => state.posts.allPosts))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  const openModal = (post) => {
    setPostToDelete(post)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete.id)).then(() => dispatch(getAllPosts()))
      history.push("/")
    }
    closeModal()
  }

  return (
    <div className="main-posts-container">
      {/* <div className="featured-post">
        <FeaturedPosts />
      </div> */}
      <div className="top-posts-container">
        {posts.map((post) => (
          <div key={post.id} className="single-post-container">
            <div className="top-post-container">
              <div className="top-post-content">
                <p className="top-post-content-title">{`${post.title}`}</p>
                <p className="top-post-content-author">{`Published by ${
                  post.author
                } on ${new Date(post.date_created).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`}</p>
                <div className="top-post-content-content">
                  <p>{`${post.content}`}</p>
                  <button
                    onClick={() => {
                      history.push(`/posts/${post.id}`)
                    }}
                    className="keep-reading-button"
                  >
                    Keep Reading
                  </button>
                </div>
              </div>
            </div>

            <div className="post-update-delete-buttons">
              {sessionUser && sessionUser.id === post.user_id && (
                <NavLink exact to={`/posts/${post.id}/update`}>
                  <button
                    className="update-post-button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Update Post
                  </button>
                </NavLink>
              )}

              {sessionUser && sessionUser.id === post.user_id && (
                <button
                  className="delete-post-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    openModal(post)
                  }}
                >
                  Delete Post
                </button>
              )}
            </div>
          </div>
        ))}
        <DeletePostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  )
}

export default Posts
