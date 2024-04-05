import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import "./FeaturedPosts.css"

const FeaturedPosts = () => {
  const history = useHistory()

  const [featuredPost, setFeaturedPost] = useState(null)
  const posts = useSelector((state) => state.posts.allPosts)

  useEffect(() => {
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length)
      setFeaturedPost(posts[randomIndex])
    }
  }, [posts])

  if (!featuredPost) return <div>No posts available</div>

  return (
    <div
      onClick={() => {
        history.push(`/posts/${featuredPost.id}`)
      }}
    >
      <div className="featured-article-container">
        <div className="featured-article-header-container">
          <h2 className="featured-article-header">Featured Article</h2>
          <p className="featured-title"> {featuredPost.title}</p>
          <p className="featured-author"> Publish by {featuredPost.author}</p>
          <p className="featured-content">{featuredPost.content}</p>
          {/* <p>Date Created: {featuredPost.dateCreated}</p> */}
        </div>
      </div>
    </div>
  )
}

export default FeaturedPosts
