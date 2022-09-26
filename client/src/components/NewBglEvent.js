import { useState, useEffect } from "react"
import {useHistory, useParams } from "react-router-dom"

const NewBglEvent = () => {
	// const[errors, setErrors] = useState([])
	// const[events, setEvents] = useState("")
	const[bgl, setBgl] = useState("")
	// const[eventId, setEventId] = useState("")
	// const[bglId, setBglId] = useState("")
	const {id} = useParams()
	// const history = useHistory()

	// useEffect(() => {
	// 	fetch(`/bgls/${id}`).then((r) => {
	// 		if(r.ok){
	// 			r.json().then((bgl) =>
	// 			setBgl({data: bgl, error: null, status: "resolved"})
	// 			)
	// 		} else{
	// 			r.json().then((data) => {
	// 				setBgl({data: null, error: data.error, status: "rejected"})
	// 			})
	// 		}
	// 	})
	// }, [id])
	// useState(()=> {
	// 	fetch("/events")
	// 	.then((r)=>r.json())
	// 	.then(setEvents)
	// })

	// const eventList = events.localeCompare((event) => {
	// 	return(
	// 		<option key={event.id}>
	// 			{event.caetgory}
	// 		</option>
	// 	)
	// })

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	const formData = {
	// 		event_id: eventId,
	// 		bgl_id: bglId
	// 	}
	// 	fetch("/bgl_events", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(formData),
	// 	}).then((r) => {
	// 		if(r.ok) {
	// 			history.push(`/bgls/${id}`)
	// 		} else {
	// 			r.json().then((data) => setErrors(data.errors))
	// 		}
	// 	})
	// }
	
	return(
		<h2>Add new event to</h2>
	)
}

export default NewBglEvent