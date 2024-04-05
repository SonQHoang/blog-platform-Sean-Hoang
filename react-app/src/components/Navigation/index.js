import React from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../store/session"
import "./Navigation.css"

function Navigation() {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  const goToLogin = () => {
    history.push("/login")
  }

  const goToSignUp = () => {
    history.push("/signup")
  }

  return (
    <div className="nav-container">
      <NavLink exact to="/" className="blog-element clickable-hover-effect">
        Blog
      </NavLink>
      {sessionUser ? (
        <span
          className="log-out-button clickable-hover-effect"
          onClick={handleLogout}
        >
          Log Out
        </span>
      ) : (
        <>
          <div className="access-container">
            <span
              className="login-button clickable-hover-effect"
              onClick={goToLogin}
            >
              Log In
            </span>
            <button
              className="sign-up-button clickable-hover-effect"
              onClick={goToSignUp}
            >
              Sign Up
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Navigation
