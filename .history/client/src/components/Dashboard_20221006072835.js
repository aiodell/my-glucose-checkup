import { useState, useEffect } from "react"
import {useHistory, Link, NavLink } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Dashboard = ({currentUser}) => {
	const[readings, setReadings] = useState([])
	const[errors, setErrors] = useState([])
	const history= useHistory()

	// get the bgls for the user
	useEffect(() => {
		fetch("/bgls")
		.then(r => {
			if(r.ok){
				r.json().then(data => setReadings(data))
			}else{
				r.json().then(data => {
					setErrors(data.errors)
					history.push("/login")
				})
			}
		})
	}, [ ])

	// sort the highest, lowest, and most current value
	const lowestValue = [...readings].sort((a,b) => a.value - b.value)
	const highestValue = [...readings].sort((a,b) => b.value - a.value)
	const highestId =[...readings].sort((a,b) => b.id - a.id)

	const average = (arr) => {
		const { length } = arr
		return arr.reduce((acc, val) => {
			return acc + (val.value/length)
		}, 0)
	}

	const renderAverage = parseInt(average(readings))

	const renderLowest = lowestValue.slice(0,1).map((num) => {
		return(
			<Card as={Link} to={`/bgls/${num.id}`} className="link-text-style">
				<Card.Body as="h1" key={num.id}> Lowest: {num.value}</Card.Body>
			</Card>
		)	
	})

	const renderHighest = highestValue.slice(0,1).map((num)=> {
		return(
			<Card as={Link} to={`/bgls/${num.id}`} className="link-text-style">
				<Card.Body as="h1" key={num.id}> Highest: {num.value}</Card.Body>
			</Card>
		)
	})

	const renderCurrent = highestId.slice(0,1).map((num) => {
		return(
		<>
			<Card as={Link} to={`/bgls/${num.id}`} className="link-text-style">
				<Card.Body as="h1" key={num.id}> {num.value} </Card.Body>
			</Card>
		</>
		)
	})
	
	// will return a dashboard alongside any highs and lows of followed users
	return(
		<Container className="container-style">
			{currentUser.first_name ? <h1 className="dash-title">
					Welcome to your dashboard, {currentUser.first_name}! </h1> 
					: <h1>Welcome to your dashboard!</h1> 
			}
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Card className="dash-container">
				<h1>Your Current Blood Glucose Level</h1>
				{currentUser.admin ? 
				<>
					<Row>
						<p>You are in admin mode</p>
							{renderCurrent}
					</Row> 
					<Row className="low-high-avg">
						<Col>{renderLowest}</Col>
						<Col>
							<Card className="average-bgls">
								<Card.Body>
									{renderAverage = 0 ? 
										<h1> You do not have any readings!</h1> :
										<h1> Average: {renderAverage}</h1>
									}									
								</Card.Body>					
							</Card>

						</Col>
						<Col>{renderHighest}</Col>
					</Row>
					<div>
						<NavLink to="/events">
							<Button className="btns" >All Events</Button>
						</NavLink>
						<NavLink to="/bgls/all">
							<Button className="btns">All Test Readings</Button>
						</NavLink>
						<NavLink to="/bgls/new">
							<Button className="btns">New Test Reading</Button>
						</NavLink>						
					</div>
					<div>
						{/* Add updates from followed users here */}
					</div>					
				</> :
				<>
					<Row>
						{renderCurrent}
					</Row> 
						<Row className="low-high-avg">
							<Col>{renderLowest}</Col>
							<Col>
								<Card className="average-bgls">
									{renderAverage === 0 ? 
										<h3> You do not have any readings!</h3> :
										<Card.Body as="h1"> Average: {renderAverage}</Card.Body>
									}							
								</Card>
							</Col>
							<Col>{renderHighest}</Col>
						</Row>
						<div>
							<NavLink to="/bgls/all">
								<Button className="btns">All Readings</Button>
							</NavLink>
							<NavLink to="/bgls/new">
								<Button className="btns">New Reading</Button>
							</NavLink>								
						</div>					
				</> }
			</Card>
		</Container>
	)
}

export default Dashboard