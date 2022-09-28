import { useState, useEffect } from "react"
import { useParams, useHistory, NavLink } from "react-router-dom"
import BglUpdateForm from "./BglUpdateForm"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Card from 'react-bootstrap/Card';

const BglEventDetails = ({deleteReading, updateBgl, readings}) => {
	const[showForm, setShowForm] = useState(false)
	const history = useHistory()
	const params = useParams()
	console.log(readings)
	const reading = readings?.find(bgl => bgl.id == params.id)

	const showUpdateForm = () => { setShowForm(current => !current)}

	const handleDelete = () => {
		fetch(`/bgls/${params.id}`, {
			method: "DELETE",
		})
		.then(() =>{
			deleteReading(params.id)
			history.push('/dashboard')
		})
	}

	return(
		<Container className= "container-style">
		<h3 className="title">Blood Glucose Level Details:</h3>
			<Card>
				<Card.Body>
					<Card.Title>
						<h1>{reading?.value}</h1>
					</Card.Title>
					<Card.Subtitle>
						<h3 className="title">{reading?.created_at}</h3>
					</Card.Subtitle>
					<div>
						<h4>Events</h4>	
						{reading?.events?.map((event) => (
							<div key= {event.id}>
								{event.category}
							</div>
						))}
					</div>				
					<div>
						<NavLink to={`/bgls/${params.id}/bgl_events/new`}>
							add new event
						</NavLink>
					</div>
				</Card.Body>
				<Button className="btns" onClick = {handleDelete}>Delete</Button>
				<Button className="btns" onClick= {showUpdateForm}>Edit Value</Button>
			</Card>
			<div>
				{showForm ? 
					<BglUpdateForm updateBgl = {updateBgl}/> 
				: null}
			</div>
		</Container>
	)
}

export default BglEventDetails