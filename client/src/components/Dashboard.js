import { useState, useEffect } from "react"
import {Link, useHistory, useParams } from "react-router-dom"

const Dashboard = ({currentUser}) => {
	const [currentReading, setCurrentReading] = useState({})
	const [lowestReading, setLowestReading] = useState({})
	const [highestReading, setHighestReading] = useState({})
	const params = useParams()
	const history= useHistory()

	return(
		<></>
	)
}

export default Dashboard