import React from "react"
import { useSelector } from "react-redux"

const SearchResultsPage = () => {
  const searchResults = useSelector((state) => state.posts.searchResults)

  return (
    <div>
      <h2> Search Results</h2>
    </div>
  )
}

export default SearchResultsPage
