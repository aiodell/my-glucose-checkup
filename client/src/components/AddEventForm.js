import {useState} from "react"

const AddEventForm = ({addNewEvent}) => {
	const[newEventData, setNewEventData] = useState({category: ""})
	const {category} = newEventData

	const handleChange = (e) => {setNewEventData({...newEventData, [e.target.name]: e.target.value})}

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
			}e.target.reset()
		}) 
	}	

	return(
		<form onSubmit={handleAddEvent}>
			<label htmlFor="category">New Event Name</label>
			<input type="text" name="category" onChange={handleChange}/>
			<button type="submit">Add Event</button>
		</form>

	)
}

export default AddEventForm