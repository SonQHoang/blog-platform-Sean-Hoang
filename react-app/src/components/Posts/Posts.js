import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const Posts = () => {
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <>
      <div className="posts-wrapper">
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
          <h1>Featured Post</h1>
        </div>
        <div>
          <h2>Recent Posts</h2>
        </div>
      </div>
    </>
  )
}

export default Posts
