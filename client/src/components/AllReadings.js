import { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
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
					setErrors(data.error)
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
			<>
				<Card className="bgl-card" key= {bgl.id} as={Link} to= {`/bgls/${bgl.id}`}>
					<Card.Body>
						<Card.Title className="card-title">
							{bgl.value} mg/dl
						</Card.Title>
						<Card.Text>
							{bgl.created_at} 
						</Card.Text>
					</Card.Body>				
				</Card>
				<Button className="delete-btn" onClick={() => handleDelete(bgl.id)}>
					Delete
				</Button>
			</>
		)
	})

	return(
		<Container >	
			<Container className="all-bgl-container-style">
				<h3 className="title">All Readings</h3>
				<Button href="/bgls/new" className="btns">Add New</Button>
				<Button href="/dashboard" className="btns">Dashboard</Button>
				<Container className="container-style">
					{renderReadings}
				</Container>
			</Container>
		</Container>
	)
}

export default AllReadings