import React from "react"
import { useSelector } from "react-redux"
import Navigation from "../Navigation"
import Posts from "../Posts/Posts"
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage"
import "./TestHomePage.css"

const TestHomePage = () => {
  const { results = [] } = useSelector(
    (state) => state.posts.searchResults || {}
  )
  const hasSearchResults = results.length > 0
  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="main-content">
        {hasSearchResults ? (
          <SearchResultsPage />
        ) : (
          <div className="posts-container">
            <Posts />
          </div>
        )}
      </div>
    </>
  )
}

export default TestHomePage
