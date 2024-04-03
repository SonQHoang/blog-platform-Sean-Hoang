import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createPost } from "../../store/posts"
import "./CreatePostForm.css"

const CreatePostForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const reset = () => {
    setTitle("")
    setContent("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPost = {
      title: title,
      content: content,
    }
    dispatch(createPost(newPost))
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
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Create Post</button>
    </form>
  )
}

export default CreatePostForm
