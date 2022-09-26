import { useState, useEffect } from "react"
import {useHistory, useParams, Link } from "react-router-dom"

const Dashboard = ({readings, setReadings, currentUser}) => {
	const[errors, setErrors] = useState([])
	const params = useParams()
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

	return(
		<div>
			<div>
				<h1>Welcome to your dashboard, {currentUser.first_name} </h1>
			<div>
				{renderCurrent}
			</div>
			</div>
			{renderLowest}
			{renderHighest}
			<div>
				<button onClick={toReadings}>All Readings</button>
				<button onClick={newReading}>New Reading</button>
			</div>
			
		</div>
			
	)
}

export default Dashboard