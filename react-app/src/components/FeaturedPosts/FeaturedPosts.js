import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const FeaturedPosts = () => {
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
    <div>
      <div>
        <h2>Featured Post</h2>
      </div>
      <p>Title: {featuredPost.title}</p>
      <p>Author: {featuredPost.author}</p>
      <p>Content: {featuredPost.content}</p>
      <p>Date Created: {featuredPost.dateCreated}</p>
    </div>
  )
}

export default FeaturedPosts
