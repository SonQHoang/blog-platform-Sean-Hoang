import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import "./PostLikes.css"

const PostLikes = ({ postId }) => {
  const sessionUser = useSelector((state) => state.session.user)
  const [isLiked, setIsLiked] = useState(
    JSON.parse(localStorage.getItem(`liked-${postId}`)) || false
  )
  const [likeCount, setLikeCount] = useState(
    parseInt(localStorage.getItem(`likesCount-${postId}`), 10) || 0
  )

  useEffect(() => {
    localStorage.setItem(`liked-${postId}`, JSON.stringify(isLiked))
    localStorage.setItem(`likesCount-${postId}`, likeCount.toString())
  }, [isLiked, likeCount, postId])

  const handleNewLike = () => {
    if (sessionUser) {
      setIsLiked(!isLiked)
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    }
  }

  const likeButton = sessionUser ? (
    isLiked ? (
      <i className="fa-solid fa-thumbs-up fa-lg" onClick={handleNewLike}></i>
    ) : (
      <i className="fa-regular fa-thumbs-up fa-lg" onClick={handleNewLike}></i>
    )
  ) : null

  return (
    <div className="likes-container">
      <div className="post-likes-counter-container">
        <p>Likes: {likeCount} </p>
      </div>
      <div className="post-likes-button-container">{likeButton}</div>
    </div>
  )
}

export default PostLikes
