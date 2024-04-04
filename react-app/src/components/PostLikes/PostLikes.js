import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./PostLikes.css"

const PostLikes = ({ postId }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

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
    <div>
      <div className="post-likes-counter-container">
        <p>Likes: {likeCount} </p>
      </div>
      <div className="post-likes-button-container">{likeButton}</div>
    </div>
  )
}

export default PostLikes
