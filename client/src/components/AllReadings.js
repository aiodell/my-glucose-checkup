import { useState, useEffect } from "react"
import { useHistory, Link, NavLink } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const AllReadings = ({readings, setReadings }) => {
	const [errors, setErrors] = useState([])
	const history = useHistory()

	useEffect(() => {
		fetch("/bgls")
		.then(r => {
			if(r.ok){
				r.json().then(readings => setReadings(readings))
			}else{
				r.json().then(data => {
					setErrors(data.errors)
					history.push("/login")
				})
			}
		})
	}, [])

	const handleDelete = (id) => {
		fetch(`/bgls/${id}`, {
			method: "DELETE",
		})
		.then(() =>{
			setReadings((readings) => readings.filter((reading) => reading.id !== id))
		})
	}
	
	const renderReadings = readings.map((bgl) => {
		return(
			<Card className="bgl-card" key= {bgl.id}>
				<Card.Body as={Link} to= {`/bgls/${bgl.id}`}>
					<Card.Title className="card-title">
						{bgl.value} mg/dl
					</Card.Title>
					<Card.Text>
						{bgl.created_at} 
					</Card.Text>
				</Card.Body>
				<Button className="delete-btn" onClick={() => handleDelete(bgl.id)}>
					Delete
				</Button>				
			</Card>
		)
	})

	return(
		<Container >
		{errors ? errors.map(e => <section>{e}</section>):null}		
			<Container className="all-bgl-container-style">
				<h3 className="title">All Readings</h3>
				<NavLink to="/bgls/new">
					<Button className="btns">Add New</Button>				
				</NavLink>
				<NavLink to="/dashboard">
					<Button className="btns">Dashboard</Button>				
				</NavLink>
				<Container className="container-style">
					{renderReadings}
				</Container>
			</Container>
		</Container>
	)
}

export default AllReadings