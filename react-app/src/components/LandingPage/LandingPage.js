import React from "react"
import Navigation from "../Navigation"
import Posts from "../Posts/Posts"
import "./LandingPage.css"

const MainPage = () => {
  return (
    <>
      <div>
        <Navigation />
      </div>
      <div>
        <Posts />
      </div>
    </>
  )
}

export default MainPage
