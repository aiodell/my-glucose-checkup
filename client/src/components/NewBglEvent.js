import { useState, useEffect } from "react"
import {useHistory, useParams } from "react-router-dom"

const NewBglEvent = ({events}) => {
	const[errors, setErrors] = useState([])
	const[bgl, setBgl] = useState("")
	const[eventId, setEventId] = useState("")
	const[bglId, setBglId] = useState("")
	const {id} = useParams()
	const history = useHistory()

	useEffect(()=> {
		fetch(`/bgls/${id}`)
		.then((r)=>r.json())
		.then(setBgl)
	}, [])
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			event_id: eventId,
			bgl_id: bglId
		}
		fetch("/bgl_events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		}).then((r) => {
			if(r.ok) {
				history.push(`/bgls/${id}`)
			} else {
				r.json().then((data) => setErrors(data.errors))
			}
		})
	}

	return(
		<div>
			<h3>Add new event for BGL {bgl.value}<br/>
				added: {bgl.created_at}
			</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="event_id">New Event</label>
				<select onChange ={(e) => {
					setEventId(e.target.value)
					setBglId(bgl.id)
					}}>
					<option value="">Choose Event</option>
					{events.map((event) => (
						<option key={event.id} value={event.id}>
							{event.category}
						</option>
					))}
				</select>
				<button type="submit">Save</button>
			</form>
		</div>
	)
}

export default NewBglEvent