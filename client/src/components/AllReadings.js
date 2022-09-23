import { useState, useEffect } from "react"
import {Link, useHistory } from "react-router-dom"

const AllReadings = ({readings, setReadings}) => {
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

	const renderReadings = readings.map((bgl) => {
		return(
			<div>
				<p>
				Value: {bgl.value} mg/dl <br/> 
				Entered {bgl.created_at}
				</p>
			</div>
		)
	})

	const newReading = () => {
		history.push("/bgls/new")
	}

	return(
		<>
			<button onClick={newReading}>New Reading</button>
			{renderReadings}
		</>
	)
}

export default AllReadings