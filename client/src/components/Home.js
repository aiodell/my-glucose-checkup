import {useHistory} from "react-router-dom"
import logo from '../logo.svg';
import '../styles.css';
// main display when a user enters the page
const Home = () => {
  const history = useHistory()

  const signupPage = () => {history.push(`/signup`)}
  const loginPage = () => {history.push(`/login`)}

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