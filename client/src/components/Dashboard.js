import { useState, useEffect } from "react"
import {Link, useHistory, useParams } from "react-router-dom"

const Dashboard = ({currentUser}) => {
	const [currentReading, setCurrentReading] = useState({})
	const [lowestReading, setLowestReading] = useState({})
	const [highestReading, setHighestReading] = useState({})
	const params = useParams()
	const history= useHistory()

	const test = () => {
		console.log(currentUser)
	}
	
	const toReadings = () => {
		history.push("/bgls/all")
	}
	return(
		<>
		<button onClick={test}>user</button>
		<button onClick={toReadings}>All Readings</button>
		</>
	)
}

export default Dashboard