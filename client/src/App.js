import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import './styles.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState("")

  useEffect( () => {
    fetch(`/auto-login`)
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user))
      }
    })
  }, [])
 
  const updateUser = (user) => setCurrentUser(user)

  console.log(currentUser)
  
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
      <Route exact path = "/">
        <Home />
      </Route>
    </Switch>
   </div>
  )
}

export default App;
