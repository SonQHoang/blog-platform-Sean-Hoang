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
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {sessionUser ? (
        <li>
          <button onClick={handleLogout}>Log Out</button>
        </li>
      ) : (
        <>
          <li>
            <button onClick={goToLogin}>Log In</button>
          </li>
          <li>
            <button onClick={goToSignUp}>Sign Up</button>
          </li>
        </>
      )}
    </ul>
  )
}

export default Navigation
