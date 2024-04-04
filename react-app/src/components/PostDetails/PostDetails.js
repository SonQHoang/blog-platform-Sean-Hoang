import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./PostDetails.css"
import { getPostById } from "../../store/posts"
import { useParams } from "react-router-dom"
import PostComments from "../PostComments/PostComments"

const PostDetails = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()

  const post = useSelector((state) => state.posts.singlePost)

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
        <div className="post-comments">
          <PostComments props={postId} />
        </div>
      </section>
    </>
  )
}

export default PostDetails
