import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import Navigation from "../Navigation"
import Posts from "../Posts/Posts"
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage"
import "./LandingPage.css"

const MainPage = () => {
  const { results = [] } = useSelector(
    (state) => state.posts.searchResults || {}
  )
  const hasSearchResults = results.length > 0

  return (
    <>
      <Navigation />
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

export default MainPage
