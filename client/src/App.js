import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import AllReadings from "./components/AllReadings"
import NewReading from "./components/NewReading"
import Home from "./components/Home"
import BglEventDetails from "./components/BglEventDetails"
import NewBglEvent from "./components/NewBglEvent"
import Events from "./components/Events"

import './styles.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState("")
  const [readings, setReadings] = useState([])
  const [events, setEvents] = useState([])
  const history = useHistory()
  // push user to dashboard if already logged in
  useEffect( () => {
    fetch(`/auto-login`)
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user))
        history.push("/dashboard")
      }
    })
  }, [])

	useEffect(() => {
		fetch("/events")
		.then((r) => r.json())
		.then(setEvents)
	}, []) 

  const addNewReading = (newReading) => {setReadings(readings => [...readings, newReading])}
  const updateUser = (user) => setCurrentUser(user)
  
  const deleteReading = (deletedReading) => {
    setReadings((readings) => readings.filter((reading) => reading.id !== deletedReading))
  }
  
  const deleteEvent = (deletedEvent) => {
    setEvents((events) => events.filter((event) => event.id !== deletedEvent))
  }

  const updateBgl = (updatedBgl) => {
    const newBgl = readings.map(bgl => bgl.id === updatedBgl.id ? updatedBgl : bgl)
    setReadings(newBgl)
  }

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
        <Dashboard 
        currentUser = {currentUser}
        readings = {readings}
        setReadings = {setReadings}
        />
      </Route>
      <Route exact path= "/bgls/all">
        <AllReadings
        readings = {readings}
        setReadings = {setReadings}
        />
      </Route>
      <Route exact path= "/bgls/new">
        <NewReading addNewReading= {addNewReading} />
      </Route>
      <Route exact path= "/bgls/:id">
        <BglEventDetails deleteReading= {deleteReading}/>
      </Route>
      <Route exact path="/bgls/:id/bgl_events/new">
        <NewBglEvent events= {events}/>
      </Route>
      <Route exact path= "/bgl/:id/update">

      </Route>
      <Route exact path="/events">
        <Events 
          events = {events}
          setEvents = {setEvents}
          deleteEvent = {deleteEvent}
        />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
   </div>
  )
}

export default App;
