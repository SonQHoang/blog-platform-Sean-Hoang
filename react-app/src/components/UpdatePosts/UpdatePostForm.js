import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { updatePost, getPostById, getAllPosts } from "../../store/posts"
import "./UpdatePostForm.css"

const UpdatePostForm = () => {
  const { postId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const currentPost = useSelector((state) => state.posts.singlePost)

  useEffect(() => {
    dispatch(getPostById(postId))
  }, [dispatch, postId])

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title)
      setContent(currentPost.content)
      setTags(currentPost.tags || [])
    }
  }, [currentPost])

  const [title, setTitle] = useState(currentPost?.title || "")
  const [content, setContent] = useState(currentPost?.content || "")
  const [tags, setTags] = useState(currentPost?.tags || [])
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = () => {
    const newTag = tagInput.trim()
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
    const updatedPost = {
      ...currentPost,
      title,
      content,
      tags,
    }

    dispatch(updatePost(postId, updatedPost))
    dispatch(getAllPosts())
    history.push("/")
  }

  return (
    <form className="update-post-form-container" onSubmit={handleSubmit}>
      <div className="update-post-form-content-container">
        <h2>Update Your Post</h2>
        <div className="post-title-container">
          <label className="post-title-label">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </label>
        </div>
        <label className="post-content-label">
          Content:
          <textarea
            value={content}
            type="text"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </label>
        <label className="post-tag-label">
          Tags:
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            className="tag-input"
          />
          <button
            className="add-tag-button "
            type="button"
            onClick={handleAddTag}
          >
            Add Tag
          </button>
        </label>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag-item">
              {tag}
              <button
                type="button"
                className="remove-tag-button clickable-hover-effect-content "
                onClick={() => handleRemoveTag(tag)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          className="update-post-form-button clickable-hover-effect-content "
          type="submit"
        >
          Update Post
        </button>
      </div>
    </form>
  )
}

export default UpdatePostForm
