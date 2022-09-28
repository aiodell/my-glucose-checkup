import {useState} from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';

const AddEventForm = ({addNewEvent}) => {
	const[errors, setErrors] = useState([])
	const[category, setCategory] = useState()

	const handleAddEvent = (e) => {
		e.preventDefault()
		const newEventData = {category: category}

		fetch("/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newEventData)
		})
		.then(r => {
			if(r.ok){
				r.json().then(newEvent => {
					addNewEvent(newEvent)
				})
			}else{
				r.json().then(data => {
					setErrors(data.error)
				})
			}e.target.reset()
		}) 
	}	

	return(
		<Container className="container-style">
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Form onSubmit={handleAddEvent}>
				<Form.Group className="mb-3">
					<Form.Label>New Event Name</Form.Label>
					<Form.Control type="text" name="category" onChange={(e) => setCategory(e.target.value)}/>
				</Form.Group>
				<Button className="delete-btn"type="submit">Add Event</Button>
			</Form>		
		</Container>
	)
}

export default AddEventForm