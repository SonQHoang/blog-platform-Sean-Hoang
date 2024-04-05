import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createPost } from "../../store/posts"
import "./CreatePostForm.css"

const CreatePostForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = () => {
    let newTag = tagInput.trim()
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
    }
    setTagInput("")
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPost = {
      title: title,
      content: content,
      tags,
    }

    dispatch(createPost(newPost))
    history.push("/")
  }

  return (
    <div className="create-post-form-container">
      <form
        className="update-create-form-content-container"
        onSubmit={handleSubmit}
      >
        <h2>Create Your Post</h2>
        <label className="create-post-title-label">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </label>
        <label className="create-post-content-label">
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <label className="create-post-tag-label">
            Tags:
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              className="tag-input"
            />
          </label>
          <button
            className="add-tag-button"
            type="button"
            onClick={handleAddTag}
          >
            Add Tag
          </button>{" "}
        </label>
        <div className="tags-container">
          {tags.map((tag) => (
            <div key={tag} className="tag-item">
              {tag}
              <button
                type="button"
                className="remove-tag-button"
                onClick={() => handleRemoveTag(tag)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button className="create-post-form-button" type="submit">
          Create Post
        </button>
      </form>
    </div>
  )
}

export default CreatePostForm
