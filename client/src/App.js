import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import './styles.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState("")
 
  const updateUser = (user) => setCurrentUser(user)
  
  return (
   <div>
    <Switch>
      <Route exact path = "/login">
        <Login updateUser = {updateUser}/>
      </Route>
      <Route exact path = "/signup">
        <Signup />
      </Route>
      <Route exact path = "/dashboard">
        <Dashboard />
      </Route>
      <Route exact path = "/">
        <Home />
      </Route>
    </Switch>
   </div>
  )
}

export default App;
