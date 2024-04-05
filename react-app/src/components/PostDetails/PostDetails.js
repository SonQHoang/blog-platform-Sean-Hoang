import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPostById } from "../../store/posts"
import { useParams } from "react-router-dom"
import Navigation from "../Navigation"
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
    <>
      <Navigation />
      <div className="post-details-container">
        <section>
          <div className="post-details-content">
            <div>
              <h1>{post.title}</h1>
            </div>
            <p>{`Published by ${post.author} on ${new Date(
              post.date_created
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}`}</p>
            <p className="post-details-content-content">{post.content}</p>
            <ul className="tag-container">
              {post.tags &&
                post.tags.map((tag) => (
                  <li className="tag-item" key={tag.id}>
                    {tag}
                  </li>
                ))}
            </ul>
            <PostLikes />
          </div>
          <div className="post-comments">
            <PostComments />
          </div>
        </section>
      </div>
    </>
  )
}

export default PostDetails
