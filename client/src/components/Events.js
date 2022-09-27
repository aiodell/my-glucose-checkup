// can only be accessed by the admin
import {useState} from "react"
import { useHistory } from "react-router-dom"
import AddEventForm from "./AddEventForm"

const Events = ({events, setEvents, deleteEvent}) => {
	const[showAddEventForm, setShowAddEventForm] = useState(false)
	const[errors, setErrors] = useState([])
	const history = useHistory()

	const showAddForm = () => { setShowAddEventForm(current => !current)}
	const addNewEvent = (newEvent) => {setEvents(events => [...events, newEvent])}
	
	// delete the events shown on the list
	const handleEventDelete = (id) => {
		fetch(`/events/${id}`, {
			method: "DELETE",
		})
		.then(r => {
			if(r.ok){
				deleteEvent(id)
			} else{
				r.json().then(data => {
					setErrors(data.errors)
				})
			}
		})
	}

	const eventList = events.map((event) => {
		return(
			<div>
				<li key={event.id}>
					{event.category}
					<button onClick={(e) => handleEventDelete(event.id)}>Delete Event</button>												
				</li>		
			</div>
		)
	})

	return(
		<div>
			<h3>Registered Events</h3>
			{eventList}
			<button onClick={showAddForm}>Add Event To List</button>
			{showAddEventForm ? <AddEventForm addNewEvent = {addNewEvent}/> : null}
		</div>
	)
}

export default Events