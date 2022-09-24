import { useState, useEffect } from "react"
import {useHistory, useParams } from "react-router-dom"

const Dashboard = ({currentUser, readings, setReadings}) => {
	const [currentReading, setCurrentReading] = useState({})
	const [lowestReading, setLowestReading] = useState({})
	const [highestReading, setHighestReading] = useState({})
	const params = useParams()
	const history= useHistory()

	const toReadings = () => {
		history.push("/bgls/all")
	}
	
	//events will go here

	return(
		<div>
			<button onClick={toReadings}>All Readings</button>
		</div>
			
	)
}

export default Dashboard