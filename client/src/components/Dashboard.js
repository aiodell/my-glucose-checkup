import { useState, useEffect } from "react"
import {useHistory, useParams } from "react-router-dom"

const Dashboard = ({readings, setReadings}) => {
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

	const lowestValue = [...readings].sort((a,b) => a.value - b.value)
	const highestValue = [...readings].sort((a,b) => b.value - a.value)
	const highestId =[...readings].sort((a,b) => b.id - a.id)

	const renderReadings = readings.map((bgl) => {
		return(
				<p key ={bgl.id}>
					{bgl.value}
				</p>
		)
	})

	const toReadings = () => {history.push("/bgls/all")}

	return(
		<div>
			<button onClick={toReadings}>All Readings</button>
			{renderReadings}
		</div>
			
	)
}

export default Dashboard