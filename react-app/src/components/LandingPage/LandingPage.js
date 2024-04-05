import React from "react"
import { useSelector } from "react-redux"
import Navigation from "../Navigation"
import Posts from "../Posts/Posts"
import SearchBar from "../SearchBar/SearchBar"
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage"
import "./LandingPage.css"

const MainPage = () => {
  const { results = [] } = useSelector(
    (state) => state.posts.searchResults || {}
  )

  const hasSearchResults = results.length > 0

  return (
    <>
      <div>{<Navigation />}</div>
      <div>
        <SearchBar />
      </div>
      {hasSearchResults ? (
        <SearchResultsPage />
      ) : (
        <div>
          <Posts />
        </div>
      )}
    </>
  )
}

export default MainPage
