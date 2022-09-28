import { useState, useEffect } from "react"
import {useHistory, Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Dashboard = ({readings, setReadings, currentUser}) => {
	const[errors, setErrors] = useState([])
	const history= useHistory()

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
	}, [])

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
			<h2 key={num.id}>
				Lowest: {num.value}
			</h2>
		)	
	})

	const renderHighest = highestValue.slice(0,1).map((num)=> {
		return(
				<h2 key={num.id}>
					Highest: {num.value}
				</h2>
		)
	})

	const renderCurrent = highestId.slice(0,1).map((num) => {
		return(
		<>
			<div className="current-bgl">
				<h1 className="current-txt" key={num.id}> {num.value} </h1>
			</div>
			<Link to= {`/bgls/${num.id}`} className="small-link"> View Details</Link>
		</>
		)
	})
 
	return(
		<Container className="container-style">	
			{errors ? errors.map(e => <section>{e}</section>):null}
			<Container className="dash-container">
				<h1 className="dash-title">
					Welcome to your dashboard, {currentUser.first_name} 
				</h1>	
				{currentUser.admin ? 
				<>
					<Row>
						<p>You are in admin mode</p>
							{renderCurrent}
					</Row> 
						<Row className="low-high-avg">
							<Col>{renderLowest}</Col>
							<Col>
								<h2>Average: {renderAverage}</h2>
							</Col>
							<Col>{renderHighest}</Col>
						</Row>
						<div>
							<Button className="btns" href="/events">All Events</Button>
							<Button className="btns" href="/bgls/all">All Test Readings</Button>
							<Button className="btns" href="bgls/new">New Test Reading</Button>						
						</div>					
				</> :
				<>
					<Row>
						{renderCurrent}
					</Row> 
						<Row className="low-high-avg">
							<Col>{renderLowest}</Col>
							<Col>
								<h2>Average: {renderAverage}</h2>
							</Col>
							<Col>{renderHighest}</Col>
						</Row>
						<div>
							<Button className="btns" href="/bgls/all">All Readings</Button>
							<Button className="btns" href="bgls/new">New Reading</Button>						
						</div>					
				</> }
			</Container>
		</Container>
			
	)
}

export default Dashboard