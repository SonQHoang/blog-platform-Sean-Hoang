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
        />
        <label>
          Tags:
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onBlur={handleAddTag}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />
        </label>
      </label>
      <div className="tags-preview">
        {tags.map((tag) => (
          <div key={tag} className="tag">
            {tag}
            <button type="button" onClick={() => handleRemoveTag(tag)}>
              x
            </button>
          </div>
        ))}
      </div>
      <button type="submit">Create Post</button>
    </form>
  )
}

export default CreatePostForm
