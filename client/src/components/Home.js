import {useHistory} from "react-router-dom"
import {useEffect, useState} from "react"
import logo from '../logo.svg';
import '../styles.css';
// main display when a user enters the page
const Home = ({currentUser, setCurrentUser}) => {
  const history = useHistory()

  const signupPage = () => {history.push(`/signup`)}
  const loginPage = () => {history.push(`/login`)}

  useEffect( () => {
    fetch(`/auto-login`)
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user))
        history.push("/dashboard")
      }
    })
  }, [])

	return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          Welcome to My Glucose Check-Up
          <div>
            <button onClick= {signupPage}>Signup</button>
            <button onClick= {loginPage}>Login</button>
          </div>
      </header>
    </div>
  )
}

export default Home