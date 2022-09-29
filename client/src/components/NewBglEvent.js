import { useState, useEffect } from "react"
import {useHistory, useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';

const NewBglEvent = ({events}) => {
	const[errors, setErrors] = useState([])
	const[bgl, setBgl] = useState("")
	const[eventId, setEventId] = useState("")
	const[bglId, setBglId] = useState("")
	const params = useParams()
	const history = useHistory()

	useEffect(()=> {
		fetch(`/bgls/${params.id}`)
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
				history.push(`/bgls/${params.id}`)
			} else {
				r.json().then((data) => setErrors(data.errors))
			}
		})
	}

	return(
		<Container className="container-style">
		{errors ? errors.map(e => <section>{e}</section>):null}
			<h3 className= "title">Add new event for BGL {bgl.value}<br/>
				{bgl.created_at}
			</h3>
			<Form onSubmit={handleSubmit}>
				<Form.Select size="lg" onChange ={(e) => {
					setEventId(e.target.value)
					setBglId(bgl.id)
					}}>
					<option value="">Choose Event</option>
					{events.map((event) => (
						<option key={event.id} value={event.id}>
							{event.category}
						</option>
					))}
				</Form.Select>
				<Button className="btns" type="submit">Save</Button>
			</Form>
		</Container>
	)
}

export default NewBglEvent