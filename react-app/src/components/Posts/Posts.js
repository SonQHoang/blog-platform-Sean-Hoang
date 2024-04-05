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
    <>
      <div className="main-posts-container">
        {/* Conditional rendering. Create New Post button only displays if the user is logged in */}
        <div>
          {sessionUser !== null ? (
            <NavLink exact to="/posts/new">
              <button>Create a New Post</button>
            </NavLink>
          ) : (
            ""
          )}
        </div>
        <div className="featured-post">
          <FeaturedPosts />
        </div>
        <div>
          <div className="top-posts-container">
            <h2 className="top-posts-header">Top Posts</h2>
          </div>
          {posts.map((post) => (
            <div
              key={post.id}
              className="single-post-container"
              onClick={() => {
                history.push(`/posts/${post.id}`)
              }}
            >
              <div className="top-post-container">
                <div className="top-post-image">Placeholder</div>
                <div className="top-post-content">
                  <p>{`${post.title}`}</p>
                  <p>{`Published by ${post.author}`}</p>
                  <p>{`${post.content}`}</p>
                  <p>{`Date Created: ${post.date_created}`}</p>
                </div>
              </div>

              <div>
                {sessionUser && sessionUser.id === post.user_id && (
                  <NavLink exact to={`/posts/${post.id}/update`}>
                    <button onClick={(e) => e.stopPropagation()}>
                      Update Post
                    </button>
                  </NavLink>
                )}

                {sessionUser && sessionUser.id === post.user_id && (
                  <button
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
        </div>
      </div>
      <DeletePostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default Posts
