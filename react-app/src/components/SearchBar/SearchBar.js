import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { searchPosts } from "../../store/posts"
import "./SearchBar.css"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query) {
      dispatch(searchPosts(query, filter))
    }
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-bar-form">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-filter-select"
        >
          <option value="all">All</option>
          <option value="title">Title</option>
          <option value="content">Content</option>
          <option value="tags">Tags</option>
        </select>
        <input
          type="text"
          placeholder="Search Posts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  )
}

export default SearchBar
