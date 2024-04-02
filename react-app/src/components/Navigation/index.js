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
      <div className="nav-container">
        <NavLink exact to="/">
          Home (Replace with a Generic Logo)
        </NavLink>
        {sessionUser ? (
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        ) : (
          <>
            <div className="access-container">
              <button onClick={goToLogin}>Log In</button>
              <button onClick={goToSignUp}>Sign Up</button>
            </div>
          </>
        )}
      </div>
    </ul>
  )
}

export default Navigation
