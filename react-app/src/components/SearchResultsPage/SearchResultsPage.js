import React from "react"
import { useSelector } from "react-redux"

const SearchResultsPage = () => {
  // Ensuring the result of the search is always an array
  const { results = [] } = useSelector(
    (state) => state.posts.searchResults || {}
  )
  const lastSearchQuery = useSelector((state) => state.posts.lastSearchQuery) // Get the last search query

  return (
    <div>
      <h2> Search results: {lastSearchQuery}</h2>
      {results.length > 0 ? (
        results.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}

export default SearchResultsPage
