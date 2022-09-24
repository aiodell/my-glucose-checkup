import { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"

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
			<div as= {Link} key= {bgl.id} to= {`/bgls/${bgl.id}/event-details`}>
				<p>
				Value: {bgl.value} mg/dl <br/> 
				Entered {bgl.created_at}
				</p>
			</div>
		)
	})

	// move to new reading page
	const newReading = () => {
		history.push("/bgls/new")
	}
	
	// return tp dashboard
	const toDashboard = () => {
		history.push("/dashboard")
	}

	return(
		<>
			<button onClick={newReading}>New Reading</button>
			<button onClick={toDashboard}>All Readings</button>
			{renderReadings}
		</>
	)
}

export default AllReadings