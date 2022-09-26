import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

const EditEvent = () => {
	const[events, setEvents] = useState([])
	const[errors, setErrors] = useState([])
	const[eventId, setEventId] = useState("")
	const history = useHistory()
	const { id } = useParams()

	// get the currently selected event
	useEffect(()=> {
		fetch(`/events`)
		.then(r => {
      if(r.ok){
        r.json().then(event => {
					setEvents(event)
				})				
      }else {
        r.json().then(data => { 
					setErrors(data.error)
					history.push('/dashboard')
				})
      }
    })
	}, [])

	console.log(events)

	// // submit the changed event category
	// const handleSubmit = (e) => {
	// 	e.preventDefault()
	// 	fetch(`/bgl_events/${id}`, {
	// 		method: "PATCH",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			eventId,
	// 		}),
	// 	}).then((r) => {
	// 		if(r.ok){
	// 			history.goBack()
	// 		}else {
	// 			r.json().then((data => {
	// 				setErrors(data.error)
	// 			}))
	// 		}
	// 	})
	// }

	return(
		<div>
			<form>
				<label>Change category</label>
				{/* <select name = "category"  onChange= {(e) => setEvents(e.target.value)}>
					<option selected disabled>{}</option>
					{categoryList}
				</select> */}
				<button type="submit">Save</button>
			</form>
		</div>
	)
}

export default EditEvent