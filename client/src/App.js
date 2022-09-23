import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import AllReadings from "./components/AllReadings"
import NewReading from "./components/NewReading"
import logo from './logo.svg';
import './styles.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState("")
  const [readings, setReadings] = useState([])
  const history = useHistory()
  
  useEffect( () => {
    fetch(`/auto-login`)
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user))
        history.push("/dashboard")
      }
    })
  }, [])

  
	const handleLogout = (e) => {
		fetch(`/logout`, {
			method: 'DELETE'
		})
			.then(() => {
				updateUser("")
				history.push('/login')
			})
	}

const addNewReading = (newReading) => {
		setReadings(readings => [...readings, newReading])
	}
 
  const updateUser = (user) => setCurrentUser(user)

  const signupPage = () => {history.push(`/signup`)}
  const loginPage = () => {history.push(`/login`)}
  
  return (
   <div>
    <NavBar 
      currentUser = {currentUser}
      updateUser = {updateUser}
    />
    <Switch>
      <Route exact path = "/login">
        <Login updateUser = {updateUser}/>
      </Route>
      <Route exact path = "/signup">
        <Signup />
      </Route>
      <Route exact path = "/dashboard">
        <Dashboard currentUser = {currentUser}/>
      </Route>
      <Route exact path= "/bgls/all">
        <AllReadings
        currentUser = {currentUser}
        readings = {readings}
        setReadings = {setReadings}/>
      </Route>
      <Route exact path= "/bgls/new">
        <NewReading
          currentUser = {currentUser}
          addNewReading = {addNewReading}
        />
      </Route>
    </Switch>
   </div>
  )
}

export default App;
