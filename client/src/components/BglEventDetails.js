import { useState, useEffect } from "react"
import { useParams, useHistory, NavLink } from "react-router-dom"
import BglUpdateForm from "./BglUpdateForm"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Card from 'react-bootstrap/Card';

const BglEventDetails = ({deleteReading, updateBgl}) => {
	const[showForm, setShowForm] = useState(false)
	const history = useHistory()
	const [{data: bgl, error, status}, setBgl] = useState({
		data: null,
		error: null,
		status: "pending"
	})
	const params = useParams()

	useEffect(() => {
		fetch(`/bgls/${params.id}`).then((r) => {
			if(r.ok){
				r.json().then((bgl) =>
				setBgl({data: bgl, error: null, status: "resolved"})
				)
			} else{
				r.json().then((data) => {
					setBgl({data: null, error: data.error, status: "rejected"})
				})
			}
		})
	}, [])

	if(status === "pending") return <h1>Gathering your data...</h1>
	if(status === "rejected") return <h1>Error: {error.error}</h1>

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
						<h1>{bgl.value}</h1>
					</Card.Title>
					<Card.Subtitle>
						<h3 className="title">{bgl.created_at}</h3>
					</Card.Subtitle>
					<div>
						<h4>Events</h4>	
						{bgl.events.map((event) => (
							<div key= {event.id}>
								<p>{event.category} <br/>
								</p>
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
					<BglUpdateForm 
						bgl= {bgl} 
						setBgl= {setBgl} 
						updateBgl = {updateBgl}
					/> 
				: null}
			</div>
		</Container>
	)
}

export default BglEventDetails