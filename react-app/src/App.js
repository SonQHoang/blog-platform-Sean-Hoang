import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"
import MainPage from "./components/LandingPage/LandingPage"
import CreatePostForm from "./components/CreatePosts/CreatePostForm"
import SignupFormPage from "./components/SignupFormPage"
import LoginFormPage from "./components/LoginFormPage"
import { authenticate } from "./store/session"

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/posts/new">
            <CreatePostForm />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App
