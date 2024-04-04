import React from "react"
import Navigation from "../Navigation"
import Posts from "../Posts/Posts"
import SearchBar from "../SearchBar/SearchBar"
import "./LandingPage.css"

const MainPage = () => {
  return (
    <>
      <div>
        <Navigation />
      </div>
      <SearchBar />
      <div>
        <Posts />
      </div>
    </>
  )
}

export default MainPage
