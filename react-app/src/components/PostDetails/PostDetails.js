import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./PostDetails.css"
import { getPostById } from "../../store/posts"
import { useParams } from "react-router-dom"

const PostDetails = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()

  const post = useSelector((state) => state.posts.singlePost)
  console.log("what is my post===>", post)

  useEffect(() => {
    dispatch(getPostById(postId))
  }, [dispatch, postId])

  if (!post) {
    return <div>Post not Found</div>
  }

  return (
    <>
      <section className="post-details-container">
        <div className="post-details-container">
          <div>
            <h1>{post.title}</h1>
          </div>
          <div>By: {post.author}</div>
          <div>{post.content}</div>
        </div>
      </section>
    </>
  )
}

export default PostDetails
