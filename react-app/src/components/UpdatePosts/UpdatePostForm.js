import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { updatePost } from "../../store/posts"
import "./UpdatePostForm.css"

const UpdatePostForm = () => {
  const { postId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const currentPost = useSelector((state) =>
    state.posts.allPosts.find((post) => post.id === Number(postId))
  )
  console.log("What does the currentpost look like===>", currentPost)

  // For making sure data is up to date [ Need to build this out later]
  //   useEffect(() => {
  //     if (!currentPost) {
  //       dispatch(getPostById(postId))
  //     }
  //   }, [dispatch, postId, currentPost])

  const [title, setTitle] = useState(currentPost?.title || "")
  const [content, setContent] = useState(currentPost?.content || "")

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedPost = {
      ...currentPost,
      title,
      content,
    }

    dispatch(updatePost(postId, updatedPost))
    history.push("/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </label>
      <label>
        Content:
        <textarea
          value={content}
          type="text"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Update Post</button>
    </form>
  )
}

export default UpdatePostForm
