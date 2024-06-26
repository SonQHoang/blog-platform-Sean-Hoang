import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"
// import Navigation from "./components/Navigation"
// import MainPage from "./components/LandingPage/LandingPage"
import CreatePostForm from "./components/CreatePosts/CreatePostForm"
import PostDetails from "./components/PostDetails/PostDetails"
import UpdatePostForm from "./components/UpdatePosts/UpdatePostForm"
import SignupFormPage from "./components/SignupFormPage"
import SearchResultsPage from "./components/SearchResultsPage/SearchResultsPage"
import LoginFormPage from "./components/LoginFormPage"
import { authenticate } from "./store/session"
import TestHomePage from "./components/TestHomePage/TestHomePage"
import "@fortawesome/fontawesome-free/css/all.min.css"

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/posts/new">
            <CreatePostForm />
          </Route>
          <Route exact path="/posts/:postId/update" component={UpdatePostForm}>
            <UpdatePostForm />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/results">
            <SearchResultsPage />
          </Route>
          {/* <Route exact path="/">
            <MainPage />
          </Route> */}
          <Route exact path="/posts/:postId" component={PostDetails}></Route>
          <Route exact path="/">
            <TestHomePage />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App
