import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllPosts } from "../../store/posts"

const Posts = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const posts = Object.values(useSelector((state) => state.posts.allPosts))
  console.log(
    "What is the information coming to my component from reducer====>",
    posts
  )

  useEffect(() => {
    dispatch(getAllPosts())
    // console.log("Sending a response out to getAllPosts")
  }, [dispatch])

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

          {/* Implement logic here to randomly select a post and have it featured... will need to figure
            out how to switch with time...
          */}
        </div>
        <div>
          <h2>Recent Posts</h2>
          {posts.map((post) => (
            <div key={post.id}>
              <p>{`Title: ${post.title}`}</p>
              <p>{`Author: ${post.author}`}</p>
              <p>{`Content: ${post.content}`}</p>
              <p>{`Date Created: ${post.date_created}`}</p>
              {sessionUser && sessionUser.id === post.user_id && (
                <NavLink exact to="/posts/update">
                  <button>Update Post</button>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Posts
