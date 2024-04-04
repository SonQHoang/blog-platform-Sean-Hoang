import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { searchPosts } from "../../store/posts"
import "./SearchBar.css"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(searchPosts(query))
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}

export default SearchBar
