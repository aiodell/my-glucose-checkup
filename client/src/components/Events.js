// can only be accessed by the admin
import {useState} from "react"
import AddEventForm from "./AddEventForm"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Events = ({events, setEvents, deleteEvent}) => {
	const[showAddEventForm, setShowAddEventForm] = useState(false)
	const[errors, setErrors] = useState([])

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
			<Card style={{width: '18rem'}}>
				<ListGroup variant="flush">
					<ListGroup.Item className="list" key={event.id}>
						{event.category}												
					</ListGroup.Item>
				</ListGroup>
				<Button className= "delete-btn" onClick={(e) => handleEventDelete(event.id)}>
					Delete Event
				</Button>	
			</Card>
		)
	})

	return(
		<Container className="container-style">
		{errors ? errors.map(e => <section>{e}</section>):null}
			<h3 className="title">Registered Events</h3>
			<div className="event-card">
				{eventList}
			</div>
			<Button className="btns" onClick={showAddForm}>Add Event To List</Button>
			<div>
				{showAddEventForm ? <AddEventForm addNewEvent = {addNewEvent}/> : null}
			</div>
		</Container>
	)
}

export default Events