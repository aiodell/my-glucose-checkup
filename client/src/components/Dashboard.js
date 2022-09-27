import { useState, useEffect } from "react"
import {useHistory, Link } from "react-router-dom"

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
					setErrors(data.error)
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

	const renderAverage = average(readings)

	const renderLowest = lowestValue.slice(0,1).map((num) => {
		return(
			<h2 key={num.id}>
				Lowest Reading: {num.value}
			</h2>
		)	
	})

	const renderHighest = highestValue.slice(0,1).map((num)=> {
		return(
			<h2 key={num.id}>
				Highest Reading: {num.value}
			</h2>
		)
	})

	const renderCurrent = highestId.slice(0,1).map((num) => {
		return(
		<div>
			<h1 key={num.id}> {num.value} </h1>
			<Link to= {`/bgls/${num.id}`}> View Details</Link>
		</div>
		)
	})
 
	const toReadings = () => {history.push("/bgls/all")}
	const newReading = () => {history.push("/bgls/new")}
	const toEvents = () => {history.push("/events")}

	return(
		<div>
			<div>
				<h1>Welcome to your dashboard, {currentUser.first_name} </h1>

				{currentUser.admin ? 
					<div>
						<h3>You are in admin mode</h3>
						<div>
							{renderCurrent}
						</div>
						<div>
							{renderLowest}
							{renderHighest}
							<h2>Average Reading: {renderAverage}</h2>
						</div>					
						<button onClick={toEvents}>All Events</button>
						<button onClick={toReadings}>All Test Readings</button>
						<button onClick={newReading}>New Test Reading</button>
					</div> 
				:
				<div>
					<div>
						{renderCurrent}
					</div>
					<div>
						{renderLowest}
						{renderHighest}
					</div>
					<>
						<button onClick={toReadings}>All Readings</button>
						<button onClick={newReading}>New Reading</button>
					</> 
				</div> }
			</div>
		</div>
			
	)
}

export default Dashboard