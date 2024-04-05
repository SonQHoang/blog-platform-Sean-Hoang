import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPostById } from "../../store/posts"
import { useParams } from "react-router-dom"
import PostComments from "../PostComments/PostComments"
import PostLikes from "../PostLikes/PostLikes"
import "./PostDetails.css"

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
    <div className="post-details-container">
      <section>
        <div>
          <div>
            <h1>{post.title}</h1>
          </div>
          <h2>By: {post.author}</h2>
          <p>{post.content}</p>
          <ul>
            {post.tags && post.tags.map((tag) => <li key={tag.id}>{tag}</li>)}
          </ul>
          <PostLikes />
        </div>
        <div className="post-comments">
          <PostComments props={postId} />
        </div>
      </section>
    </div>
  )
}

export default PostDetails
